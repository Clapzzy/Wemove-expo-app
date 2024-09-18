import { Link, router } from "expo-router";
import { Text, View, ImageBackground, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, Touchable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import CustomText from "@/components/customText";

export default function Settings() {


  return (
    <View className="bg-[#060605] flex-[1]">
      <SafeAreaView className="flex-[1]">
        <View className="px-6"  >
          <CustomText text="Inbox" type="ExtraBold" className="text-[#BFE500] text-32" />
          <View className="mt-60 justify-center">
            <View className='m-2 w-fit p-4 rounded-[10] justify-center items-center bg-[#131310] opacity-70 '>
              <CustomText text='You have no ' type="Bold" className="text-22 text-[#bfe500] mb-2" />
              <CustomText text='new notifications!' type="Bold" className="text-22 text-[#bfe500] mb-2" />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View >
  );
}



