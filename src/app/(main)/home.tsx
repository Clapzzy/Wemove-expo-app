import { Text, Image, View, ImageBackground, Animated, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, Touchable, FlatList, ScrollView, FlatListComponent } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../helper/challanges"
import CustomText from "@/components/customText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
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

  const [image, changeImage] = useState(null)
  const myData = useContext(MainContext)
  const insets = useSafeAreaInsets()
  const HEADER_HEIGHT = insets.top + 50
  const SCROLL_THRESHOLD = 300
  const SCROLL_LOCK = 100
  const scrollY = useRef(new Animated.Value(0)).current
  const diffClampScrollY = useRef(Animated.diffClamp(scrollY, 0, HEADER_HEIGHT + SCROLL_THRESHOLD + SCROLL_LOCK)).current

  const getImage = async () => {
    const pic = await AsyncStorage.getItem("tempPic")
    changeImage(pic)
    return pic
  }

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 20,
    waitForInteraction: false,
  })

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




  return (
    <View className="items-center bg-[#060605] flex-[1] color-white">
      <View className=" flex-[1] w-full  flex-col">
        <Animated.FlatList
          className="w-full"
          style={{
            zIndex: 1
          }}
          data={data?.pages.flat()}
          keyExtractor={item => {
            return item._id
          }}
          showsVerticalScrollIndicator={false}
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
          onViewableItemsChanged={({ viewableItems }) => {
            const lastVisibleItem = viewableItems[viewableItems.length - 1];
            if (lastVisibleItem) {
              const { index } = lastVisibleItem;
              console.log(index);
              if (index >= data.pages.flat().length - 3) {
                fetchNextPage();
              }
            }
          }}
          viewabilityConfig={viewabilityConfig.current}
          ListHeaderComponent={() => (<Animated.View
            style={{
              zIndex: 10,
              position: "absolute",
              height: HEADER_HEIGHT,
              transform: [{
                translateY: Animated.add(scrollY, diffClampScrollY.interpolate({
                  inputRange: [0, HEADER_HEIGHT, HEADER_HEIGHT + SCROLL_LOCK],
                  outputRange: [0, -HEADER_HEIGHT, -HEADER_HEIGHT],
                  extrapolate: "clamp"
                }))
              }]
            }}
            className='w-full bg-[#0F0F0F]'
          >
          </Animated.View>)
          }
          renderItem={(item) => {
            return (
              <View style={{ zIndex: 0.5 }}>
                <PostItem
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

        />
      </View>
    </View >
  );
}

/* <Image
                source={{
                  uri: `data:image/jpeg;base64,${image}`,
                }u}    n
              className='mt-2 h-full rounded-xl'
            />
            */
