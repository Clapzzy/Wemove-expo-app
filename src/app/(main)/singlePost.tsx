import { useInfiniteQuery, QueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { MaterialIcons, Feather, Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome6 } from '@expo/vector-icons';
import { Platform, Image, Text, View, KeyboardAvoidingView, ImageBackground, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, Touchable, ScrollView, FlatList } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useRef, useState, memo, useMemo } from "react";
import CustomText from "@/components/customText";
import { fetchUsers } from "@/helper/fetchUsers";
import SearchItem from "@/components/searchItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { addComment, fetchSinglePost } from "@/helper/challanges";
import Animated, { useSharedValue } from "react-native-reanimated";

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign)

export default function SinglePost() {
  const [comment, setComment] = useState("")
  const [dataComments, setDataComments] = useState({})

  const commentRef = useRef(null)
  const scrollRef = useRef(null)

  const insets = useSafeAreaInsets()
  const queryParams = useLocalSearchParams()

  const likeTransformX = useSharedValue(0)
  const likeRotation = useSharedValue(0)

  const commentMutation = useMutation({
    mutationFn: addComment,
    mutationKey: ["comment"],
    onSuccess(data, variables, context) {
      setDataComments(prevData => ({
        ...prevData,
        comments: [data, ...prevData?.comments]
      }));
      setComment("")
      Keyboard.dismiss()
    },
    onSettled(data, error, variables, context) {
    },
  })

  const post = useQuery({
    queryKey: ['post', "single"],
    queryFn: () => {
      return fetchSinglePost(queryParams.username, queryParams._id)
    },
  })

  if (post.isSuccess == true) {
    if (dataComments?.attachmentUrl != post.data.attachmentUrl) {
      setDataComments(post.data)
    }
  }


  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 20,
  });



  const postComment = async () => {
    const posterUsername = await AsyncStorage.getItem("username")
    commentMutation.mutate({ posterUsername, username: queryParams.username, message: comment, _id: queryParams._id })
  }

  const removeKeyboard = () => {
    Keyboard.dismiss()
  }

  const MemoizedInput = useMemo(() => (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={16}
        className="relative bg-[#0f0f0f] bottom-0 w-full flex-row justify-between items-center pt-3 px-4 "
      >
        <TextInput
          value={comment}
          onChangeText={setComment}
          ref={commentRef}
          placeholder="Write a comment..."
          className="h-12 flex-1 bg-[#171716] text-18 text-lime-100 rounded-full px-3 py-2"
        ></TextInput>
        <Pressable onPress={postComment}>
          <Feather name="send" className="ml-3 mt-1" size={28} color={comment.length == 0 ? "#737373" : "#bcbcbc"} />
        </Pressable>
      </KeyboardAvoidingView>
      <View className="relative bottom-0 bg-[#0f0f0f] w-full " style={{ height: insets.bottom }}></View>
    </>
  ), [comment, postComment, insets.bottom]);


  const MemoizedFlatlist = useMemo(() => {
    return (
      <>
        <FlatList
          ref={scrollRef}
          className="w-full"
          style={{
            zIndex: 1
          }}
          data={
            dataComments?.comments
          }
          keyExtractor={item => {
            return item._id
          }}
          showsVerticalScrollIndicator={false}
          viewabilityConfig={viewabilityConfig.current}
          renderItem={(item) => {
            return (
              <Pressable>
                <View className="flex-row px-4 gap-3 mt-6">
                  <Image
                    className="w-10 h-10 rounded-full"
                    source={item.item.userPfp == "" || item.item.userPfp == undefined ? require('../../../assets/pfp2.png') : { uri: item.item.userPfp }}
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
              </Pressable>
            )
          }}
          ListHeaderComponent={() => {
            return (
              <Pressable>
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
                    source={queryParams.attachmentUrl == "" || queryParams.attachmentUrl == undefined ? require('../../../assets/pfp2.png') : { uri: queryParams.attachmentUrl }}
                    className='mt-7 w-full h-[265] rounded-xl'
                  />
                  <View className='flex-row w-full px-24 mb-2 mt-6 justify-between'>
                    <Pressable>
                      <AnimatedAntDesign name="like2" size={32} color="#c4c4c4" />
                    </Pressable>
                    <Pressable onPress={() => {
                      commentRef.current?.focus()
                    }}>
                      <MaterialCommunityIcons name="comment-outline" size={32} color="#c4c4c4" />
                    </Pressable>
                  </View>
                  <View className='w-full h-[1] bg-zinc-900 mt-8'></View>
                </View>
              </Pressable>
            )
          }}
        />
      </>
    )
  }, [dataComments, setDataComments, dataComments?.comments])

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
        {/*tova e malumno*/}
        {MemoizedFlatlist}
        {MemoizedInput}
      </View >
    </TouchableWithoutFeedback >
  );
}
