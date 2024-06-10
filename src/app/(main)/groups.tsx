
import { Link, router } from "expo-router";
import { Text, View, ImageBackground, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, Touchable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import CustomText from "@/components/customText";

export default function Group() {


  return (
    <View className="items-center bg-[#262626] flex-1 color-white">
      <ImageBackground className="w-full h-full" source={require('assets/waves2.png')}>
        <SafeAreaView>
          <CustomText text="Groups" type="ExtraBold" className="text-[#BFE500] pl-4 text-32" />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}


