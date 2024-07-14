import { Link, router } from "expo-router";
import { View, Keyboard, Text, ImageBackground, TextInput, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useRef, useState } from "react";
import CustomText from "@/components/customText";
import PrimaryButtonRegister from "@/components/buttonPrimary";

import RegisterContext from "@/helper/loginContext";
import ExpoCheckbox from "expo-checkbox/build/ExpoCheckbox";
import Checkbox from "expo-checkbox";
export default function TermsPage() {
  const formData = useContext(RegisterContext)
  const [isChecked, setChecked] = useState(false)

  function nextPage() {
    if (isChecked) {
      router.push('/(profile-maker)/termsPage')
    }

  }

  return (
    <View className="items-center bg-[#080707] flex-1 color-white">
      <ImageBackground className="w-full h-full" source={require('assets/waves3.png')}>
        <SafeAreaView >
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
        </SafeAreaView>
      </ImageBackground >
    </View >
  );
}



