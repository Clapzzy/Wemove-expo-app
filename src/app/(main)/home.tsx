import { Text, Image, View, ImageBackground, Animated, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, Touchable, FlatList, ScrollView, FlatListComponent } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../helper/challanges"
import CustomText from "@/components/customText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { useScrollToTop } from '@react-navigation/native';
import MainContext from "@/helper/mainScreensContext";
import PostItem from "@/components/postItem";


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

  const queryChallenges = useQuery({
    queryKey: ['image'],
    queryFn: () => getImage()
  })

  const [image, changeImage] = useState(null)
  const scrollRef = useRef(null)

  const myData = useContext(MainContext)
  const insets = useSafeAreaInsets()


  useScrollToTop(
    React.useRef({
      scrollToTop: () => scrollRef.current?.scrollTo({ y: 100 }),
    })
  );

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 60,
    waitForInteraction: false,
  })

  const getImage = async () => {
    const pic = await AsyncStorage.getItem("tempPic")
    changeImage(pic)
    return pic
  }

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
    <View className="items-center bg-[#060605] flex-[1] color-white">
      <View className=" flex-[1] w-full  flex-col">
        <Animated.FlatList
          ref={scrollRef}
          className="w-full"
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
 * */
