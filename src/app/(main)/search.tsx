import { Link, router } from "expo-router";
import { Image, Text, View, ImageBackground, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, Touchable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import CustomText from "@/components/customText";
import FixedButton from "@/components/fixedWidthButton";

export default function Search() {

  const [search, setSearch] = useState('')
  useEffect(() => {
    console.log(search)
  }, [search])

  function removeKeyboard() {
    Keyboard.dismiss()
  }

  return (
    <View className="items-center bg-[#262626] flex-1 color-white">
      <ImageBackground className="w-full h-full" source={require('assets/waves2.png')}>
        <SafeAreaView >
          <TouchableWithoutFeedback onPress={removeKeyboard}>
            <View className="px-4"  >
              <CustomText text="Search" type="ExtraBold" className="text-[#BFE500] text-32" />
              <TextInput className="bg-[#080807] opacity-70 text-20 text-[#A3A3A3] h-10 w-fit mt-2 rounded-lg  pl-3" onChangeText={setSearch}
                placeholder="Search"
                placeholderTextColor="#A3A3A3"
                value={search}
              >
              </TextInput>
              <View className="flex-row justify-between mt-5 mb-3">
                <FixedButton text="Хора" backgroundColorButton="#030302B3" textColor="#A3A3A3" />
                <FixedButton text="Групи" backgroundColorButton="#030302B3" textColor="#2C2C2C" />
              </View>
              <View className="h-[1] w-fit bg-[#BFE500]"></View>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </ImageBackground>
    </View >
  );
}

