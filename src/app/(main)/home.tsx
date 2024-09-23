import { Text, Image, View, ImageBackground, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, Touchable, FlatList, ScrollView, FlatListComponent } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useRef, useState } from "react";
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

  const getImage = async () => {
    const pic = await AsyncStorage.getItem("tempPic")
    changeImage(pic)
    return pic
  }

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 20,
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
        <FlatList
          style={{ paddingTop: insets.top + 12 }}
          className="w-full"
          data={data?.pages.flat()}
          keyExtractor={item => {
            return item._id
          }}
          showsVerticalScrollIndicator={false}
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
          viewabilityConfig={viewabilityConfig.current}
          renderItem={(item) => {
            return (
              <PostItem
                pfpUrl={item.item.userPfp}
                attachmentUrl={item.item.attachmentUrl}
                username={item.item.username}
                challengeDesc={item.item.challengeDesc}
                description={item.item.text}
                datePosted={item.item.datePosted}
              >
              </PostItem>
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
