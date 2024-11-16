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
    const response = await axios.post(`${API_URL}/add`, reader);
    return response.data;
  }

}