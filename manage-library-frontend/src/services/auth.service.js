import createApiClient from "./api.service";
import { useAuthStore } from "../stores/auth.store";
import axios from "axios";

const authURL  = "http://localhost:4000/api/auth";
class AuthService {
  async login(user) {
    const response = await axios.post(`${authURL}/signin`, user);
    // Lưu token và isAdmin vào localStorage

    // localStorage.setItem("isAdmin", response.data.isAdmin);
    console.log(response.data.isAdmin)
  
    return response.data;
  }
  async register(user) {
    const authStore = useAuthStore();
    try {
      if (!authStore.isAdmin) {
        throw new Error("Bạn không có quyền thêm thành viên.");
      }
    return (await axios.post(`${authURL}/register`, user)).data;
    }
    catch (error) {
  console.log(error);
    }
    
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  logout() {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("user");
  }
}

export default new AuthService();