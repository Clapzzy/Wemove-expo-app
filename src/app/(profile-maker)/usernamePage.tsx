import { Link, router } from "expo-router";
import { View, Keyboard, Text, ImageBackground, TextInput, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useRef, useState } from "react";
import CustomText from "@/components/customText";
import PrimaryButtonRegister from "@/components/buttonPrimary";

import RegisterContext from "@/helper/loginContext";
export default function UsernamePage() {
  const formData = useContext(RegisterContext)
  const textField = useRef(null)
  const [isBadUsername, setBadUsername] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    textField.current.focus()
  }, [])
  function closeKeyboard() {
    Keyboard.dismiss();
  }

  function nextPage() {
    const emailRegex = /^.{3,16}$/
    if (emailRegex.test(username)) {
      formData.editRegisterInfo({ ...formData.data, username: username, })
      router.push('/(profile-maker)/displayNamePage')
      console.log(formData.data)
    } else {
      setBadUsername(true)
    }

  }

  function onChangeUsername(input: string) {
    setUsername(input)
  }
  return (
    <View className="items-center bg-[#080707] flex-1 color-white">
      <ImageBackground className="w-full h-full" source={require('assets/waves3.png')}>
        <SafeAreaView>
          <TouchableWithoutFeedback onPress={closeKeyboard}>
            <View className="items-center w-full h-full">
              <CustomText text="Choose a username" className=" p-5 text-24 text-[#E5E5E5] mt-6 mb-6" type="Bold"></CustomText>
              <TextInput
                ref={textField}
                onChangeText={onChangeUsername}
                value={username}
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
                placeholder="Username"
              >
              </TextInput>
              {isBadUsername
                ? (<CustomText text='Must be between 3 and 16 characters and uniqe' className='mt-6 text-14 text-[#EF4444]' type="Regular" />)
                : (<CustomText text='Must be between 3 and 16 characters and uniqe' className='mt-6 text-14 text-[#C2DC55]' type="Regular" />)
              }
              <PrimaryButtonRegister onPress={nextPage} text="Next ->" backgroundColorButton="#E4FF65" textColor="#1A2E05" className="mt-56" />
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </ImageBackground >
    </View >
  );
}

