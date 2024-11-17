import axios from "axios";
import { useAuthStore } from "../stores/auth.store";
const baseURL = "http://localhost:4000/api/readers";

class ReaderService {
  async getAllReaders() {
    const authStore = useAuthStore();
    return (await axios.get(`${baseURL}/all`)).data;
  }
  async getReaderById(id) {
    const response = await axios.get(`${baseURL}/${id}`);
    return response.data;
  }

  async addReader(reader) {
    const authStore = useAuthStore();
    return (
      await axios.post(`${baseURL}/add`, reader, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).data;
  }

  async updateReader(readerId, reader) {
    console.log(reader);
    return (
      await axios.put(`${baseURL}/update/${readerId}`, reader, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).data;
  }

  async deleteUser(readerId) {
    return await axios.delete(`${baseURL}/delete/${readerId}`);
  }
}
export default ReaderService