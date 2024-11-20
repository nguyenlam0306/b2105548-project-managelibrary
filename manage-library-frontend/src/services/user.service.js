import axios from "axios";
import { useAuthStore } from "../stores/auth.store";

const baseURL = "http://localhost:4000/api/users";

class UserService {
  async getUserById(userId) {
    const authStore = useAuthStore();
    return (await axios.get(`${baseURL}/${userId}`)).data;
  }
  async getAllUsers() {
     const authStore = useAuthStore();
     try {
       if (!authStore.isAdmin) {
      throw new Error("Bạn không có quyền xem thành viên.");      
     } 
    return (await axios.get(`${baseURL}/all`)).data;
    
    }
     catch (error) {
      console.error("Lỗi xem ds thành viên", error.message);
      throw error; // Ném lỗi để xử lý ở nơi gọi hàm này
     }
    
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
