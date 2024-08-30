import axios from "axios";
import FormData from "form-data";

export const addPost = async ({ params }) => {
  try {
    const formData = new FormData()
    formData.append('description', params?.description)
    formData.append('image', params?.image)
    formData.append('userId', params?.userId)
    const response = await axios.post("http://3.77.19.140:3000/posts/add", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return response.data
  } catch (error) {
    return Promise.reject(error)
    throw new Error(error)
  }
};
