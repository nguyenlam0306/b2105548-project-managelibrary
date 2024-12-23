import axios from "axios";

import { useAuthStore } from "../stores/auth.store";

const baseURL = "http://localhost:4000/api/transactions";

class TransactionService {
  async addTransaction(transactionDetail) {
    const authStore = useAuthStore();
    return await axios.post(`${baseURL}/add`, transactionDetail, {
      headers: {
        "Content-Type": "application/json",          
      },
    });
  }
  async getAllTransactions() {
    const authStore = useAuthStore();
    return (await axios.get(`${baseURL}/all`)).data;
  }

  async updateTransactionStatus(transactionId, transactionStatus) {
    const authStore = useAuthStore();
    try {
      if (!authStore.isAdmin) {
        throw new Error("Bạn không có quyền cập nhật.");
      }

      return await axios.put(`${baseURL}/updateStatus`, {
        transactionId: transactionId,
        transactionStatus: transactionStatus,
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật", error.message);
      throw error; // Ném lỗi để xử lý ở nơi gọi hàm này
    }
    
  }
}
export default new TransactionService();