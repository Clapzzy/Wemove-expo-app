import { useCallback, useContext, useRef, useState } from 'react';
import { TouchableOpacity, ImageBackground, Pressable, TextInput, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import MainContext from '@/helper/mainScreensContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons/';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addPost } from '@/helper/addPosts';
import CustomText from '@/components/customText';
import { router, useFocusEffect } from 'expo-router';

export default function postPreview() {
  const insets = useSafeAreaInsets()
  const contextData = useContext(MainContext)
  const queryClient = useQueryClient()
  const [image, setImage] = useState(null)
  const [isDisabled, setIsDisabled] = useState(false)
  const textField = useRef(null)
  const [description, setDescription] = useState<string>('')

  const getImage = async () => {
    const pic = await AsyncStorage.getItem("tempPic")
    setImage(pic)
    return pic
  }

  const postMutation = useMutation({
    mutationFn: addPost,
    onMutate(variables) {
      setIsDisabled(true)
    },
    onSuccess(data, variables, context) {
      setDescription("")
      queryClient.invalidateQueries({
        queryKey: ["posts", "home"]
      })
      router.push("/(main)/home")
    },
    onSettled(data, error, variables, context) {
      console.log(error,)
    },
  })

  const goBack = () => {
    router.push('/(main)/camera')
  }

  const onChangeDesc = (input) => {
    setDescription(input)
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  const sendPost = async () => {
    postMutation.mutate({ description, image })
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
          <View style={{ paddingHorizontal: 12, paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }} >
            <View className='flex-[1]'>
              <TouchableOpacity className=' w-[42] h-[42] bg-[#13131080] justify-center rounded-full' onPress={goBack}>
                <Ionicons className='mr-3' name="caret-back-outline" size={38} color="#E4FF66" />
              </TouchableOpacity>
              <CustomText text=''></CustomText>
            </View>
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset='12' className='flex-[1] flex-row justify-between items-end'>
              <TextInput
                ref={textField}
                onChangeText={onChangeDesc}
                value={description}
                placeholderTextColor="#E4FF66"
                style={{ fontFamily: 'Medium' }}
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
              <TouchableOpacity disabled={isDisabled} className=' py-1.5 px-1.5 ml-3 flex-[1] bg-[#13131080] justify-center items-center rounded-full' onPress={sendPost}>
                <Ionicons className='ml-1.5' name="send" size={38} color="#E4FF66" />
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
}
