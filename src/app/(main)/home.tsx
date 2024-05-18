import { Link, router } from "expo-router";
import { Text, Image, View, ImageBackground, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, Touchable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../helper/challanges"
import CustomText from "@/components/customText";

export default function Home() {

  const posts = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts()
  })


  if (posts.isLoading) {
    return (
      <View className="items-center bg-[#262626] flex-1 color-white">
        <ImageBackground className="w-full h-full" source={require('assets/waves.png')}>
          <SafeAreaView>
            <CustomText text="Loading ..." type="Bold" className=" text-30 text-gray-500" />
          </SafeAreaView>
        </ImageBackground >
      </View >

    )
  }
  if (posts.isError) {
    return (
      <View className="items-center bg-[#262626] flex-1 color-white">
        <ImageBackground className="w-full h-full" source={require('assets/waves.png')}>
          <SafeAreaView>
            <CustomText text={posts.error.message} type="Bold" className=" text-30 text-gray-500" />
          </SafeAreaView>
        </ImageBackground >
      </View >

    )
  }
  return (
    <View className="items-center bg-[#262626] flex-1 color-white">
      <ImageBackground className="w-full h-full" source={require('assets/waves2.png')}>
        <SafeAreaView>
          <ScrollView>
            <View className="w-fit justify-between flex-row mx-4 mb-8">
              <Image source={require("../../../assets/pfp.png")} />
              <Image className="mt-2" source={require("../../../assets/inbox.png")} />
            </View>
            {posts.data.map((post, index) => {
              return (
                <View className="w-full p-4 flex-col">
                  <View className="flex-row">
                    <Image source={require("../../../assets/pfp.png")} />
                    <View className="flex-col mt-2 ml-1">
                      <CustomText text="DisplayUsername1" type="Bold" className="text-14 text-[#C1F173]" />
                      <CustomText text="@Username1" type="Medium" className="text-12 text-[#777777]" />
                    </View>
                  </View>
                  <CustomText
                    text='I  built my first JavaScript framework: "use use"  1. Add HTML tags using "use ___" 2. Place content inline with "" 3. Indentation matters just like in Python  Demo: https://main.d3o2eeyo5g73j4.amplifyapp.com  Spaghetti source code: https://github.com/renebrandel/use-use'
                  type="Regular"
                  className=" ml-3 text-14 text-[#E5E5E5]"
                />
                </View>
            )})}
          </ScrollView>
        </SafeAreaView> 
      </ImageBackground>
        </View>
        );
}

      
