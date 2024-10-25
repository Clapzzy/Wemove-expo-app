import React from 'react';
import { Tabs } from 'expo-router';
import { Foundation, Feather, FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { MainProvider } from '@/helper/mainScreensContext';
import { collectManifestSchemes } from 'expo-linking';

export default function TabLayout() {
  return (
    <MainProvider>
      <Tabs
        backBehavior="history"
        screenOptions={{
          tabBarActiveTintColor: "#E5E5E5",
          tabBarStyle: {
            borderTopWidth: 0,
            height: 90,
            backgroundColor: "#0F0F0F",
            position: 'absolute',
            elevation: 0
          },
        }
        }
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color }) => <Foundation name='home' size={34} color={color} />,
          }}
        />
        <Tabs.Screen
          name="challenges"
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color }) => <Feather name="target" size={32} color={color} />,
            headerStyle: { backgroundColor: "#2c2c2c" }
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color }) => <Ionicons name="search" size={34} color={color} />,
          }}
        />
        <Tabs.Screen
          name="inbox"
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color }) => <Feather name="inbox" size={34} color={color} />,
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
    </MainProvider>
  );
}
