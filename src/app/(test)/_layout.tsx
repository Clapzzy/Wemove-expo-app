import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import ChallengeIcon from '@/components/icons/challengesIcon';

export default function TabLayout() {
  return (
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
        name="challenges"
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => <View className="w-6 h-7 bg-white" />,
          headerStyle: { backgroundColor: "#2c2c2c" }
        }}
      />
    </Tabs >
  );
}
