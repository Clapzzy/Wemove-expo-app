import axios from "axios";

export const makeProfile = async ({ userData }) => {
  try {
    const response = await axios.post("http://3.77.19.140:3000/user/signup", {
      username: userData.username,
      displayName: userData.displayUsername,
      email: userData.email,
      birthday: new Date(),
      password: userData.password
    });
    return response.data
  } catch (error) {
    console.log('i am getting an error :' + error)
    return Promise.reject(error)
  }
};
