import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const fetchChallenges = async () => {
  try {
    const username = await AsyncStorage.getItem('username')
    const response = await axios.get(`http://3.77.19.140:3000/challenges/`, {
      params: {
        username: username
      }
    });
    return response.data
  } catch (error) {
    return Promise.reject(error)
    throw new Error(error)
  }
};
export const fetchWeeklyChallenges = async () => {
  try {
    const response = await axios.get(`http://3.77.19.140:3000/challenges/random?timeframe=weekly&numberOfChallenges=1`);
    return response.data
  } catch (error) {
    throw error
  }
};
export const fetchPosts = async () => {
  try {
    const response = await axios.get("http://3.77.19.140:3000/post/getPosts")
    return response.data
  } catch (error) {
    return error
  }
}
