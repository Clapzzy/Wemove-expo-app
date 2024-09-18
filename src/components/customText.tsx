import { Text as DefaultText, } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function CustomText(props) {
  const { className, text, type, style } = props;

  let mytype: string
  if (type == null) {
    mytype = "Regular"
  } else {
    mytype = type;
  }

  const [fontsLoaded] = useFonts({
    Black: require("../../assets/fonts/Montserrat-Black.ttf"),
    ExtraBold: require("../../assets/fonts/Montserrat-ExtraBold.ttf"),
    Bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
    SemiBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
    Medium: require("../../assets/fonts/Montserrat-Medium.ttf"),
    Regular: require("../../assets/fonts/Montserrat-Regular.ttf"),
    Thin: require("../../assets/fonts/Montserrat-Thin.ttf"),
    Light: require("../../assets/fonts/Montserrat-Light.ttf"),
    ExtraLight: require("../../assets/fonts/Montserrat-ExtraLight.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return <DefaultText
    className={className}
    style={[{
      fontFamily: mytype
    }, style]}
    maxFontSizeMultiplier={1.1}
  >{text}</DefaultText>;
}
