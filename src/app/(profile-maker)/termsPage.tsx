import { Link, router } from "expo-router";
import { View, TouchableOpacity, Keyboard, Text, ImageBackground, TextInput, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext, useEffect, useRef, useState } from "react";
import CustomText from "@/components/customText";
import PrimaryButtonRegister from "@/components/buttonPrimary";
import { Ionicons } from '@expo/vector-icons/';

import RegisterContext from "@/helper/loginContext";
import ExpoCheckbox from "expo-checkbox/build/ExpoCheckbox";
import Checkbox from "expo-checkbox";
import { useMutation } from "@tanstack/react-query";
import { makeProfile } from "@/helper/makeProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function TermsPage() {
  const insets = useSafeAreaInsets()
  const formData = useContext(RegisterContext)
  const [isChecked, setChecked] = useState(false)

  const profileMutation = useMutation({
    mutationFn: makeProfile,
    onSuccess: async (data, variables, context) => {
      await AsyncStorage.setItem("username", formData.data.username)
      router.push("/(main)/challenges")
    },
    onSettled(data, error, variables, context) {
      console.log(error,)
    },
  })

  async function nextPage() {
    profileMutation.mutate({ userData: formData?.data })
  }

  return (
    <View className="items-center bg-[#080707] flex-1 color-white">
      <ImageBackground style={{ paddingTop: insets.top }} className="w-full h-full" source={require('assets/waves3.png')}>
        <TouchableOpacity className=' left-4 w-[42] h-[42] bg-[#13131080] justify-center rounded-full' onPress={() => { router.back() }}>
          <Ionicons className='mr-3' name="caret-back-outline" size={38} color="#E4FF66" />
        </TouchableOpacity>
        <View className="flex-col items-center ">
          <View className="flex-col gap-1 mt-24 items-center">
            <CustomText text="WeMove" type="Bold" className="text-28 text-[#CCCCCC]" />
            <CustomText text="Terms of Service &" type="Bold" className="text-28 text-[#CCCCCC]" />
            <CustomText text="Privacy Policy" type="Bold" className="text-28 text-[#CCCCCC]" />
          </View>
          <CustomText type="SemiBold" text="Read Terms of Service" className="text-14 mt-12 text-[#B7EF5D]" />
          <View className="flex-row gap-2 mt-16">
            <Checkbox value={isChecked} onValueChange={setChecked} color={isChecked ? '#4D4D4D' : "#C3BABA"} />
            <View className="flex-col">
              <CustomText type="Regular" text='By clicking "Next" below, I' className="text-16 text-[#A3A3A3]" />
              <CustomText type="Regular" text='acknowledge that I have read and I' className="text-16 text-[#A3A3A3]" />
              <CustomText type="Regular" text='agree to Wemove’s Terms of Service' className="text-16 text-[#A3A3A3]" />
              <CustomText type="Regular" text='and Privacy Policy' className="text-16 text-[#A3A3A3]" />
            </View>
          </View>
          <PrimaryButtonRegister onPress={nextPage} text="Next ->" backgroundColorButton={isChecked ? "#E4FF65" : "#262626"} ditextColor={isChecked ? "#1A2E05" : "#737373"} className="mt-24" />
        </View>
      </ImageBackground >
    </View >
  );
}



