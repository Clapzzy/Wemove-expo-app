import { Text as DefaultText, } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function BoldCustomText(props) {
  const { className, text, type } = props;
  const [fontsLoaded] = useFonts({
    Montserrat: require("../../assets/fonts/Montserrat-Thin.ttf"),
  });
  console.log(className);

  if (!fontsLoaded) {
    return <AppLoading />; // Or any loading indicator
  }
  return <DefaultText
    className={className}
    style={[{
      fontFamily: 'Montserrat',
    }]}
    maxFontSizeMultiplier={1.1}
  >{text}</DefaultText>;
}
