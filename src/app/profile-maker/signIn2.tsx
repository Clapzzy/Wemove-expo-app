import { Link, router } from "expo-router";
import { Text, View, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, Touchable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/components/customText";
import BoldCustomText from "@/components/boldCustomText";
import GoBackButton from "@/components/goBackButton";
import { useState } from "react";

export default function SignIn() {

  const [nameFirst, setNameFirst] = useState('')
  const [nameLast, setNameLast] = useState('')
  function closeKeyboard() {
    Keyboard.dismiss();
  }
  function press() {
    router.push('/')
  }
  return (
    <View className="bg-[#232124] flex-1 color-white">
      <TouchableWithoutFeedback onPress={closeKeyboard}>
        <SafeAreaView >
          <GoBackButton link="/" />
          <CustomText className=" ml-6 color-[#d2fe53] my-14 text-4xl" >Tell us who you are</CustomText>
          <View className=" ml-6 mt-0">
            <TextInput className=" border-[#5b5a5f] p-5 mr-6 border-b-1 rounded-md focus:border-[#7e7e7e] color-slate-400" style={{ borderBottomWidth: 1 }} placeholder="First Name" placeholderTextColor="#444444" value={nameFirst} onChangeText={setNameFirst}></TextInput>
            <TextInput className=" border-[#5b5a5f] p-5 mr-6 border-b-1 rounded-md focus:border-[#7e7e7e] color-slate-400" style={{ borderBottomWidth: 1 }} placeholder="First Name" placeholderTextColor="#444444" value={nameLast} onChangeText={setNameLast}></TextInput>
            <TextInput className=" border-[#5b5a5f] p-5 mr-6 border-b-1 rounded-md focus:border-[#7e7e7e] color-slate-400" style={{ borderBottomWidth: 1 }} placeholder="First Name" placeholderTextColor="#444444" value={nameFirst} onChangeText={setNameFirst}></TextInput>
            <View className=" mt-48 w-full h-14">
              <Pressable className=" justify-center items-center bg-lime-500 flex-1 mr-6 active:bg-lime-400" onPress={press}>
                <BoldCustomText className=" text-4xl">Complete sign in</BoldCustomText>
              </Pressable>
            </View>

          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </View>
  );
}


