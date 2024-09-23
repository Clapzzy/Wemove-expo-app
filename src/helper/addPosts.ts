import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import FormData from "form-data";

interface AddPostParams {
  description: string;
  image: any | null;
}

export const addPost = async ({ description, image }: AddPostParams) => {
  try {
    const challengeId = await AsyncStorage.getItem("challengeId")
    const challengeDesc = await AsyncStorage.getItem('challengeDesc')
    const username = await AsyncStorage.getItem('username')
    const formData = new FormData()
    formData.append('username', username)
    formData.append('challengeId', challengeId)
    formData.append("challengeDesc", challengeDesc)
    formData.append('description', description)
    formData.append('image', image)
    const response = await axios.post("http://3.77.19.140:3000/posts/add", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
};
