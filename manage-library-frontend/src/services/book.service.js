import axios from "axios";
import { useAuthStore } from "../stores/auth.store";

const baseURL = "http://localhost:4000/api/books";
class BookService {
 

  async addBook(book) {
    const authStore = useAuthStore();   
    return (
      await axios.post(`${baseURL}/add`, book, {
        headers: {
          "Content-Type": "multipart/form-data",         
        },
      })
    ).data;
  }

  async getAllBooks() {
    return (await axios.get(`${baseURL}/all`)).data;
  }

  async getBook(bookId) {
    return (await axios.get(baseURL + "/" + bookId)).data;
  }

  async deleteBook(bookId) {
    return await axios.delete(`${baseURL}/delete/${bookId}`);
  }

  async updateBook(bookId, book) {
    // console.log(product);
    return (
      await axios.put(baseURL + "/" + bookId, book, {
        headers: {
          "Content-Type": "multipart/form-data",         
        },
      })
    ).data;
  }
}

export default  BookService