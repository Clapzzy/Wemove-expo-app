import { Text as DefaultText, } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function CustomText(props: DefaultText['props']) {
  const { style, ...otherProps } = props;
  const [fontsLoaded] = useFonts({
    Montserrat: require('../../assets/fonts/Montserrat-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />; // Or any loading indicator
  }
  return <DefaultText style={[{
    fontFamily: 'Montserrat',
  }, style]}
    maxFontSizeMultiplier={1.1}
    {...otherProps}

  />;
}
