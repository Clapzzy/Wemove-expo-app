import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, Pressable, TextInput, Image, ImageBackground, Dimensions } from "react-native";
import WavesBackground from "@/components/SvgWaves";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButtonRegister from "@/components/buttonPrimary";

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
          <View className="w-full items-center flex-1">
            <Image className="mt-44" source={require("assets/logo.png")} />
          </View>
        </SafeAreaView>
      </ImageBackground >
    </View >
  );
}
