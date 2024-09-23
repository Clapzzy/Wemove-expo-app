import { Link, router } from "expo-router";
import { View, TouchableOpacity, Keyboard, TextInput, Text, ImageBackground, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons/';
import { useContext, useEffect, useRef, useState } from "react";
import CustomText from "@/components/customText";
import PrimaryButtonRegister from "@/components/buttonPrimary";

import RegisterContext from "@/helper/loginContext";
export default function SignIn() {
  const formData = useContext(RegisterContext)
  const insets = useSafeAreaInsets()
  const textField = useRef(null)
  const [isBadEmail, setBadEmail] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    textField.current.focus()
  })
  function closeKeyboard() {
    Keyboard.dismiss();
  }

  function nextPage() {
    const emailRegex = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,4}$/;
    if (emailRegex.test(email)) {
      formData.editRegisterInfo({ ...formData.data, email: email, })
      router.push('/(profile-maker)/loginPassword')
      console.log(formData.data)
    } else {
      setBadEmail(true)
    }

  }

  function onChangeEmail(input: string) {
    setEmail(input)
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
              <CustomText text="What's your email?" className=" p-5 text-24 text-[#E5E5E5] mt-10 mb-6" type="Bold"></CustomText>
              <TextInput
                ref={textField}
                onChangeText={onChangeEmail}
                value={email}
                className="w-[358] h-[49] bg-[#1B1B1B] rounded-full px-6 text-[#737373] text-20"
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  fontFamily: 'Regular',
                  shadowOpacity: 0.34,
                  shadowRadius: 1.27,
                  elevation: 10,
                }}
                placeholder="E-mail"
              >
              </TextInput>
              {isBadEmail
                ? (<CustomText text='Please enter a valid e-mail' className='mt-6 text-16 text-[#EF4444]' type="Regular" />)
                : false
              }
              <PrimaryButtonRegister onPress={nextPage} text="Next ->" backgroundColorButton="#E4FF65" textColor="#1A2E05" className="mt-56" />
            </View>
          </>
        </TouchableWithoutFeedback>
      </ImageBackground >
    </View >
  );
}


