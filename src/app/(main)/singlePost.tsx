import { useInfiniteQuery, QueryClient, useQuery } from "@tanstack/react-query";
import { MaterialIcons } from '@expo/vector-icons';
import { Image, Text, View, ImageBackground, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, Touchable, ScrollView, FlatList } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import CustomText from "@/components/customText";
import { fetchUsers } from "@/helper/fetchUsers";
import SearchItem from "@/components/searchItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { fetchSinglePost } from "@/helper/challanges";

export default function SinglePost() {

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
      return fetchSinglePost()
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
        <FlatList
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
          viewabilityConfig={viewabilityConfig.current}
          renderItem={(item) => {
            return (
              <View style={{ zIndex: 10.5 }}>
              </View>
            )
          }}

        />
      </View >
    </TouchableWithoutFeedback>
  );
}
