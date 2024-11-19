<script setup>
import { ref, onMounted } from 'vue';
import BookService from '../services/book.service';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const bookService = new BookService;

const books = ref([]);

// Hàm lấy danh sách sách từ service
const fetchBooks = async () => {
  try {
    books.value = await bookService.getAllBooks();
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sách:', error);
    Swal.fire('Lỗi', 'Không thể lấy danh sách sách', 'error');
  }
};

// Gọi hàm fetchBooks khi component được mounted
onMounted(() => {
  fetchBooks();
});
</script>

<template>
  <div class="books-page">
    <div class="books">
      <div class="book-card" v-for="book in books" :key="book._id">
        <img :src="book.imageUrl || 'https://images.pexels.com/photos/1105564/pexels-photo-1105564.jpeg?auto=compress&cs=tinysrgb&w=600'" alt="" />
        <p class="bookcard-title">{{ book.title }}</p>
        <p class="bookcard-author">By {{ book.author }}</p>
        <div class="bookcard-category">
          <p>{{ book.publicationYear }}</p>
        </div>
        <!-- <div class="bookcard-emptybox"></div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.books-page {
  height: 100vh;
  width: 100vw;
  background-color: wheat;
}

.books {
  margin: 60px auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 15px;
  max-width: 1024px;
}

.book-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  background-color: #eee;
}

.book-card img {
  width: 150px;
  height: auto;
  margin-bottom: 15px;
  border-radius: 10px;
}

.book-card img:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

.bookcard-title {
  font-weight: bold;
  font-size: 16px;
  text-align: center;
}

.bookcard-author {
  color: #8d8c8c;
  font-size: 14px;
}

.bookcard-category p {
  padding: 5px 10px;
  background-color: lightgray;
  border-radius: 5px;
  font-weight: bold;
}

.bookcard-emptybox {
  height: 40px;
  width: 100%;
  background-color: black;
  margin-top: 15px;
}
</style>
