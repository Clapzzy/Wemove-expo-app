import { Link, router } from "expo-router";
import { View, Keyboard, ImageBackground, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import CustomText from "@/components/CustomText";

export default function SignIn() {

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  function closeKeyboard() {
    Keyboard.dismiss();
  }
  function press() {
    router.push('/profile-maker/signIn2')
  }
  return (
    <View className="items-center bg-[#262626] flex-1 color-white">
      <ImageBackground className="w-full h-full" source={require('assets/waves.png')}>
        <SafeAreaView>
          <CustomText className="" text="What's your email?" />
          <TextInput ></TextInput>
        </SafeAreaView>
      </ImageBackground >
    </View >
  );
}


