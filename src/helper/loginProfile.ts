import axios from "axios";

export const logInProfile = async ({ userData }) => {
  try {
    const response = await axios.post("http://3.77.19.140:3000/user/login", {
      email: userData.email,
      password: userData.password
    });
    console.log(response.data)
    console.log(response.data.message)
    if (response.data.message == "loggedin") {
      return response.data
    } else {
      return Promise.reject("wrong credentials")
    }
  } catch (error) {
    console.log('i am getting an error :' + error)
    return Promise.reject(error)
  }
};
