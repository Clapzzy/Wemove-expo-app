import { Text as DefaultText, Pressable, View } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function PrimaryButtonRegister(props: any) {
  const { text, backgroundColorButton, textColor, style, ...otherProps } = props
  return (
    <Pressable className=' h-[55]' style={[{ backgroundColor: backgroundColorButton }, style]} >
      <DefaultText style={{ color: textColor }} >{text}</DefaultText>
    </Pressable>
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

