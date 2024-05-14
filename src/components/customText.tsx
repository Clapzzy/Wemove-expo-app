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
    BlackItalic: require("../../assets/fonts-light/Montserrat-BlackItalic.ttf"),
    ExtraBoldItalic: require("../../assets/fonts-light/Montserrat-ExtraBoldItalic.ttf"),
    BoldItalic: require("../../assets/fonts-light/Montserrat-BoldItalic.ttf"),
    SemiBoldItalic: require("../../assets/fonts-light/Montserrat-SemiBoldItalic.ttf"),
    MediumItalic: require("../../assets/fonts-light/Montserrat-MediumItalic.ttf"),
    RegularItalic: require("../../assets/fonts-light/Montserrat-Italic.ttf"),
    ThinItalic: require("../../assets/fonts-light/Montserrat-ThinItalic.ttf"),
    LightItalic: require("../../assets/fonts-light/Montserrat-LightItalic.ttf"),
    ExtraLightItalic: require("../../assets/fonts-light/Montserrat-ExtraLightItalic.ttf")
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
