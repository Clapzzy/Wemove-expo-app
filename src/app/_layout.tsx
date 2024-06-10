import "../global.css";
import { Slot, Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'react-native-reanimated'

const client = new QueryClient()


export default function Layout() {
  return (
    <QueryClientProvider client={client}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen name="(profile-maker)" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
