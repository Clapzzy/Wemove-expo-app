import { Text, View, Image, ImageBackground, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { fetchChallenges, fetchWeeklyChallenges } from "../../helper/challanges"
import { SplashScreen } from "expo-router";
import CustomText from "../../components/customText"
import NormalButton from "../../components/normalButton"
import CustomItalicText from "../../components/customItalicText"
import { ScrollView } from "react-native-web";

export default function Challenges() {

  const queryChallenges = useQuery({
    queryKey: ['challenges'],
    queryFn: () => fetchChallenges()
  })
  const queryChallengesWeekly = useQuery({
    queryKey: ['weeklyChallenges'],
    queryFn: () => fetchWeeklyChallenges()
  })


  if (queryChallenges.isLoading || queryChallengesWeekly.isLoading) {
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
  if (queryChallenges.isError || queryChallengesWeekly.isError) {
    return (
      <View className="items-center bg-[#262626] flex-1 color-white">
        <ImageBackground className="w-full h-full" source={require('assets/waves.png')}>
          <SafeAreaView>
            <CustomText text={queryChallenges.error} type="Bold" className=" text-30 text-gray-500" />
          </SafeAreaView>
        </ImageBackground >
      </View >

    )
  }
  if (queryChallenges.status === "success" || queryChallengesWeekly === "success") {
  }



  return (
    <View className="items-center bg-[#262626] flex-1 color-white">
      <ImageBackground className="w-full h-full" source={require('assets/waves2.png')}>
        <SafeAreaView>
          <View className="w-fit justify-between flex-row mx-4">
            <Image source={require("../../../assets/pfp.png")} />
            <Image className="mt-2" source={require("../../../assets/inbox.png")} />
          </View>
          <CustomText text="Ежедневни" type="ExtraBoldItalic" className=" pt-8 pl-8 text-30 text-[#e5e5e5]" />
          {queryChallenges.data.map((item, index) => {
            let string = `Предизвикателство #${index + 1}`
            let title = item.description;
            return (
              <View key={index} className='m-2 w-fit p-4 rounded-[10] bg-[#080807] opacity-70 '>
                <CustomText text={string} type="Bold" className="text-22 text-[#bfe500] mb-2" />
                <CustomText text={title} type="Medium" className="text-16 text-[#E5E5E5] pb-2" />
                <View className="mt-5 mb-[8] w-full content-between flex-row place-content-between justify-between">
                  <NormalButton text="Смени" textColor="#737373" style={{ borderColor: "#2c2c2c", borderWidth: 1.5 }} />
                  <NormalButton text="Виж повече" textColor="#1A2E05" backgroundColorButton="#D9F99D" style={{ borderColor: "#D9F99D", borderWidth: 1.5 }} />
                </View>
              </View>
            )
          })}
          <CustomText text="Седмични" type="ExtraBoldItalic" className=" pl-8 text-30 mt-2 text-[#e5e5e5]" />
          {queryChallengesWeekly.data.map((item, index) => {
            console.log(index)
            let string = `Предизвикателство #${index + 4}`
            let title = item.description;
            return (
              <View key={index + 4} className='m-2 w-fit p-4 rounded-[10] bg-[#080807] opacity-70 ' >
                <CustomText text={string} type="Bold" className="text-22 text-[#bfe500] mb-2" />
                <CustomText text={title} type="Medium" className="text-16 text-[#E5E5E5] pb-2" />
                <View className="mt-5 mb-[8] w-full content-between flex-row place-content-between justify-between">
                  <NormalButton text="Смени" textColor="#737373" style={{ borderColor: "#2c2c2c", borderWidth: 1.5 }} />
                  <NormalButton text="Виж повече" textColor="#1A2E05" backgroundColorButton="#D9F99D" style={{ borderColor: "#D9F99D", borderWidth: 1.5 }} />
                </View>
              </View>
            )
          })}
        </SafeAreaView>
      </ImageBackground >
    </View >
  );
}
