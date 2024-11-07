import "../global.css";
import { Slot, Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'react-native-reanimated'
import { GestureHandlerRootView } from "react-native-gesture-handler";

const client = new QueryClient()


export default function Layout() {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={client}>
        <Stack screenOptions={{ headerShown: false, orientation: "portrait_up" }}>
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
          <Stack.Screen name="(profile-maker)" options={{ headerShown: false }} />
          <Stack.Screen name="(test)" options={{ headerShown: false }} />
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
