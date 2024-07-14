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

