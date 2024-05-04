import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, Pressable, TextInput, Image, ImageBackground, Dimensions } from "react-native";
import WavesBackground from "@/components/SvgWaves";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButtonRegister from "@/components/buttonPrimary";
import BoldCustomText from "@/components/boldCustomText";

export default function Page() {
  const [email, setEmail] = useState('')
  useEffect(() => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    console.log(windowWidth, windowHeight)
  })
  function press() {
    router.push('/profile-maker/signIn')
  }

  return (
    <View className="items-center bg-[#262626] flex-1 color-white">
      <ImageBackground className="w-full h-full" source={require('assets/waves.png')}>
        <SafeAreaView>
          <View className="w-full items-center ">
            <Image className="mt-36" source={require("assets/logo.png")} />
            <View className="mt-[271]">
              <PrimaryButtonRegister text="Sign up with phone" backgroundColorButton="#737373" textColor="#A3A3A3" />
              <PrimaryButtonRegister className='mt-[12]' text="Sign up with email" backgroundColorButton="#D9F99D" textColor="#1A2E05" />
              <View className="flex-row">
                <BoldCustomText className="font-[28]" text="Already have an account?" type="Bold"></BoldCustomText>
                <BoldCustomText type="Thin" text=" Log in"></BoldCustomText>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground >
    </View >
  );
}
