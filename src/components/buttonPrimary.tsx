import { Text as DefaultText, Pressable, View } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function PrimaryButtonRegister(props: any) {
  const { text, backgroundColorButton, textColor, style, className, ...otherProps } = props

  const [fontsLoaded] = useFonts({
    Montserrat: require('../../assets/fonts/Montserrat-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />; // Or any loading indicator
  }
  return (
    <View className={className}>
      <View className=' justify-center items-center rounded-full mr-6 h-[55] w-[260]' style={[{ backgroundColor: backgroundColorButton }, style]}>
        <DefaultText style={{ color: textColor, fontSize: 18, fontFamily: "Montserrat" }} >{text}</DefaultText>
      </View>
    </View>
  )
}
/*  const { style, text, buttonColor, OnPress, ...otherProps } = props;
  const [fontsLoaded] = useFonts({
    Montserrat: require('../../assets/fonts/Montserrat-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />; // Or any loading indicator
  }
  return (
    <TouchableOpacity OnPress={OnPress} style={{ backgroundColor: "#D9F99D"}} classname="px-4 w-[260] flex flex-row h-6 bg-lime-600 ">
      <DefaultText style={[{
        fontFamily: 'Montserrat',
      }, style]}
        {...otherProps}

      >
      {text}
      </DefaultText>
    </TouchableOpacity>
  )
*/

