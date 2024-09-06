
import { useCallback, useContext, useRef, useState } from 'react';
import { TouchableOpacity, ImageBackground, Pressable, TextInput, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import MainContext from '@/helper/mainScreensContext';
import { Ionicons } from '@expo/vector-icons/';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function postPreview() {
  const contextData = useContext(MainContext)
  const [image, setImage] = useState(null)
  const textField = useRef(null)
  const [description, setDescription] = useState('')

  return (
    <View className="items-center bg-[#262626] flex-1 color-white">
      <ImageBackground className="w-full h-full" source={require('assets/waves2.png')}>
        <SafeAreaView >
        </SafeAreaView>
      </ImageBackground>
    </View >
  );
}
