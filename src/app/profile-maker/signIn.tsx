import { Link, router } from "expo-router";
import { View, Keyboard, Text, ImageBackground, TextInput, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import CustomText from "@/components/customText";

export default function SignIn() {

  const [email, setEmail] = useState('')
  const [focus, setFocus] = useState(false)
  useEffect(() => {
    console.log(focus);

  }, [focus])
  function closeKeyboard() {
    Keyboard.dismiss();
    setFocus(false)
  }
  function press() {
    router.push('/profile-maker/signIn2')
  }
  function onChangeEmail(input: string) {
    setEmail(input)
  }
  function focusMokus() { setFocus(true) }
  return (
    <View className="items-center bg-[#262626] flex-1 color-white">
      <ImageBackground className="w-full h-full" source={require('assets/waves.png')}>
        <SafeAreaView>
          <TouchableWithoutFeedback onPress={closeKeyboard}>
            <View className="items-center w-full h-full">
              <CustomText text="What's your email?" className=" p-5 text-20 text-[#E5E5E5]" type="Bold"></CustomText>
              <TextInput onFocus={focusMokus}
                onChangeText={onChangeEmail}
                className="w-[358] h-[49] bg-[#737373] rounded-full p-3"
              >
                <CustomText text={focus ? email : "E-mail"} type="SemiBold"></CustomText>
              </TextInput>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </ImageBackground >
    </View >
  );
}


