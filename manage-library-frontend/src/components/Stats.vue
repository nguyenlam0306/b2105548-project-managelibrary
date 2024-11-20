<script setup>
import { ref, onMounted, onBeforeUnmount, computed} from 'vue';
import BookService from '../services/book.service';
import TransactionService from '@/services/transaction.service';
import { useSocketStore } from '@/stores/socket.store';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const socketStore = useSocketStore();
const bookService = new BookService;
// const transactionService = new TransactionService;

onBeforeUnmount(() => {
  socketStore.disconnect();
});

const onlineUsers = computed(() => socketStore.onlineUsers);
const books = ref([]);
const transactions = ref([]);

// Hàm lấy danh sách sách từ service
const fetchBooks = async () => {
  try {
    books.value = await bookService.getAllBooks();
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sách:', error);
    Swal.fire('Lỗi', 'Không thể lấy danh sách sách', 'error');
  }
};

const fetchTransactions = async () => {
  try {
    transactions.value = await TransactionService.getAllTransactions();
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sách:', error);
    Swal.fire('Lỗi', 'Không thể lấy danh sách sách', 'error');
  }
};

// Gọi hàm fetchBooks khi component được mounted
onMounted(() => {
  fetchBooks();
  fetchTransactions();
});
</script>

<template>
  <div class="stats">
    <div class="stats-block">
    <span class="stats-icon">
   <i class="fa-solid fa-book-open"></i>
    </span>
     
      <p class="stats-title">Tổng số sách</p>
      <p class="stats-count">{{ books.length }}</p>
    </div>
    <div class="stats-block">
    <span class="stats-icon">
      <i class="fa-brands fa-algolia"></i>
    </span>
      <p class="stats-title">Đang truy cập</p>
      <p class="stats-count">{{ onlineUsers + 1}}</p>
    </div>
    <div class="stats-block">
   <span class="stats-icon">
      <i class="fa-solid fa-calendar-days"></i>
    </span>   
      <p class="stats-title">Đã đặt hàng</p>
      <p class="stats-count">{{ transactions.length }}</p>
    </div>
  </div>
</template>



<style scoped>
.stats {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #CBDCEB;
    flex-wrap: wrap;
    padding: 20px;
}

.stats-block {
    height: 180px;
    width: 160px;
    border-radius: 12px;
    margin: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stats-block:hover {
    transform: translateY(-8px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
}

.stats-icon {
    color: #133E87;
    font-size: 40px;
    margin-bottom: 10px;
}

.stats-title {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    margin: 5px 0;
}

.stats-count {
    font-size: 24px;
    color: #608BC1;
    font-weight: bold;
}
</style>
