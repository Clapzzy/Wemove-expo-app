import { CameraType, CameraView, FlashMode, useCameraPermissions } from 'expo-camera';
import { useContext, useRef, useState } from 'react';
import { Button, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import MainContext from '@/helper/mainScreensContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('front');
  const [flash, setFlash] = useState<FlashMode>('off')
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef()
  const contextData = useContext(MainContext)

  const [pressedFacing, setPressedFacing] = useState(false);
  const [pressedFlash, setPressedFlash] = useState(false);

  const handlePressFacing = () => setPressedFacing(!pressedFacing);
  const handlePressFlash = () => setPressedFlash(!pressedFlash);


  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    requestPermission()
    return (
      <View >
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  async function takePictureAsync() {
    const photo = await cameraRef?.current?.takePictureAsync({ base64: true, quality: 0.3, imageType: "jpg", onPictureSaved: (photo) => { onSave(photo) } })
  }

  function toggleCameraFacing() {
    setFacing(facing === "back" ? "front" : "back")
  }
  function toggleCameraFlash() {
    setFlash(flash === "on" ? "off" : "on")
  }

  async function onSave(photo) {
    contextData.editInfo({ "currentPicUrl": photo.uri })
    await AsyncStorage.removeItem("tempPic")
    await AsyncStorage.setItem("tempPic", photo.base64)
    console.log(photo.uri)
    router.push("/(main)/post_preview")
  }
  //TODO add grid option
  return (
    <View className='flex-[1] justify-center'>
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing} flash={flash}>
        <SafeAreaView style={{ flex: 1, padding: 12 }} >
          <View className='flex-[1] justify-start self-end'>
            <View className='rounded-2xl py-4 px-2 w-12 justify-end bg-[#13131080] flex-col'>
              <Pressable
                className='mb-3'
                onPress={toggleCameraFacing}
                onPressIn={handlePressFacing}
                onPressOut={handlePressFacing}
                style={pressedFacing ? { transform: [{ scale: 1 }] } : { transform: [{ scale: 0.90 }] }}
              >
                {
                  (facing === 'front')
                    ? <MaterialCommunityIcons name="camera-front-variant" size={28} color="#E4FF66" />
                    : <MaterialCommunityIcons name="camera-rear-variant" size={28} color="#E4FF66" />
                }
              </Pressable>
              <Pressable
                onPress={toggleCameraFlash}
                onPressIn={handlePressFlash}
                onPressOut={handlePressFlash}
                style={pressedFlash ? { transform: [{ scale: 1 }] } : { transform: [{ scale: 0.90 }] }}
              >
                {
                  (flash === 'on')
                    ? <Ionicons name="flash" size={28} color="#E4FF66" />
                    : <Ionicons name="flash-off" size={28} color="#E4FF66" />
                }
              </Pressable>
            </View>
          </View>
          <View className='flex-[1] flex-row justify-center bg-transparent m-4'>
            <TouchableOpacity className=' self-end items-center rounded-full border-[#0D0D0D] border-2' onPress={takePictureAsync}>
              <View className='bg-[#0D0D0D] rounded-full w-28 h-28 justify-center items-center'>
                <FontAwesome name="camera" size={48} color="#E4FF66" />
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
}


