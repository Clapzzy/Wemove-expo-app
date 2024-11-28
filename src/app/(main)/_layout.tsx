import React, { useContext, useEffect } from 'react';
import { Tabs } from 'expo-router';
import { Foundation, Feather, FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import MainContext, { MainProvider } from '@/helper/mainScreensContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDiffClamp } from '@/helper/diffClamp';
import Animated from 'react-native-reanimated';

const AnimatedTabs = Animated.createAnimatedComponent(Tabs)

export default function TabLayout() {
  const insets = useSafeAreaInsets()

  const { sharedAnimatedValue } = useContext(MainContext)


  const IconWrapper = ({ children }) => (
    <View className='flex-1 justify-center items-center'>
      {children}
    </View>
  )


  return (
    <Tabs
      backBehavior="history"
      screenOptions={{
        tabBarActiveTintColor: "#E5E5E5",
        tabBarStyle: [{
          position: "absolute",
          backgroundColor: "#0F0F0F",
          alignItems: "center",
          justifyContent: "center",
          borderTopWidth: 0,
          height: 70,
          elevation: 0,
          paddingTop: 10,
          paddingBottom: 10,
          marginBottom: insets.bottom - 10,
          marginHorizontal: 15,
          borderRadius: 20
        }],
      }
      }
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIconStyle: {
            flex: 1,
            height: "100%",
            width: "100%",
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarStyle: {
            display: 'none'
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <IconWrapper>
              <Foundation name='home' size={34} color={color} />
            </IconWrapper>
          ),
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          tabBarIconStyle: {
            flex: 1,
            height: "100%",
            width: "100%",
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <IconWrapper>
              <Feather name="target" size={32} color={color} />
            </IconWrapper>
          ),
          headerStyle: { backgroundColor: "#2c2c2c" }
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIconStyle: {
            flex: 1,
            height: "100%",
            width: "100%",
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <IconWrapper>
              <Ionicons name="search" size={34} color={color} />
            </IconWrapper>
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          tabBarIconStyle: {
            flex: 1,
            height: "100%",
            width: "100%",
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <IconWrapper>
              <Feather name="inbox" size={34} color={color} />
            </IconWrapper>
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            display: 'none'
          },
          href: null,
        }}
      />
      <Tabs.Screen
        name="post_preview"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            display: 'none'
          },
          href: null,
        }}
      />
      <Tabs.Screen
        name="singlePost"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            display: 'none'
          },
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/[user]"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            display: 'none'
          },
          href: null,
        }}
      />
    </Tabs >
  );
}
