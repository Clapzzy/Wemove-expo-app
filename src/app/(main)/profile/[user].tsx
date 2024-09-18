
import { useCallback, useContext, useRef, useState } from 'react';
import { TouchableOpacity, View, Pressable, Image, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import MainContext from '@/helper/mainScreensContext';
import { Ionicons } from '@expo/vector-icons/';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomText from '@/components/customText';
import { router, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '@/helper/fetchUserProfile';

export default function postPreview() {
  const insets = useSafeAreaInsets()
  const urlParams = useLocalSearchParams()
  const queryProfile = useQuery({
    queryKey: ["profile"],
    queryFn: () => {
      return fetchProfile(urlParams?.user)
    }
  })
  console.log(queryProfile.data)

  return (
    <View className="items-center bg-[#060604] flex-[1] color-white">
      <View className="w-full h-full" >
        <View className='w-full h-40 bg-gray-500'></View>
        <TouchableOpacity className=' absolute  top-8 left-4 w-[42] h-[42] bg-[#13131080] justify-center rounded-full' onPress={() => { router.back() }}>
          <Ionicons className='mr-3' name="caret-back-outline" size={38} color="#E4FF66" />
        </TouchableOpacity>
        <View className='flex-[1] px-4'>
          <View className='h-28 w-full flex-row justify-between items-center rounded-full relative bottom-7 mb-3'>
            <View className='w-[100] h-[100] justify-center rounded-full bg-[#080707] p-1'>
              <Image
                source={queryProfile?.data?.pictureUrl == "" ? require('../../../../assets/pfp2.png') : { uri: queryProfile.data?.pictureUrl }}
                className=" rounded-full w-full h-full"
              ></Image>
            </View>
            <Pressable>
              <View className=' justify-center items-center rounded-xl px-6 py-1.5 border-2 mt-3 border-zinc-600'>
                <CustomText className="tracking-tight text-14 color-[#696969]" type="SemiBold" text="Edit profile" ></CustomText>
              </View>
            </Pressable>
            {/*TODO make this a component ^^^^^^*/}
          </View>
          <View className='flex-[1] relative bottom-7'>
            <CustomText text={queryProfile.data?.displayName} type="ExtraBold" className="text-22 color-[#C2DC55]" />
            <View className='flex-row gap-2 mt-3'>
              <CustomText text={'@' + queryProfile.data?.username} type="Medium" className="text-15 color-[#D9F99D]" />
              <CustomText text="." type="Black" className="relative bottom-2 text-20 color-[#D9F99D]" />
              <CustomText text="Joined Sept 2024" type="Regular" className="text-15 color-[#D9F99D]" />
            </View>
            <View className='mt-5 flex-row justify-between'>
              <View className='flex-col justify-between gap-2'>
                <CustomText text="0" type="ExtraBold" className="color-gray-100 text-16" />
                <View className='flew-row'>
                  <CustomText text="Day" type="Regular" className="color-gray-200 text-16" />
                  <CustomText text="Streak" type="Regular" className="color-gray-200 text-16" />
                </View>
              </View>
              <View className='h-full w-0.5 rounded-full bg-zinc-700'></View>
              <View className='flex-col justify-between gap-2'>
                <CustomText text="0" type="ExtraBold" className="color-gray-100 text-16" />
                <View className='flew-row'>
                  <CustomText text="Challanges" type="Regular" className="color-gray-200 text-16" />
                  <CustomText text="Completed" type="Regular" className="color-gray-200 text-16" />
                </View>
              </View>
              <View className='h-full w-0.5 rounded-full bg-zinc-700'></View>
              <View className='flex-col justify-between gap-2'>
                <CustomText text="1st" type="ExtraBold" className="color-gray-100 text-16" />
                <View className='flew-row'>
                  <CustomText text="in" type="Regular" className="color-gray-200 text-16" />
                  <CustomText text="Bulgaria" type="Regular" className="color-gray-200 text-16" />
                </View>
              </View>
            </View>
            <View className='w-full h-[1] bg-zinc-700 my-7'></View>
          </View>
        </View>
      </View >
    </View >
  );
}
