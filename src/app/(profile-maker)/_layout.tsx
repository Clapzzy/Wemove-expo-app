import { RegisterProvider } from "@/helper/loginContext";
import "../../global.css";
import { Stack } from "expo-router";
import 'react-native-reanimated'


export default function Layout() {
  return (
    <RegisterProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </RegisterProvider>
  );
}
