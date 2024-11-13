import axios from "axios";
import { useAuthStore } from "../stores/auth.store";

const baseURL = "http://localhost:4000/api/publishers";

class PublisherService {
  async getAllPublishers() {
    return (await axios.get(`${baseURL}/all`)).data;
  }

  async addPublisher(publisher) {
    const authStore = useAuthStore();
    return (
      await axios.post(`${baseURL}/add`, publisher, {
        headers: {
          "Content-Type": "application/json"          
        },
      })
    ).data;
  }

  async getPublisher(id) {
    return (await axios.get(`${baseURL}/${id}`)).data;
  }
}
export default  PublisherService