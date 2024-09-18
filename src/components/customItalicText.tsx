import { Text as DefaultText, } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function CustomItalicText(props) {
  const { className, text, type, style } = props;

  let mytype: string
  if (type == null) {
    mytype = "Regular"
  } else {
    mytype = type;
  }

  const [fontsLoaded] = useFonts({
    Black: require("../../assets/fonts-light/Montserrat-BlackItalic.ttf"),
    ExtraBold: require("../../assets/fonts-light/Montserrat-ExtraBoldItalic.ttf"),
    Bold: require("../../assets/fonts-light/Montserrat-BoldItalic.ttf"),
    SemiBold: require("../../assets/fonts-light/Montserrat-SemiBoldItalic.ttf"),
    Medium: require("../../assets/fonts-light/Montserrat-MediumItalic.ttf"),
    Regular: require("../../assets/fonts-light/Montserrat-Italic.ttf"),
    Thin: require("../../assets/fonts-light/Montserrat-ThinItalic.ttf"),
    Light: require("../../assets/fonts-light/Montserrat-LightItalic.ttf"),
    ExtraLight: require("../../assets/fonts-light/Montserrat-ExtraLightItalic.ttf")
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

