import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import FormData from "form-data";


export const fetchProfile = async (username) => {
  try {
    const response = await axios.get("http://3.77.19.140:3000/user/", {
      params: {
        username
      }
    });
    return response.data
  } catch (error) {
    console.log(error.message)
    console.log('i am getting an error :' + error)
    return Promise.reject(error)
  }
}

export const fetchCurrentUserProfile = async () => {
  try {
    const username = await AsyncStorage.getItem("username")
    const response = await axios.get("http://3.77.19.140:3000/user/", {
      params: {
        username
      }
    });
    return response.data
  } catch (error) {
    console.log(error.message)
    console.log('i am getting an error :' + error)
    return Promise.reject(error)
  }
}
