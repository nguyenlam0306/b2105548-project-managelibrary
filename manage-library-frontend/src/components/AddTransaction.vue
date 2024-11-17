<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import userService from '../services/user.service';
import ReaderService from '../services/reader.service';
import BookService from '../services/book.service';
import transactionService from '../services/transaction.service';
import authService from '@/services/auth.service';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const readerService = new ReaderService();
const bookService = new BookService();
const router = useRouter();

const readers = ref([]);
const books = ref([]);

// Các biến lưu thông tin giao dịch
const userId = ref('');
const readerId = ref('');
const bookId = ref('');
const fromDate = ref('');
const toDate = ref('');

// Hàm lấy user đang đăng nhập
const fetchCurrentUser = async () => {
  try {
    const currentUser = await authService.getCurrentUser(); // Lấy userId của người đăng nhập
    userId.value = currentUser._id; // Gán userId tự động
  } catch (error) {
    console.error('Lỗi khi lấy thông tin người dùng hiện tại:', error);
  }
};



// Hàm lấy danh sách độc giả
const fetchReaders = async () => {
  try {
    readers.value = await readerService.getAllReaders();
  } catch (error) {
    console.error('Lỗi khi lấy danh sách độc giả:', error);
  }
};

// Hàm lấy danh sách sách
const fetchBooks = async () => {
  try {
    books.value = await bookService.getAllBooks();
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sách:', error);
  }
};

// Hàm thêm giao dịch mới
const addTransaction = async () => {
  const newTransaction = {
    userId: userId.value,
    readerId: readerId.value,
    bookId: bookId.value,
    fromDate: fromDate.value,
    toDate: toDate.value,
  };

  try {
    await transactionService.addTransaction(newTransaction);
    Swal.fire('Thành công!', 'Giao dịch đã được thêm.', 'success');
    router.push('/transactions');
  } catch (error) {
    console.error('Lỗi khi thêm giao dịch:', error);
    Swal.fire('Lỗi!', 'Không thể thêm giao dịch.', 'error');
  }
};

// Hủy bỏ và quay lại trang danh sách
const cancelTransaction = () => {
  router.push('/transactions');
};

// Gọi các hàm khi trang được tải
onMounted(() => {
  fetchCurrentUser();
  fetchReaders();
  fetchBooks();
});
</script>

<template>
  <div class="add-transaction">
    <h2>Thêm Mới Giao Dịch</h2>
    <form @submit.prevent="addTransaction">
      <!-- Tự động điền userId từ người quản lý đăng nhập -->

      <div class="form-group">
        <label for="readerId">Độc Giả</label>
        <select v-model="readerId" required>
          <option v-for="reader in readers" :key="reader._id" :value="reader._id">
            {{ reader.fullName }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="bookId">Sách</label>
        <select v-model="bookId" required>
          <option v-for="book in books" :key="book._id" :value="book._id">
            {{ book.title }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="fromDate">Ngày Mượn</label>
        <input v-model="fromDate" type="date" required />
      </div>

      <div class="form-group">
        <label for="toDate">Ngày Trả Dự Kiến</label>
        <input v-model="toDate" type="date" required />
      </div>

      <button type="submit" class="btn btn-primary">Thêm Giao Dịch</button>
      <button type="button" class="btn btn-secondary" @click="cancelTransaction">Hủy</button>
    </form>
  </div>
</template>



<style scoped>
.add-transaction {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  margin-top: 20px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #133e87;
  color: white;
}

.btn-secondary {
  background-color: #f3c623;
  color: white;
  margin-left: 10px;
}
</style>
