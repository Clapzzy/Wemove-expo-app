import { Text as DefaultText, Pressable, View } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useState } from 'react';

export default function PrimaryButtonRegister(props: any) {
  const { text, backgroundColorButton, textColor, style, className, onPress, ...otherProps } = props
  const [pressed, setPressed] = useState(false);

  const handlePress = () => setPressed(!pressed);
  const [fontsLoaded] = useFonts({
    Montserrat: require('../../assets/fonts/Montserrat-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />; // Or any loading indicator
  }
  return (
    <Pressable
      onPress={onPress} onPressIn={handlePress} onPressOut={handlePress}
      style={pressed ? { transform: [{ scale: 0.94 }] } : { transform: [{ scale: 1 }] }}
      className={className}
    >
      <View className=' justify-center items-center rounded-full mr-6 h-[55] w-[260]' style={[{ backgroundColor: backgroundColorButton }, style]}>
        <DefaultText style={{ color: textColor, fontSize: 18, fontFamily: "Montserrat" }} >{text}</DefaultText>
      </View>
    </Pressable>
  )
}
