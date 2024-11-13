import { View, Pressable, Image } from 'react-native'
import CustomText from './customText'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router'
import React from 'react';
import { useState } from 'react';
import { Skeleton } from 'moti/skeleton';
import SkeletonExpo from 'moti/build/skeleton/expo';
import { Image as ExpoImage } from 'expo-image';


export default React.memo(function PostItem(props: any) {
  const { pfpUrl, attachmentUrl, username, description, challengeDesc, datePosted, _id, isX } = props
  const [loaded, setLoaded] = useState(false)

  return (
    <Skeleton.Group show={!loaded}>
      <View className=''>
        <Pressable className='px-2' onPress={() => {
          router.navigate(`/(main)/singlePost?pfpUrl=${encodeURIComponent(pfpUrl)}&username=${encodeURIComponent(username)}&description=${encodeURIComponent(description)}&challengeDesc=${encodeURIComponent(challengeDesc)}&attachmentUrl=${encodeURIComponent(attachmentUrl)}&datePosted=${encodeURIComponent(datePosted)}&${encodeURIComponent("_id")}=${encodeURIComponent(_id)}`)
        }}>
          <Pressable className="flex-row mt-7 " onPress={async () => {
            router.navigate(`/(main)/profile/${encodeURIComponent(username)}`)
          }}>
            <SkeletonExpo width={48} height={48} colorMode='dark' backgroundColor="#131310" radius={"round"}>
              <Image
                style={loaded == false ? { width: 40, height: 40, marginTop: 4, marginLeft: 4, borderRadius: 39 } : { width: 48, height: 48, borderRadius: 50 }}
                source={pfpUrl == "" || pfpUrl == undefined ? require('../../assets/pfp2.png') : { uri: pfpUrl }}
              />
            </SkeletonExpo>
            <View className="flex-col gap-[4] ml-3 mt-px">
              <SkeletonExpo height={16} width={150} radius={4} colorMode='dark' backgroundColor="#131310" >
                <CustomText
                  style={loaded == false ? { display: 'none' } : {}}
                  text={username}
                  type="SemiBold"
                  className="text-14 text-[#E4FF66]"
                />
              </SkeletonExpo>
              <SkeletonExpo height={16} width={70} radius={4} colorMode='dark' backgroundColor="#131310" >
                <View
                  style={loaded == false ? { display: 'none' } : {}}
                  className="flex-row gap-1"
                >
                  <Image className="w-[14] h-[14]" source={require("../../assets/allmatch.png")} />
                  <CustomText text="Today" type="Light" className="text-12 text-[#C4C4C4]" />
                </View>
              </SkeletonExpo>
            </View>
          </Pressable>
          <View className='mt-5'>
            <CustomText
              style={loaded == false ? { display: 'none' } : {}}
              text={challengeDesc}
              type="SemiBold"
              className='text-white text-18'
            ></CustomText>
            <View
              style={loaded == true ? { display: 'none' } : {}}
              className='gap-2'
            >
              <SkeletonExpo height={18} width={"100%"} colorMode='dark' radius={4}>
              </SkeletonExpo>
              <SkeletonExpo height={18} width={"100%"} colorMode='dark' radius={4}>
              </SkeletonExpo>
            </View>
          </View>
          <View className='mt-6'>
            <CustomText
              style={loaded == false ? { display: 'none' } : {}}
              text={description}
              type="Regular"
              className="text-14 text-[#C4C4C4]"
            ></CustomText>
            <View
              style={loaded == true ? { display: 'none' } : {}}
            >
              <SkeletonExpo height={16} width={"80%"} colorMode='dark' radius={4}>
              </SkeletonExpo>
            </View>
          </View>
          <View className='mt-3'>
            <SkeletonExpo width={"100%"} height={265} colorMode='dark' radius={12}>
              <ExpoImage
                source={{ uri: attachmentUrl }}
                className=' w-full h-[265] rounded-xl'
                style={{ width: "100%", height: 265, borderRadius: 12 }}
                onLoad={() => { setLoaded(true) }}
              />
            </SkeletonExpo>
          </View>
        </Pressable>
        <View
          style={loaded == true ? { display: 'none' } : {}}
          className='px-3 mt-6'>
          <SkeletonExpo height={16} width={"50%"} colorMode='dark' radius={4}>
          </SkeletonExpo>
        </View>
        <View style={loaded == false ? { display: 'none' } : {}} className='flex-row w-full px-24 mb-2 mt-6 justify-between'>
          <Pressable>
            <AntDesign name="like2" size={32} color="#c4c4c4" />
          </Pressable>
          <Pressable>
            <MaterialCommunityIcons name="comment-outline" size={32} color="#c4c4c4" />
          </Pressable>
        </View>
        <View className='w-full h-[1] bg-zinc-900 mt-8'></View>
      </View>
    </Skeleton.Group>
  )
}, (prevProps: any, nextProps: any) => prevProps?._id === nextProps?._id)
