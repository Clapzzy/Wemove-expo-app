import { Link, router } from "expo-router";
import CustomText from "@/components/customText";
import { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons/';
import { Text, TouchableOpacity, View, Pressable, TextInput, Image, ImageBackground, Dimensions } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import PrimaryButtonRegister from "@/components/buttonPrimary";

export default function StartPage() {
  const insets = useSafeAreaInsets()
  useEffect(() => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    console.log(windowWidth, windowHeight)
  })
  function press() {
    router.push('/(profile-maker)/emailPage')
  }

  return (
    <View className="items-center bg-[#080707] flex-1 color-white">
      <ImageBackground style={{ paddingTop: insets.top }} className="w-full h-full" source={require('assets/waves3.png')}>
        <View className="w-full items-center ">
          <Image className="mt-[130]" source={require("assets/logo.png")} />
          <View className="mt-[320]">
            <PrimaryButtonRegister onPress={press} style={{ shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowRaduis: 5, shadowOpacity: 0.39 }} text="Sign up with phone" backgroundColorButton="#737373" textColor="#A3A3A3" />
            <PrimaryButtonRegister onPress={press} style={{ shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowRaduis: 5, shadowOpacity: 0.39 }} className='mt-[12]' text="Sign up with email" backgroundColorButton="#E4FF65" textColor="#1A2E05" />
            <View className="flex-row mt-[16]">
              <CustomText className="text-16 text-[#A3A3A3]" text="Already have an account?" type="SemiBold"></CustomText>
              <Pressable onPress={() => router.push("(profile-maker)/loginEmail")}>
                <CustomText className="text-16 text-[#A3E635]" text=" Log in" type="SemiBold"></CustomText>
              </Pressable>
            </View>
            <View className="flex-col mt-[30]">
              <CustomText className="text-[#525252] text-12" type="Medium" text="By tapping Sign In and using WeMove, you" />
              <View className="flex-row  self-center">
                <CustomText className="text-[#525252] text-12" text="agree to our " />
                <CustomText className="text-[#737373] text-12" text="Terms " />
                <CustomText className="text-[#525252] text-12" text="and " />
                <CustomText className="text-[#737373] text-12" text="Privacy Policy." />
              </View>
            </View>
          </View>
        </View>
      </ImageBackground >
    </View >
  );
}
