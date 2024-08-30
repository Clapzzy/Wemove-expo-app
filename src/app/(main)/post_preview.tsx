import { useCallback, useContext, useRef, useState } from 'react';
import { TouchableOpacity, ImageBackground, Pressable, TextInput, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import MainContext from '@/helper/mainScreensContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons/';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import CustomText from '@/components/customText';
import { router, useFocusEffect } from 'expo-router';

export default function postPreview() {
  const contextData = useContext(MainContext)
  const [image, setImage] = useState(null)
  const textField = useRef(null)
  const [description, setDescription] = useState('')

  const getImage = async () => {
    const pic = await AsyncStorage.getItem("tempPic")
    setImage(pic)
    return pic
  }

  const goBack = () => {
    router.back()
  }

  const onChangeDesc = (input) => {
    setDescription(input)
    console.log(description)
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  const sendPost = () => {
    console.log("post")
  }
  //TODO fix this
  useFocusEffect(
    useCallback(() => {
      getImage()
    }, [])
  )

  const queryChallenges = useQuery({
    queryKey: ['image'],
    queryFn: () => getImage()
  })

  if (queryChallenges.isLoading) {
    return (
      <View className="items-center bg-[#262626] flex-1 color-white">
        <ImageBackground className="w-full h-full" source={require('assets/waves.png')}>
          <SafeAreaView>
            <CustomText text="Loading ..." type="Bold" className=" text-30 text-gray-500" />
          </SafeAreaView>
        </ImageBackground >
      </View >

    )
  }
  if (queryChallenges.isError) {
    return (
      <View className="items-center bg-[#262626] flex-1 color-white">
        <ImageBackground className="w-full h-full" source={require('assets/waves.png')}>
          <SafeAreaView>
            <CustomText text={queryChallenges.error.message} type="Bold" className=" text-30 text-gray-500" />
          </SafeAreaView>
        </ImageBackground >
      </View >

    )
  }

  return (
    <View className='flex-[1] justify-center'>
      <ImageBackground className='flex-[1]' source={{ uri: `data:image/jpeg;base64,${image}` }}>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <SafeAreaView style={{ flex: 1, padding: 12 }} >
            <View className='flex-[1]'>
              <TouchableOpacity className=' w-[42] h-[42] bg-[#13131080] justify-center rounded-full' onPress={goBack}>
                <Ionicons className='mr-3' name="caret-back-outline" size={38} color="#E4FF66" />
              </TouchableOpacity>
            </View>
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset='12' className='flex-[1] flex-row justify-between items-end'>
              <TextInput
                ref={textField}
                onChangeText={onChangeDesc}
                value={description}
                placeholderTextColor="#1A2E05"
                className=" flex-[4] border-[#131310] border-2 rounded-full px-6 py-3 text-[#E4FF66] text-20"
                //                style={{
                //                  shadowColor: "#000",
                //                  shadowOffset: {
                //                    width: 0,
                //                    height: 5,
                //                  },
                //                  shadowOpacity: 0.34,
                //                  shadowRadius: 1.27,
                //                  elevation: 10,
                //                }}
                placeholder="Description"
              >
              </TextInput>
              <TouchableOpacity className=' py-1.5 px-1.5 ml-3 flex-[1] bg-[#13131080] justify-center items-center rounded-full' onPress={sendPost}>
                <Ionicons className='ml-1.5' name="send" size={38} color="#E4FF66" />
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
}
