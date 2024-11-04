import { useInfiniteQuery, QueryClient, useQuery } from "@tanstack/react-query";
import { MaterialIcons, Feather, Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome6 } from '@expo/vector-icons';
import { Platform, Image, Text, View, KeyboardAvoidingView, ImageBackground, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, Touchable, ScrollView, FlatList } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import CustomText from "@/components/customText";
import { fetchUsers } from "@/helper/fetchUsers";
import SearchItem from "@/components/searchItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { fetchSinglePost } from "@/helper/challanges";

export default function SinglePost() {
  const commentRef = useRef(null)
  const insets = useSafeAreaInsets()
  const queryParams = useLocalSearchParams()
  const scrollRef = useRef(null)

  const {
    data,
    error,
    isFetching,
    status,
  } = useQuery({
    queryKey: ['post', "single"],
    queryFn: () => {
      return fetchSinglePost(queryParams.username, queryParams._id)
    },
  })

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 20,
  });



  function removeKeyboard() {
    Keyboard.dismiss()
  }

  return (
    <TouchableWithoutFeedback className='flex-[1]' onPress={removeKeyboard}>
      <View style={{ paddingTop: insets.top }} className="bg-[#060605] flex-[1]">
        {/* On top of flatlist the header that is just like the one of a normal post and on bottom a footer that is the comment function(both need to have their position absolute). In the flatlist header there needs to be a post but without the thing that showls who made it and in the renderItem are the comments. Need to make a custom reusable component for the comments and make and add animation for liking. Also when going back it wont be bad to pass context like if i had liked the post when inside of singlePost.*/}
        <View
          className="relative mb-2 bg-[#060605]"
        >
          <View className="flex-row gap-3 items-center">
            <Pressable onPress={() => {
              router.back()
            }}>
              <Ionicons name="close-outline" className="ml-1" size={36} color="#bfe500" />
            </Pressable>
            <Pressable className="flex-row " >
              <Image
                className='rounded-full h-12 w-12'
                source={queryParams.pfpUrl == "" || queryParams.pfpUrl == undefined ? require('../../../assets/pfp2.png') : { uri: queryParams.pfpUrl }}
              />
              <View className="flex-col gap-[4] ml-3">
                <CustomText text={queryParams.username} type="SemiBold" className="text-14 text-[#E4FF66]" />
                <View className="flex-row gap-1">
                  <Image className="w-[14] h-[14]" source={require("../../../assets/allmatch.png")} />
                  <CustomText text="Today" type="Light" className="text-12 text-[#C4C4C4]" />
                </View>
              </View>
            </Pressable>
          </View>
        </View>
        <FlatList
          ref={scrollRef}
          className="w-full"
          style={{
            zIndex: 1
          }}
          data={
            data?.comments
          }
          keyExtractor={item => {
            return item._id
          }}
          showsVerticalScrollIndicator={false}
          viewabilityConfig={viewabilityConfig.current}
          renderItem={(item) => {
            console.log(item)
            return (
              <View className="flex-row px-4 gap-3 mt-6">
                <Image
                  className="w-10 h-10 rounded-full"
                  source={item.item.pfpUrl == "" || item.item.pfpUrl == undefined ? require('../../../assets/pfp2.png') : { uri: item.item.pfpUrl }}
                />
                <View className="flex-col" >
                  <View className="flex-row mt-1 items-center">
                    <CustomText text={item.item.displayName} type="SemiBold" className="text-14 mr-3 text-[#E4FF66]" />
                    <Image className="w-[14] h-[14] mr-1" source={require("../../../assets/allmatch.png")} />
                    <CustomText text="Today" type="Light" className="text-11 text-[#C4C4C4]" />
                  </View>
                  <CustomText
                    text={item.item.message}
                    type="Regular"
                    className="text-14 text-[#C4C4C4] mt-1"
                  ></CustomText>
                  <View className="flex-row mt-3 gap-2">
                    <FontAwesome6 name="heart" size={16} color="#dc2626" />
                    <CustomText
                      text={item.item.likes + " likes"}
                      type="Light"
                      className="text-12 text-[#A3A3A3]"
                    ></CustomText>
                  </View>
                </View>
              </View>
            )
          }}
          ListHeaderComponent={() => {
            return (
              <View className="px-3">
                <CustomText
                  text={queryParams.challengeDesc}
                  type="SemiBold"
                  className='text-white text-18 mt-4'
                ></CustomText>
                <CustomText
                  text={queryParams.description}
                  type="Regular"
                  className="text-14 text-[#C4C4C4] mt-2"
                ></CustomText>
                <Image
                  source={{ uri: queryParams.attachmentUrl }}
                  className='mt-7 w-full h-[265] rounded-xl'
                />
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
          }}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={16}
          className="relative bg-[#0f0f0f] bottom-0 w-full flex-row justify-between items-center pt-3 px-4 "
        >
          <TextInput
            ref={commentRef}
            placeholder="Write a comment..."
            className="h-12 flex-1 bg-[#171716] text-18 text-lime-100 rounded-full px-3 py-2"
          ></TextInput>
          <Feather name="send" className="ml-3 mt-1" size={28} color="#bcbcbc" />
        </KeyboardAvoidingView>
        <View className="relative bottom-0 bg-[#0f0f0f] w-full " style={{ height: insets.bottom }}></View>
      </View >
    </TouchableWithoutFeedback >
  );
}
