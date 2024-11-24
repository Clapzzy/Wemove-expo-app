import "../global.css";
import { Slot, Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'react-native-reanimated'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { MainProvider } from "@/helper/mainScreensContext";

const client = new QueryClient()


export default function Layout() {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={client}>
        <MainProvider>
          <Stack screenOptions={{
            headerShown: false,
            orientation: "portrait_up",
          }}>
            <Stack.Screen name="(main)" options={{ headerShown: false, animation: "default" }} />
            <Stack.Screen name="(profile-maker)" options={{ headerShown: false }} />
            <Stack.Screen name="(test)" options={{ headerShown: false }} />
          </Stack>
        </MainProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
