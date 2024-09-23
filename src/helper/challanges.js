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
export const fetchPosts = async ({ lastId }) => {
  try {
    const response = await axios.get("http://3.77.19.140:3000/posts/", {
      params: {
        lastId
      }
    })
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const fetchUserSpecificPosts = async ({ lastId, username }) => {
  try {
    const response = await axios.get("http://3.77.19.140:3000/posts/user", {
      params: {
        username,
        lastId
      }
    })
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}
