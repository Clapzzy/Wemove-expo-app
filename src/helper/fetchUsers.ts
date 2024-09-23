import axios from "axios";
import FormData from "form-data";

interface searchParams {
  searchKeyword: string | null
  lastId: string | null
}

export const fetchUsers = async ({ searchKeyword, lastId }: searchParams) => {
  try {
    const response = await axios.get("http://3.77.19.140:3000/user/search", {
      params: {
        searchKeyword,
        lastId
      }
    });
    return response.data
  } catch (error) {
    console.log('i am getting an error :' + error)
    return Promise.reject(error)
  }
};
