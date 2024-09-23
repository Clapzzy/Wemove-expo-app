import { Link, router } from "expo-router";
import { View, TouchableOpacity, Keyboard, Text, ImageBackground, TextInput, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext, useEffect, useRef, useState } from "react";
import CustomText from "@/components/customText";
import PrimaryButtonRegister from "@/components/buttonPrimary";
import { Ionicons } from '@expo/vector-icons/';

import RegisterContext from "@/helper/loginContext";
import ExpoCheckbox from "expo-checkbox/build/ExpoCheckbox";
import Checkbox from "expo-checkbox";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function BirthdayPage() {
  const insets = useSafeAreaInsets()
  const formData = useContext(RegisterContext)
  const [isChecked, setChecked] = useState(false)
  const [date, setDate] = useState(new Date())

  function nextPage() {
    router.push('(profile-maker)/termsPage')

  }

  return (
    <View className="items-center bg-[#080707] flex-1 color-white">
      <ImageBackground style={{ paddingTop: insets.top }} className="w-full h-full" source={require('assets/waves3.png')}>
        <TouchableOpacity className=' left-4 w-[42] h-[42]  bg-[#13131080] justify-center rounded-full' onPress={() => { router.back() }}>
          <Ionicons className='mr-3' name="caret-back-outline" size={38} color="#E4FF66" />
        </TouchableOpacity>
        <View className="items-center w-full h-full">
          <CustomText text="What's your birthday?" className=" p-5 text-24 text-[#E5E5E5] mt-10 mb-6" type="Bold"></CustomText>

          <View className='m-2 w-fit p-4 rounded-[10] bg-[#131310] opacity-70 '>
            <RNDateTimePicker
              className="w-full"
              onChange={(event, date) => {
                setDate(date)
              }}
              mode="date"
              display="spinner"
              value={date}
            ></RNDateTimePicker>
          </View>
          <PrimaryButtonRegister onPress={nextPage} text="Next ->" backgroundColorButton="#E4FF65" textColor="#1A2E05" className="mt-56" />
        </View>
      </ImageBackground >
    </View >
  );
}



