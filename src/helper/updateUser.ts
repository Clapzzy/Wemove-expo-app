import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import FormData from "form-data";


export const updateUser = async ({ pfpBase64, bgPicBase64, displayUsername }) => {
  try {
    const username = await AsyncStorage.getItem('username')


    const response = await axios.post("http://3.77.19.140:3000/user/updateProfile", {
      username: username,
      pfpImage: pfpBase64,
      backgroundImage: bgPicBase64,
      displayName: displayUsername,
    });
    console.log(response.data)
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
};
