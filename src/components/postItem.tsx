import { View, Image, Pressable } from 'react-native'
import CustomText from './customText'
import { router } from 'expo-router'

export default function PostItem(props) {
  const { pfpUrl, attachmentUrl, username, description, challengeDesc, datePosted } = props
  console.log(pfpUrl)


  return (
    <>
      <Pressable className='px-3'>
        <Pressable className="flex-row mt-7" onPress={async () => {
          router.push(`/(main)/profile/${username}`)
        }}>
          <Image
            className='rounded-full h-11 w-11 '
            source={pfpUrl == "" || pfpUrl == undefined ? require('../../assets/pfp2.png') : { uri: pfpUrl }}
          />
          <View className="flex-col gap-[4] ml-2">
            <CustomText text={username} type="SemiBold" className="text-14 text-[#E4FF66]" />
            <View className="flex-row gap-1">
              <Image className="w-[14] h-[14]" source={require("../../assets/allmatch.png")} />
              <CustomText text="Today" type="Light" className="text-12 text-[#C4C4C4]" />
            </View>
          </View>
        </Pressable>
        <CustomText
          text={challengeDesc}
          type="SemiBold"
          className='text-white text-18 mt-6'
        ></CustomText>
        <CustomText
          text={description}
          type="Regular"
          className="text-14 text-[#C4C4C4] mt-2"
        ></CustomText>
        <Image
          source={{ uri: attachmentUrl }}
          className='mt-7 w-full h-[265] rounded-xl'
        />
      </Pressable>
      <View className='w-full h-[1] bg-zinc-900 mt-8'></View>
    </>
  )
}
