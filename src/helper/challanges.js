import axios from "axios";

export const fetchChallenges = async () => {
  try {
    const response = await axios.get(`http://3.77.19.140:3000/challenge/random?timeframe=daily&numberOfChallenges=2`);
    return response.data
  } catch (error) {
    return error
  }
};
export const fetchWeeklyChallenges = async () => {
  try {
    const response = await axios.get(`http://3.77.19.140:3000/challenge/random?timeframe=weekly&numberOfChallenges=1`);
    return response.data
  } catch (error) {
    return error
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
