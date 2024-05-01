import { Link } from "expo-router"
import { Pressable, View } from "react-native"
import React from 'react';
import { AntDesign } from "@expo/vector-icons";

type settings = {
  link: string,
}

export default function GoBackButton(props: settings) {
  const { link } = props
  return (
    <View className=" w-full justify-end items-end ">
      <Link href={link} asChild>
        <Pressable className=" mr-11 mt-6 rounded-full justify-center items-center w-12 h-12 bg-slate-800 active:bg-slate-900" >
          <AntDesign className=" color-black" name="close" size={36} />
        </Pressable>
      </Link>
    </View>
  )
}
