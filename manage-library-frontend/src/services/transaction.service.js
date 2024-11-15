import axios from "axios";

import { useAuthStore } from "../stores/auth.store";

const baseURL = "http://localhost:4000/api/transactions";

class TransactionService {
  async addTransaction(transactionDetail) {
    const authStore = useAuthStore();
    return await axios.post(baseURL, transactionDetail, {
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
    return await axios.put(`${baseURL}/updateStatus`, {
      transactionId: transactionId,
      transactionStatus: transactionStatus,
    });
  }
}
export default new TransactionService();