import { Link, router } from "expo-router";
import { View, TouchableOpacity, Keyboard, Text, ImageBackground, TextInput, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from '@expo/vector-icons/';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext, useEffect, useRef, useState } from "react";
import CustomText from "@/components/customText";
import PrimaryButtonRegister from "@/components/buttonPrimary";

import RegisterContext from "@/helper/loginContext";
import { useMutation } from "@tanstack/react-query";
import { makeProfile } from "@/helper/makeProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logInProfile } from "@/helper/loginProfile";
export default function SignIn() {
  const insets = useSafeAreaInsets()
  const formData = useContext(RegisterContext)
  const textField = useRef(null)
  const [isBadPass, setBadPass] = useState(false)
  const [pass, setPass] = useState('')
  const [isBadLog, setIsBadLog] = useState(false)

  useEffect(() => {
    textField.current.focus()
  })
  function closeKeyboard() {
    Keyboard.dismiss();
  }

  const profileMutation = useMutation({
    mutationFn: logInProfile,
    onSuccess: async (data, variables, context) => {
      await AsyncStorage.setItem("username", data.username)
      router.push("/(main)/challenges")
    },
    onError: async () => {
      setIsBadLog(true)
    },
    onSettled(data, error, variables, context) {
      console.log(error,)
    },
  })

  function nextPage() {
    const emailRegex = /^.{5,16}$/
    if (emailRegex.test(pass)) {
      formData.editRegisterInfo({ ...formData.data, password: pass })
      profileMutation.mutate({ userData: formData?.data })
    } else {
      setBadPass(true)
    }

  }

  function onChangePass(input: string) {
    setPass(input)
  }
  return (
    <View className="items-center bg-[#080707] flex-1 color-white">
      <ImageBackground style={{ paddingTop: insets.top }} className="w-full h-full" source={require('assets/waves3.png')}>
        <TouchableWithoutFeedback onPress={closeKeyboard}>
          <>
            <TouchableOpacity className=' left-4 w-[42] h-[42]  bg-[#13131080] justify-center rounded-full' onPress={() => { router.back() }}>
              <Ionicons className='mr-3' name="caret-back-outline" size={38} color="#E4FF66" />
            </TouchableOpacity>
            <View className="items-center w-full h-full">
              <CustomText text="Enter your password" className=" p-5 text-24 text-[#E5E5E5] mt-10 mb-6" type="Bold"></CustomText>
              <TextInput
                ref={textField}
                onChangeText={onChangePass}
                value={pass}
                className="w-[358] h-[49] bg-[#1B1B1B] rounded-full px-6 text-[#737373] text-20"
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.34,
                  fontFamily: 'Regular',
                  shadowRadius: 1.27,
                  elevation: 10,
                }}
                placeholder="Password"
              >
              </TextInput>
              {isBadLog
                ? (<CustomText text='E-mail or password is wrong!' className='mt-6 text-16 text-[#EF4444]' type="Regular" />)
                : (<View className="mt-6 w-full h-7"></View>)
              }
              <PrimaryButtonRegister onPress={nextPage} text="Next ->" backgroundColorButton="#E4FF65" textColor="#1A2E05" className="mt-56" />
            </View>
          </>
        </TouchableWithoutFeedback>
      </ImageBackground >
    </View >
  );
}


