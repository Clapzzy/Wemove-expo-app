import { View, Image, Pressable } from 'react-native'
import CustomText from './customText'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router'

export default function PostItem(props) {
  const { pfpUrl, attachmentUrl, username, description, challengeDesc, datePosted, _id, isX } = props

  return (
    <View className='bg-[#060605]'>
      <Pressable className='px-2' onPress={() => {
        router.navigate(`/(main)/singlePost?pfpUrl=${encodeURIComponent(pfpUrl)}&username=${encodeURIComponent(username)}&description=${encodeURIComponent(description)}&challengeDesc=${encodeURIComponent(challengeDesc)}&attachmentUrl=${encodeURIComponent(attachmentUrl)}&datePosted=${encodeURIComponent(datePosted)}&${encodeURIComponent("_id")}=${encodeURIComponent(_id)}`)
      }}>
        <Pressable className="flex-row mt-7" onPress={async () => {
          router.navigate(`/(main)/profile/${encodeURIComponent(username)}`)
        }}>
          <Image
            className='rounded-full h-12 w-12 '
            source={pfpUrl == "" || pfpUrl == undefined ? require('../../assets/pfp2.png') : { uri: pfpUrl }}
          />
          <View className="flex-col gap-[4] ml-3">
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
      <View className='flex-row w-full px-24 mb-2 mt-6 justify-between'>
        <Pressable>
          <AntDesign name="like2" size={32} color="#c4c4c4" />
        </Pressable>
        <Pressable>
          <MaterialCommunityIcons name="comment-outline" size={32} color="#c4c4c4" />
        </Pressable>
      </View>
      <View className='w-full h-[1] bg-zinc-900 mt-8'></View>
    </View>
  )
}
