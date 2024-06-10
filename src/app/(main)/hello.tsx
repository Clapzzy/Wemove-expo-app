import { Text, View, ScrollView, Image, ImageBackground, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useState } from "react";
import { CameraView, useCameraPermissions } from 'expo-camera'
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchChallenges, fetchWeeklyChallenges } from "../../helper/challanges"
import CustomText from "../../components/customText"
import NormalButton from "../../components/normalButton"
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainContext from "@/helper/mainScreensContext";

export default function Hello() {
  const [image, changeImage] = useState(null)
  const myData = useContext(MainContext)

  const getImage = async () => {
    const pic = await AsyncStorage.getItem("tempPic")
    changeImage(pic)
    console.log(image + "          dsajdoashdoaodajda");
    console.log(myData.data.currentPicUrl + "            hellok");
    return pic
  }

  const queryChallenges = useQuery({
    queryKey: ['image'],
    queryFn: () => getImage()
  })



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
            <CustomText text={queryChallenges.error} type="Bold" className=" text-30 text-gray-500" />
          </SafeAreaView>
        </ImageBackground >
      </View >

    )
  }
  return (
    <View className="items-center bg-[#262626] flex-1 color-white">
      <ImageBackground className="w-full h-full" source={require('assets/waves2.png')}>
        <ScrollView>
          <SafeAreaView>
            <Image
              source={{
                uri: `data:image/jpeg;base64,${image}`,
              }}
              style={{ height: 400, width: 358, borderRadius: 10 }}
            />
          </SafeAreaView>
        </ScrollView>
      </ImageBackground >
    </View >
  );


}
