import { useInfiniteQuery, QueryClient, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MaterialIcons, Feather, Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome6 } from '@expo/vector-icons';
import { Platform, Image, Text, View, KeyboardAvoidingView, ImageBackground, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, Touchable, ScrollView, FlatList } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useRef, useState, memo, useMemo, useCallback } from "react";
import CustomText from "@/components/customText";
import { fetchUsers } from "@/helper/fetchUsers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { addComment, fetchSinglePost } from "@/helper/challanges";
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";
import SkeletonExpo from "moti/build/skeleton/expo";

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign)
const AnimatedFontAwesome6 = Animated.createAnimatedComponent(FontAwesome6)

export default function SinglePost() {
  const [comment, setComment] = useState("")
  const [dataComments, setDataComments] = useState({})
  const [loaded, setLoaded] = useState(false)

  const commentRef = useRef(null)
  const scrollRef = useRef(null)

  const insets = useSafeAreaInsets()
  const queryParams = useLocalSearchParams()
  const queryClient = useQueryClient()

  useFocusEffect(
    useCallback(() => {
      setLoaded(false)
      setDataComments({})


      queryClient.invalidateQueries({ queryKey: ['post', "single"] })
      queryClient.invalidateQueries({ queryKey: ['comment'] })
    }, [])
  )

  const likeAnimationValue = useSharedValue(0)

  const likeAnimationStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(likeAnimationValue.value, [0, 100], [0, -10]) },
      { rotate: interpolate(likeAnimationValue.value, [0, 100], [0, -20]) + "deg" },
      { scale: interpolate(likeAnimationValue.value, [0, 100], [1, 1.1]) }
    ]
  }))

  const onLike = () => {
    likeAnimationValue.value = withSequence(
      withTiming(100, { easing: Easing.inOut(Easing.quad), duration: 200 }),
      withTiming(0, { easing: Easing.inOut(Easing.quad), duration: 200 })
    )
  }


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
                <Animated.View className="flex-row px-4 gap-3 mt-6">
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
                      <Pressable >
                        <Animated.View >
                          <FontAwesome6 name="heart" size={16} color="#dc2626" />
                        </Animated.View>
                      </Pressable>
                      <CustomText
                        text={item.item.likes + " likes"}
                        type="Light"
                        className="text-12 text-[#A3A3A3]"
                      ></CustomText>
                    </View>
                  </View>
                </Animated.View>
              </Pressable>
            )
          }}
          ListHeaderComponent={() => {
            return (
              <Pressable>

                <SkeletonExpo.Group show={!loaded}>
                  <View className='mt-5'>
                    <CustomText
                      style={loaded == false ? { display: 'none' } : {}}
                      text={queryParams.challengeDesc}
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
                      text={queryParams.description}
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
                      <Image
                        source={{ uri: queryParams.attachmentUrl }}
                        className=' w-full h-[265] rounded-xl'
                        style={{ width: "100%", height: 265, borderRadius: 12 }}
                        onLoad={() => { setLoaded(true) }}
                      />
                    </SkeletonExpo>
                  </View>
                  <View
                    style={loaded == true ? { display: 'none' } : {}}
                    className='px-3 mt-6'>
                    <SkeletonExpo height={16} width={"50%"} colorMode='dark' radius={4}>
                    </SkeletonExpo>
                  </View>
                  <View style={loaded == false ? { display: 'none' } : {}} className='flex-row w-full px-24 mb-2 mt-6 justify-between'>
                    <Pressable onPress={onLike}>
                      <AnimatedAntDesign style={likeAnimationStyle} name="like2" size={32} color="#c4c4c4" />
                    </Pressable>
                    <Pressable onPress={() => {
                      commentRef.current?.focus()
                    }}>
                      <MaterialCommunityIcons name="comment-outline" size={32} color="#c4c4c4" />
                    </Pressable>
                  </View>
                  <View className='w-full h-[1] bg-zinc-900 mt-8'></View>

                </SkeletonExpo.Group>

              </Pressable >
            )
          }}
        />
      </>
    )
  }, [dataComments, setDataComments, dataComments?.comments, queryParams])

  return (
    <TouchableWithoutFeedback className='flex-[1]' onPress={removeKeyboard}>
      <View style={{ paddingTop: insets.top }} className="bg-[#060605] flex-[1]">
        <View
          className="relative mb-2 bg-[#060605]"
        >
          <View className="flex-row gap-3 items-center">
            <Pressable onPress={() => {
              router.back()
            }}>
              <Ionicons name="close-outline" className="ml-1" size={36} color="#bfe500" />
            </Pressable>
            <Pressable className="flex-row" onPress={async () => {
              router.navigate(`/(main)/profile/${encodeURIComponent(queryParams.username)}`)
            }}>
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
/*
 *<View className="px-3">
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
                    <Pressable onPress={onLike}>
                      <AnimatedAntDesign style={likeAnimationStyle} name="like2" size={32} color="#c4c4c4" />
                    </Pressable>
                    <Pressable onPress={() => {
                      commentRef.current?.focus()
                    }}>
                      <MaterialCommunityIcons name="comment-outline" size={32} color="#c4c4c4" />
                    </Pressable>
                  </View>
                  <View className='w-full h-[1] bg-zinc-900 mt-8'></View>
                </View> */
