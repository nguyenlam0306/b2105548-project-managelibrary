import axios from "axios";
import { useAuthStore } from "../stores/auth.store";

const baseURL = "http://localhost:4000/api/users";

class UserService {
  async getUserById(userId) {
    const authStore = useAuthStore();    
    return (
      await axios.get(`${baseURL}/${userId}`)
    ).data;
  }
}

export default new UserService();
