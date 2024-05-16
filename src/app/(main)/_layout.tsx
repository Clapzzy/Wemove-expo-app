import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import ChallengeIcon from '@/components/icons/challengesIcon';
import GroupIcon from '@/components/icons/groupIcon';
import HomeIcon from '@/components/icons/homeIcon';
import SearchIcon from '@/components/icons/searchIcon';
import CogIcon from '@/components/icons/cogIcon';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: "#E5E5E5",
      tabBarStyle: {
        borderTopWidth: 0,
        height: 90,
        backgroundColor: "#2c2c2c",
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
        name="groups"
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => <GroupIcon color={color} />,
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
        name="settings"
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => <CogIcon color={color} />,
        }}
      />

    </Tabs >
  );
}
