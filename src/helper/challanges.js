import axios from "axios";

const fetchChallenges = async () => {
  try {
    const response = await axios.get(`http://18.184.85.122:3000/challenge/random?timeframe=daily&numberOfChallenges=3`);
    return response.data
  } catch (error) {
    return error
  }
};
const fetchWeeklyChallenges = async () => {
  try {
    const response = await axios.get(`http://18.184.85.122:3000/challenge/random?timeframe=weekly&numberOfChallenges=1`);
    return response.data
  } catch (error) {
    return error
  }
};
module.exports = {
  fetchChallenges: fetchChallenges,
  fetchWeeklyChallenges: fetchWeeklyChallenges
}
