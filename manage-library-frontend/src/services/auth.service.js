import createApiClient from "./api.service";
import { useAuthStore } from "../stores/auth.store";
import axios from "axios";

const authURL  = "http://localhost:4000/api/auth";
class AuthService {
  async login(user) {
    const response = await axios.post(`${authURL}/signin`, user);

    // Lưu token và isAdmin vào localStorage

    localStorage.setItem("isAdmin", response.data.isAdmin);
    localStorage.setItem("user", response.data.userFullName)
    return response.data;
  }
  async register(user) {
    return (await axios.post(`${authURL}/register`, user)).data;
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