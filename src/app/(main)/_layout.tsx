import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import ChallengeIcon from '@/components/icons/challengesIcon';
import GroupIcon from '@/components/icons/groupIcon';
import HomeIcon from '@/components/icons/homeIcon';
import SearchIcon from '@/components/icons/searchIcon';
import CogIcon from '@/components/icons/cogIcon';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: "#737373",
      tabBarStyle: {
        height: 70,
        backgroundColor: "#2c2c2c",
      },
    }
    }
    >
      <Tabs.Screen
        name="challenges"
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => <ChallengeIcon />,
          headerStyle: { backgroundColor: "#2c2c2c" }
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => <CogIcon />,
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => <GroupIcon />,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => <HomeIcon />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => <SearchIcon />,
        }}
      />

    </Tabs >
  );
}
