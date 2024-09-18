import React from 'react';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import ChallengeIcon from '@/components/icons/challengesIcon';
import GroupIcon from '@/components/icons/groupIcon';
import HomeIcon from '@/components/icons/homeIcon';
import SearchIcon from '@/components/icons/searchIcon';
import CogIcon from '@/components/icons/cogIcon';
import { View } from 'react-native';
import { MainProvider } from '@/helper/mainScreensContext';

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
            tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="challenges"
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color }) => <ChallengeIcon color={color} />,
            headerStyle: { backgroundColor: "#2c2c2c" }
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color }) => <SearchIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="inbox"
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color }) => <Feather name="inbox" size={30} color={color} />,
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
