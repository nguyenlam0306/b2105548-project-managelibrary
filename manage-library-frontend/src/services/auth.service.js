import createApiClient from "./api.service";
import { useAuthStore } from "../stores/auth.store";
import axios from "axios";

const authURL  = "http://localhost:4000/api/auth";
class AuthService {
  async login(user) {
    return (await axios.post(`${authURL}/signin`, user)).data;
  }
  async register(user) {
    return (await axios.post(`${authURL}/register`, user)).data;
  }

}

export default new AuthService();