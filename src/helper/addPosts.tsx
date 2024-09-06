import axios from "axios";
import FormData from "form-data";

interface AddPostParams {
  description: string;
  image: any | null;
  userId: string;
}

export const addPost = async ({ description, image, userId }: AddPostParams) => {
  try {
    const formData = new FormData()
    formData.append('description', description)
    formData.append('image', image)
    formData.append('userId', userId)
    const response = await axios.post("http://3.77.19.140:3000/posts/add", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
};
