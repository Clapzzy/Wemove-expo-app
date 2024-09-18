import axios from "axios";
import FormData from "form-data";


export const fetchProfile = async (username) => {
  try {
    const response = await axios.get("http://3.77.19.140:3000/user/", {
      params: {
        username
      }
    });
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error.message)
    console.log('i am getting an error :' + error)
    return Promise.reject(error)
  }
}
