import { Text as DefaultText, Pressable, View } from 'react-native';
import { useState } from 'react';
import CustomText from './customText';

export default function PrimaryButtonRegister(props: any) {
  const { text, backgroundColorButton, textColor, style, className, onPress, ...otherProps } = props
  const [pressed, setPressed] = useState(false);

  const handlePress = () => setPressed(!pressed);
  return (
    <Pressable
      onPress={onPress} onPressIn={handlePress} onPressOut={handlePress}
      style={pressed ? { transform: [{ scale: 0.94 }] } : { transform: [{ scale: 1 }] }}
      className={className}
    >
      <View className=' justify-center items-center rounded-full mr-6 h-[55] w-[260]' style={[{ backgroundColor: backgroundColorButton }, style]}>
        <CustomText style={{ color: textColor, fontSize: 20 }} type="Bold" text={text} ></CustomText>
      </View>
    </Pressable>
  )
}
