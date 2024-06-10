import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import { useContext, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import MainContext from '@/helper/mainScreensContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function App() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef()
  const contextData = useContext(MainContext)


  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    requestPermission()
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  async function toggleCameraFacing() {
    const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.3, imageType: "jpg", onPictureSaved: (photo) => { onSave(photo) } })
    console.log(photo)
  }

  async function onSave(photo) {
    contextData.editInfo({ "currentPicUrl": photo.uri })
    await AsyncStorage.setItem("tempPic", photo.base64)
    router.push("/(main)/home")
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <View className='bg-[#0D0D0D] rounded-full p-7'>
              <View className='w-16 h-16 justify-center items-center'>
                <FontAwesome name="camera" size={48} color="#E4FF66" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
