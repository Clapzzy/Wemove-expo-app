import { Text as DefaultText, Pressable, View } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useState } from 'react';

export default function PrimaryButtonRegister(props: any) {
  const { text, backgroundColorButton, textColor, style, className, ...otherProps } = props
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => setPressed(true);
  const handlePressOut = () => setPressed(false);
  const [fontsLoaded] = useFonts({
    Montserrat: require('../../assets/fonts/Montserrat-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />; // Or any loading indicator
  }
  function Press() {
    console.log("Pressed");
    console.log(pressed);


  }
  return (
    <Pressable onPress={Press} onPressIn={handlePressIn} onPressOut={handlePressOut} style={({ pressed }) => [{ transform: [{ scale: pressed ? 1.2 : 1 }] }]} className={className}>
      <View className=' justify-center items-center rounded-full mr-6 h-[55] w-[260]' style={[{ backgroundColor: backgroundColorButton }, style]}>
        <DefaultText style={{ color: textColor, fontSize: 18, fontFamily: "Montserrat" }} >{text}</DefaultText>
      </View>
    </Pressable>
  )
}
