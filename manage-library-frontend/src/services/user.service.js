import axios from "axios";
import { useAuthStore } from "../stores/auth.store";

const baseURL = "http://localhost:4000/api/users";

class UserService {
  async getUserById(userId) {
    const authStore = useAuthStore();
    return (await axios.get(`${baseURL}/${userId}`)).data;
  }
  async getAllUsers() {
    return (await axios.get(`${baseURL}/all`)).data;
  }

  async deleteUser(userId) {
    return await axios.delete(`${baseURL}/delete/${userId}`);
  }
  async updateUser(userId, user) {
    console.log(user);
    return (
      await axios.put(`${baseURL}/update/${userId}`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).data;
  }

  
}

export default new UserService();
