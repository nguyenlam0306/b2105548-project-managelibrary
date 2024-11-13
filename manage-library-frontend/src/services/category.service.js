import axios from "axios";
import { useAuthStore } from "../stores/auth.store";

const baseURL = "http://localhost:4000/api/categories";

class CategoryService {
  async getAllCategories() {
    return (await axios.get(`${baseURL}/all`)).data;
  }

  async addCategory(category) {
    const authStore = useAuthStore();
    return (
      await axios.post(`${baseURL}/add`, category, {
        headers: {
          "Content-Type": "application/json",         
        },
      })
    ).data;
  }

  async getCategoryById(id) {
    return (await axios.get(`${baseURL}/${id}`)).data;
  }
}
export default CategoryService
