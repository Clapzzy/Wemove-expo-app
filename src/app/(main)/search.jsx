import { useInfiniteQuery, QueryClient } from "@tanstack/react-query";
import { MaterialIcons } from '@expo/vector-icons';
import { Image, Text, View, ImageBackground, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, Touchable, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import CustomText from "@/components/customText";
import { fetchUsers } from "@/helper/fetchUsers";
import SearchItem from "@/components/searchItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

//interface userItem {
//  _id: string,
//  username: string,
//  picture: string
//}
export default function Search() {

  const [search, setSearch] = useState('')

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['users', search],
    queryFn: ({ pageParam }) => {
      return fetchUsers(pageParam)
    },
    initialPageParam: { searchKeyword: search, lastId: '' },
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {

      return { searchKeyword: search, lastId: lastPage[lastPage?.length - 1]?._id }
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
      <View className="bg-[#060605] flex-[1]">
        <SafeAreaView className="flex-[1]">
          <View className="px-6"  >
            <CustomText text="Search" type="ExtraBold" className="text-[#BFE500] text-32" />
            <View className="flex-row items-center bg-[#131311] opacity-70 text-20 text-[#A3A3A3] h-10 mt-6 rounded-lg  pl-3" >
              <MaterialIcons name="search" size={20} color="#A3A3A3" className="relative " />
              <TextInput
                className="bg-[#131311] flex-[1] text-20 text-[#666666] h-10 rounded-lg pl-2"
                style={{ fontFamily: 'Regular' }}
                onChangeText={setSearch}
                textInp
                placeholder="Search"
                placeholderTextColor="#666666"
                value={search}
              >
              </TextInput>
            </View>
            <FlatList
              className="mb-64 w-full"
              data={data?.pages.flat()}
              keyExtractor={item => item.username}
              showsVerticalScrollIndicator={false}
              onViewableItemsChanged={({ viewableItems, changed }) => {
                const lastVisibleItem = viewableItems[viewableItems.length - 1];

                if (lastVisibleItem) {
                  const { index } = lastVisibleItem;

                  //!!!!!!!!!!!losho ako ima mnnogo nesta v data!
                  if (index >= data?.pages.flat().length - 3) {
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
                  <SearchItem
                    username={item.item.username}
                    displayName={item.item.displayName}
                    pfpUrl={item.item.pictureUrl}
                  >
                  </SearchItem>
                )
              }}
            >
            </FlatList>
          </View>
        </SafeAreaView>
      </View >
    </TouchableWithoutFeedback>
  );
}

/*               <View className="flex-[1]">
               <View className=" items-center justify-center">
                  <Pressable className='mt-5' onPress={() => fetchNextPage()}>
                    <View className="w-40 h-20 bg-blue-50 justify-center p-2">
                      <CustomText text='Natisni me' ></CustomText>
                    </View>
                  </Pressable>
                </View>
                <ScrollView className="">
                  {data?.pages.flat().map((item, i) => {
                    console.log(item)
                    console.log(i)
                    return (
                      <View key={i}>
                        <CustomText text={item.username} ></CustomText>
                        <CustomText text={item?.displayName} ></CustomText>
                      </View>
                    )
                  })}
                </ScrollView>
              </View>
*/
/*
    <View className="items-center bg-black flex-1 color-white">
      <View className="w-full h-full bg-[#080808]" >
        <SafeAreaView className="w-full h-full">
          <TouchableWithoutFeedback onPress={removeKeyboard}>
            <View className="px-4"  >
              <CustomText text="Search" type="ExtraBold" className="text-[##BFE500] text-32" />
              <TextInput className="bg-[#080807] opacity-70 text-20 text-[#A3A3A3] h-10 w-fit mt-2 rounded-lg  pl-3" onChangeText={setSearch}
                placeholder="Search"
                placeholderTextColor="#A3A3A3"
                value={search}
              >
              </TextInput>
              <View className="flex-row justify-between mt-5 mb-3">
                <FixedButton text="Хора" backgroundColorButton="#030302B3" textColor="#A3A3A3" />
                <FixedButton text="Групи" backgroundColorButton="#030302B3" textColor="#2C2C2C" />
              </View>
              <View className="h-[1] w-fit bg-[#BFE500]"></View>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </View>
    </View >
*/
