import { Link, router } from "expo-router";
import { Text, Image, View, ImageBackground, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, Touchable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../helper/challanges"
import CustomText from "@/components/customText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import MainContext from "@/helper/mainScreensContext";

export default function Home() {

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
            <CustomText text={queryChallenges.error.message} type="Bold" className=" text-30 text-gray-500" />
          </SafeAreaView>
        </ImageBackground >
      </View >

    )
  }
  return (
    <View className="items-center bg-[#060605] flex-1 color-white">
      <SafeAreaView>
        <ScrollView>
          <View className="w-full p-4 flex-col">
            <View className="flex-row">
              <Pressable onPress={async () => {
                const username = await AsyncStorage.getItem("username")
                router.push(`/(main)/profile/${username}`)
              }}>
                <Image className='rounded-full h-14 w-14 ' source={require("../../../assets/car1.png")} />
              </Pressable>
              <View className="flex-col mt-2 ml-1">
                <CustomText text="DisplayUsername1" type="Bold" className="text-14 text-[#C1F173]" />
                <CustomText text="@Username1" type="Medium" className="text-12 text-[#777777]" />
              </View>
            </View>
            <CustomText
              text='I  built my first JavaScript framework: "use use"  1. Add HTML tags using "use ___" 2. Place content inline with "" 3. Indentation matters just like in Python  Demo: https://main.d3o2eeyo5g73j4.amplifyapp.com  Spaghetti source code: https://github.com/renebrandel/use-use'
                type="Regular"
                className=" ml-3  mt-5 text-14 text-[#E5E5E5]"
              />
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${image}`,
                }}
              style={{ height: 400, width: 358, borderRadius: 10}}
              className='mt-2'
            />
          </View>
          </ScrollView>
        </SafeAreaView>
    </View> 
  );  
}
              
