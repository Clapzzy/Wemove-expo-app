import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, Pressable, TextInput, Image, ImageBackground, Dimensions } from "react-native";
import WavesBackground from "@/components/SvgWaves";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButtonRegister from "@/components/buttonPrimary";
import CustomText from "@/components/CustomText"

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
            <Image className="mt-[130]" source={require("assets/logo.png")} />
            <View className="mt-[320]">
              <PrimaryButtonRegister onPress={press} style={{ shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowRaduis: 5, shadowOpacity: 0.39 }} text="Sign up with phone" backgroundColorButton="#737373" textColor="#A3A3A3" />
              <PrimaryButtonRegister onPress={press} style={{ shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowRaduis: 5, shadowOpacity: 0.39 }} className='mt-[12]' text="Sign up with email" backgroundColorButton="#D9F99D" textColor="#1A2E05" />
              <View className="flex-row mt-[16]">
                <CustomText className="text-16 text-[#A3A3A3]" text="Already have an account?" type="SemiBold"></CustomText>
                <CustomText className="text-16 text-[#A3E635]" text=" Log in" type="SemiBold"></CustomText>
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
        </SafeAreaView>
      </ImageBackground >
    </View >
  );
}
//secret message
