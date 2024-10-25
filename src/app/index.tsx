import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { View, Image, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { setTSpan } from "react-native-svg/lib/typescript/lib/extract/extractText";

export default function Page() {
  const checkWhereToGo = async () => {
    router.push('/(main)/challenges')
    return

    await AsyncStorage.setItem("username", "hello")
    const foundUsername = await AsyncStorage.getItem("username")
    if (!foundUsername) {
      router.push('/(profile-maker)/startPage')
    } else {
      router.push('/(main)/[user]/hello')
    }
    //router.push('/(profile-maker)/termsPage')
  }

  useEffect(() => {
    setTimeout(() => {
      checkWhereToGo()
    }, 1)
  }, [])

  return (
    <View className="items-center bg-[#080707] flex-1 color-white">
      <ImageBackground className="w-full h-full" source={require('assets/waves3.png')}>
        <SafeAreaView>
          <View className="w-full items-center ">
            <Image className="mt-[130]" source={require("assets/logo.png")} />
          </View>
        </SafeAreaView>
      </ImageBackground >
    </View >
  );
}
