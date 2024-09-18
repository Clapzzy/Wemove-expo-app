import { View, Image, Pressable } from "react-native"
import CustomText from "./customText"
import { router } from "expo-router"

export default function SearchItem(props) {
  const { pfpUrl, username, displayName } = props



  return (
    <Pressable onPress={() => { router.push(`/(main)/profile/${username}`) }} className="w-full h-20 flex-row gap-3 mt-6">
      <Image
        source={pfpUrl == "" ? require('../../assets/pfp2.png') : { uri: pfpUrl }}
        className="w-10 h-10 rounded-full"
      ></Image>
      <View className='flex-col flex-[1] '>
        <View className="flex-[1] flex-row justify-between items-start">
          <View className="flex-col">
            <CustomText
              text={displayName}
              className="text-[#E4FF66] text-15"
              type="Bold"
            ></CustomText>
            <CustomText
              text={'@' + username}
              className="text-[#D9F99D] text-15"
              type='Regular'
            ></CustomText>
          </View>
          <Pressable>
            <View className=' justify-center items-center rounded-xl mt-1 px-8 py-1.5 border border-zinc-600'>
              <CustomText
                className="tracking-tight text-14 color-[#696969]"
                type="SemiBold"
                text="Follow"
              ></CustomText>
            </View>
          </Pressable>
        </View>
        <View className="w-full h-[1] bg-zinc-700 "></View>
      </View>
      {/*TODO make this a component ^^^^^^*/}
    </Pressable>
  )
}
