import axios from "axios";
import { useAuthStore } from "../stores/auth.store";

const baseURL = "http://localhost:4000/api/books";

class BookService {
  async addBook(book) {
     const authStore = useAuthStore();
    try {
      if (!authStore.isAdmin) {
   throw new Error("Bạn không có quyền thêm sách.");
 }
        return (
          await axios.post(`${baseURL}/add`, book, {
            headers: {
              "Content-Type": "application/json",
            },
          })
        ).data;
    } catch (error) {
      // Xử lý lỗi
      console.error("Lỗi khi thêm sách:", error.message);
      throw error; // Ném lỗi để xử lý ở nơi gọi hàm này
    }
  
  }

  async getAllBooks() {
    return (await axios.get(`${baseURL}/all`)).data;
  }

  async getBook(bookId) {
    return (await axios.get(baseURL + "/" + bookId)).data;
  }

  async deleteBook(bookId) {
    const authStore = useAuthStore();

    try {
      // Kiểm tra quyền admin
      // console.log(authStore.isAdmin);
      if (!authStore.isAdmin) {
        throw new Error("Bạn không có quyền xóa sách.");
      }

      // Gửi yêu cầu xóa sách
      const response = await axios.delete(`${baseURL}/delete/${bookId}`);
      return response.data; // Trả về dữ liệu phản hồi nếu cần
    } catch (error) {
      // Xử lý lỗi
      console.error("Lỗi khi xóa sách:", error.message);
      throw error; // Ném lỗi để xử lý ở nơi gọi hàm này
    }
  }

  async updateBook(bookId, book) {
    // console.log(book);
    return (
      await axios.put(`${baseURL}/update/${bookId}`, book, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).data;
  }
  async getBookById(id) {
    const response = await axios.get(`${baseURL}/${id}`);
    return response.data;
  }
}

 

export default BookService