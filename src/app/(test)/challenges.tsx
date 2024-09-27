import { Text, View, ScrollView, Image, ImageBackground, FlatList, Pressable } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { CameraView, useCameraPermissions } from 'expo-camera'
import { router } from "expo-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchChallenges } from "../../helper/challanges"
import CustomText from "../../components/customText"
import NormalButton from "../../components/normalButton"
import CustomItalicText from "@/components/customItalicText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchCurrentUserProfile, fetchProfile } from "@/helper/fetchUserProfile";

export default function Challenges() {

  const insets = useSafeAreaInsets()
  const queryClient = useQueryClient()
  const [camera, setCamera] = useState(false)
  const [permission, requestPermision] = useCameraPermissions()
  const [renderHelper, setRenderHelper] = useState(false)
  const [username, setUsername] = useState("")


  const queryChallenges = useQuery({
    queryKey: ['challenges'],
    queryFn: () => fetchChallenges()
  })

  const queryProfile = useQuery({
    queryKey: ["profile"],
    queryFn: () => {
      return fetchCurrentUserProfile()
    }
  })

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] })
    }, [])
  )
  const hello = useEffect(() => {
  }, [renderHelper])

  const completeChallenge = async (challengeId, challengeDesc) => {
    await AsyncStorage.setItem("challengeId", challengeId)
    await AsyncStorage.setItem("challengeDesc", challengeDesc)
    router.push("/(main)/camera")
  }




  if (queryChallenges.isLoading) {
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



  if (queryChallenges.isError) {
    return (
      <View className="items-center bg-[#262626] flex-1 color-white">
        <ImageBackground className="w-full h-full" source={require('assets/waves.png')}>
          <SafeAreaView>
            <CustomText text={queryChallenges.error.message} type="Bold" className=" text-30 text-gray-500" />
          </SafeAreaView>
        </ImageBackground >
      </View >

    )
  }



  return (
    <View className="items-center bg-[#060605] flex-1 color-white">
      <ScrollView style={{ paddingTop: insets.top, width: "100%" }}>
        <View className="w-full justify-between flex-row mx-4">
          <Pressable onPress={async () => {
            const username = await AsyncStorage.getItem("username")
            router.push(`/(main)/profile/${username}`)
          }}>
            <Image
              className='rounded-full h-14 w-14 mb-3'
              source={queryProfile.data?.pictureUrl == "" || queryProfile.data?.pictureUrl == undefined ? require('../../../assets/pfp2.png') : { uri: queryProfile.data?.pictureUrl }}
            />
          </Pressable>
        </View>
        {queryChallenges.data.dailyChallenges[0].completed && queryChallenges.data.dailyChallenges[1].completed && queryChallenges.data.weeklyChallenges[0].completed
          ? (
            <View className="px-6"  >
              <View className="mt-60 justify-center">
                <View className='m-2 w-fit p-4 rounded-[10] justify-center items-center bg-[#131310] opacity-70 '>
                  <CustomText text='You have no more ' type="Bold" className="text-22 text-[#bfe500] mb-2" />
                  <CustomText text='challenges for today!' type="Bold" className="text-22 text-[#bfe500] mb-2" />
                </View>
              </View>
            </View>
          )
          : false
        }
        {!queryChallenges.data.dailyChallenges[0].completed && !queryChallenges.data.dailyChallenges[1].completed
          ? (<CustomItalicText text="Ежедневни" type="ExtraBold" className=" pt-8 pl-8 text-30 text-[#e5e5e5]" />)
          : false}
        {queryChallenges.data.dailyChallenges.map((item, index) => {
          if (item.completed == true) {
            return
          }
          let string = `Предизвикателство #${index + 1}`
          let title = item.description;
          return (
            <View key={index} className='m-2 w-fit p-4 rounded-[10] bg-[#131310] opacity-70 '>
              <CustomText text={string} type="Bold" className="text-22 text-[#bfe500] mb-2" />
              <CustomText text={title} type="Medium" className="text-16 text-[#E5E5E5] pb-2" />
              <View className="mt-5 mb-[8] w-full content-between flex-row place-content-between justify-between">
                <NormalButton text="Смени" textColor="#737373" style={{ borderColor: "#2c2c2c", borderWidth: 1.5 }} />
                <NormalButton onPress={completeChallenge.bind(this, item.challengeId, item.description)} text="Виж повече" textColor="#1A2E05" backgroundColorButton="#D9F99D" style={{ borderColor: "#D9F99D", borderWidth: 1.5 }} />
              </View>
            </View>
          )
        })}
        {!queryChallenges.data.weeklyChallenges[0].completed
          ? (<CustomItalicText text="Седмични" type="ExtraBold" className=" pl-8 text-30 mt-2 text-[#e5e5e5]" />)
          : false}
        {queryChallenges.data.weeklyChallenges.map((item, index) => {
          if (item.completed == true) {
            return
          }
          let string = `Предизвикателство #${index + 4}`
          let title = item.description;
          return (
            <View key={index + 4} className='m-2 w-fit p-4 rounded-[10] bg-[#131310] opacity-70 ' >
              <CustomText text={string} type="Bold" className="text-22 text-[#bfe500] mb-2" />
              <CustomText text={title} type="Medium" className="text-16 text-[#E5E5E5] pb-2" />
              <View className="mt-5 mb-[8] w-full content-between flex-row place-content-between justify-between">
                <NormalButton text="Смени" textColor="#737373" style={{ borderColor: "#2c2c2c", borderWidth: 1.5 }} />
                <NormalButton onPress={completeChallenge.bind(this, item.challengeId, item.description)} text="Виж повече" textColor="#1A2E05" backgroundColorButton="#D9F99D" style={{ borderColor: "#D9F99D", borderWidth: 1.5 }} />
              </View>
            </View>
          )
        })}
      </ScrollView>
    </View >
  );


}
/*
  <View>
   {camera ?  (
   <View className=" flex-1 justify-center">
    <CameraView className="flex-1">
    </CameraView>
   </View>
   ): <Text>No</Text>}
  </View>
 
*/
