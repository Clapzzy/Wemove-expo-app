import { Text as DefaultText, Pressable, View } from 'react-native';
import { useState } from 'react';
import CustomText from './customText';

export default function FixedButton(props: any) {
  const { text, backgroundColorButton, textColor, style, className, onPress, ...otherProps } = props
  const [pressed, setPressed] = useState(false);

  const handlePress = () => setPressed(!pressed);
  return (
    <Pressable
      onPress={onPress} onPressIn={handlePress} onPressOut={handlePress}
      style={pressed ? { transform: [{ scale: 1 }] } : { transform: [{ scale: 0.94 }] }}
      className={className}
    >
      <View className=' justify-center items-center rounded-md w-40 px-3 py-2' style={[{ backgroundColor: backgroundColorButton }, style]}>
        <CustomText style={{ color: textColor }} className="tracking-tight text-22" type="SemiBold" text={text} ></CustomText>
      </View>
    </Pressable>
  )
}
