import { View, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../helper/challanges"
import { useContext } from "react";
import { Foundation, Feather, FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import MainContext from "@/helper/mainScreensContext";
import PostItem from "@/components/postItem";
import Animated, { AnimatedRef, Animation, useAnimatedRef, useAnimatedScrollHandler, useScrollViewOffset, useSharedValue, withClamp } from "react-native-reanimated";
import { Link } from "expo-router";

const IconWrapper = ({ children }) => (
  <View className='justify-center items-center'>
    {children}
  </View>
)

const AnimatedTabBar = () => {
  const insets = useSafeAreaInsets()

  return (
    <Animated.View
      className=' absolute h-[70] bg-[#0F0F0F] flex-row items-center justify-around right-4 left-4 bottom-0 z-10'
      style={{
        elevation: 0,
        marginBottom: insets.bottom - 10,
        borderRadius: 20
      }}
    >
      <Link className=" justify-center items-center" href={"/(main)/home"}>
        <Foundation name='home' size={34} color='#E5E5E5' />
      </Link>
      <Link className=" justify-center items-center" href={"(main)/challenges"} >
        <Feather name="target" size={32} color='#8f8f8f' />
      </Link>
      <Link className=" justify-center items-center" href={"(main)/search"} >
        <Ionicons name="search" size={34} color='#8f8f8f' />
      </Link>
      <Link className=" justify-center items-center" href={"(main)/inbox"} >
        <Feather name="inbox" size={34} color='#8f8f8f' />
      </Link>
    </Animated.View>
  )
}


export default function Home() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts', "home"],
    queryFn: ({ pageParam }) => {
      return fetchPosts(pageParam)
    },
    initialPageParam: { lastId: '' },
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      return { lastId: lastPage[lastPage?.length - 1]?._id }
    }
  })


  const [image, changeImage] = useState(null)
  const { sharedAnimatedValue } = useContext(MainContext)
  const prev = useSharedValue(0);
  let scrollOffset = 0
  let diff = 0
  const insets = useSafeAreaInsets()

  const scrollAnimatedRef = useAnimatedRef()
  const scrollHandler = useAnimatedScrollHandler((event) => {
    'worklet';
    scrollOffset = event.contentOffset.y
    diff = (scrollOffset - prev.get()) / 100
    if (sharedAnimatedValue.value + diff < 400 && sharedAnimatedValue.value + diff > 0) {
      sharedAnimatedValue.value = sharedAnimatedValue.value + diff
    }
    //sharedAnimatedValue.value = withClamp({ min: 0, max: 300 }, sharedAnimatedValue.value + diff)
    prev.value = scrollOffset
    //console.log(useDiffClamp(scrollOffset, prev, sharedAnimatedValue, 0, 300))
  })

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 60,
    waitForInteraction: false,
  })


  return (
    <View className="items-center bg-[#060605] flex-[1] color-white">
      <View className=" flex-[1] w-full  flex-col">
        <Animated.FlatList
          ref={scrollAnimatedRef}
          className="w-full"
          onScroll={scrollHandler}
          style={{
            zIndex: 1
          }}
          data={data?.pages.flat()}
          keyExtractor={item => {
            return item._id
          }}
          showsVerticalScrollIndicator={false}
          windowSize={7}
          maxToRenderPerBatch={5}
          removeClippedSubviews={true}
          viewabilityConfig={viewabilityConfig.current}
          onViewableItemsChanged={({ viewableItems, changed }) => {
            const lastVisableItem = viewableItems[viewableItems.length - 1]

            if (lastVisableItem) {
              const { index } = lastVisableItem
              if (index >= data.pages.flat().length - 3) {
                const lastPage = data?.pages[data?.pages.length - 1]
                if (lastPage == 0 && lastPage < data?.pages[data?.pages.length - 2]) {

                } else {
                  fetchNextPage()
                }
              }
            }
          }}
          renderItem={(item) => {
            return (
              <View style={{ zIndex: 10 }}>
                <PostItem
                  _id={item.item._id}
                  pfpUrl={item.item.userPfp}
                  attachmentUrl={item.item.attachmentUrl}
                  username={item.item.username}
                  challengeDesc={item.item.challengeDesc}
                  description={item.item.text}
                  datePosted={item.item.datePosted}
                >
                </PostItem>
              </View>
            )
          }}
          ListHeaderComponent={() => (
            <View style={{ marginTop: insets.top }}>
            </View>
          )}
        />
      </View>
      <AnimatedTabBar />
    </View >
  );
}
/*
  const HEADER_HEIGHT = insets.top + 50
  const SCROLL_THRESHOLD = 300
  const SCROLL_LOCK = 100
  const scrollY = useRef(new Animated.Value(0)).current
  const diffClampScrollY = useRef(Animated.diffClamp(scrollY, 0, HEADER_HEIGHT + SCROLL_THRESHOLD + SCROLL_LOCK)).current
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: { y: scrollY }
              }
            }
          ],
            {
              useNativeDriver: true
            })}
      <Animated.View
        style={{
          position: "absolute",
          zIndex: 10,
          height: HEADER_HEIGHT,
          transform: [{
            translateY: diffClampScrollY.interpolate({
              inputRange: [0, HEADER_HEIGHT, HEADER_HEIGHT + SCROLL_LOCK],
              outputRange: [0, -HEADER_HEIGHT, -HEADER_HEIGHT],
              extrapolateRight: "clamp"
            })

          }]
        }}
        className='w-full bg-[#0F0F0F]'
      >

  const getImage = async () => {
    const pic = await AsyncStorage.getItem("tempPic")
    changeImage(pic)
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
 * */
