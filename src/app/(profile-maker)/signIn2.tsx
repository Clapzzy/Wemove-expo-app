import { Link, router } from "expo-router";
import { View, Keyboard, Text, ImageBackground, TextInput, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useRef, useState } from "react";
import CustomText from "@/components/customText";
import PrimaryButtonRegister from "@/components/buttonPrimary";

import RegisterContext from "@/helper/loginContext";
export default function SignIn() {
  const formData = useContext(RegisterContext)
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
<<<<<<< HEAD
      router.push('/(profile-maker)/signIn2')
=======
      router.push('/profile-maker/signIn2')
>>>>>>> 62dfb68 (changes)
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
      <ImageBackground className="w-full h-full" source={require('assets/waves3.png')}>
        <SafeAreaView>
          <TouchableWithoutFeedback onPress={closeKeyboard}>
            <View className="items-center w-full h-full">
              <CustomText text="What's your email?" className=" p-5 text-24 text-[#E5E5E5] mt-6 mb-6" type="Bold"></CustomText>
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
                  shadowOpacity: 0.34,
                  shadowRadius: 1.27,
                  elevation: 10,
                }}
                placeholder="E-mail"
              >
              </TextInput>
              {isBadEmail
                ? (<CustomText text='Please enter a valid e-mail' className='mt-6 text-16 text-[#EF4444]' type="Regular" />)
                : (<CustomText text='Sign up with phone number' className='mt-6 text-16 text-[#C2DC55]' type="Regular" />)
              }
              <PrimaryButtonRegister onPress={nextPage} text="Next ->" backgroundColorButton="#E4FF65" textColor="#1A2E05" className="mt-56" />
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </ImageBackground >
    </View >
  );
}


