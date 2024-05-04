import { Link, router } from "expo-router";
import { Text, View, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, Touchable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GoBackButton from "@/components/goBackButton";
import { useState } from "react";

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
    <View className="bg-[#232124] flex-1 color-white">
      <TouchableWithoutFeedback onPress={closeKeyboard}>
        <SafeAreaView >
          <GoBackButton link="/" />
          <CustomText className=" ml-6 color-[#d2fe53] my-14 text-4xl" >Sign in to We Move</CustomText>
          <View className=" ml-6 mt-0">
            <TextInput className=" border-[#5b5a5f] p-3 mr-6  border-2 rounded-md focus:border-[#7e7e7e] placeholder:color-[#3c3b3f]" value={email} onChangeText={setEmail} placeholder="Email"></TextInput>
            <TextInput className=" border-[#5b5a5f] p-3 mr-6  border-2 rounded-md focus:border-[#7e7e7e] color-slate-400" value={pass} onChangeText={setPass} placeholder="Password" placeholderTextColor="#444444"></TextInput>
          </View>

          <View className=" mt-16 w-full h-14">
            <Pressable className=" justify-center items-center bg-lime-500 flex-1 mx-6 active:bg-lime-400" onPress={press}>
              <BoldCustomText className=" text-4xl">Sign In</BoldCustomText>
            </Pressable>
          </View>

        </SafeAreaView>
      </TouchableWithoutFeedback>
    </View>
  );
}


