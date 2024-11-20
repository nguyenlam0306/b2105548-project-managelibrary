<script setup>
import { ref, onMounted, computed } from 'vue';
import AuthService from '@/services/auth.service';
import { useRouter } from 'vue-router';
import BookService from '../services/book.service';
import Swal from 'sweetalert2';



const router = useRouter();
const menutoggle = ref(false);
const user = ref(null);

function Toggle() {
  menutoggle.value = !menutoggle.value;
}

function closeMenu() {
  menutoggle.value = false;
}

function getUser() {
  user.value = AuthService.getCurrentUser();
}

const bookService = new BookService
const books = ref([]);
const searchQuery = ref('');
const filteredBooks = computed(() =>
  books.value.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

// Lấy danh sách sách từ backend khi component được tải
const fetchBooks = async () => {
  try {
    books.value = await bookService.getAllBooks();
  } catch (error) {
    console.error('Lỗi khi lấy sách:', error);
  }
}


onMounted(() => {
  getUser();
  fetchBooks();
});
</script>

<template>
  <div class="header">
    <div class="logo-nav">
      <router-link to="/">
        <a href="#home">LacosLibrary</a>
      </router-link>
    </div>

    <div class="nav-right">
      <!-- Thanh tìm kiếm -->
      <div class="search-books">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Tìm kiếm sách..."
          class="search-input"
        />
        <div v-if="filteredBooks.length > 0 && searchQuery" class="book-results">
          <div v-for="book in filteredBooks" :key="book._id" class="book-card">
            <!-- <img src="https://images.pexels.com/photos/1148399/pexels-photo-1148399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Book cover" class="book-image" /> -->
            <div class="book-info">
              <h3>{{ book.title }}</h3>
              <p>Tác giả: {{ book.author }}</p>
              <p>Năm xuất bản: {{ book.publicationYear }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Menu điều hướng -->
      <ul :class="{ 'nav-options': true, 'active': menutoggle }">
        <li class="option" @click="closeMenu">
          <router-link to="/">Home</router-link>
        </li>
        <li class="option" @click="closeMenu">
          <router-link to="/showlibrary">Sách</router-link>
        </li>
        <li class="option" @click="closeMenu">
          <router-link to="/about">About</router-link>
        </li>
        <li v-if="user" class="option" @click="closeMenu">
          <router-link to="/dashboard@admin"><i class="fa-solid fa-house"></i></router-link>
        </li>
        <li v-else class="option" @click="closeMenu">
          <router-link to="/signin"><i class="fa-solid fa-user"></i></router-link>
        </li>
      </ul>
    </div>

    <div class="mobile-menu" @click="Toggle">
      <span class="menu-icon"><i class="fa-solid fa-bars"></i></span>
    </div>
  </div>
</template>




<style scoped>
/*Desktop View*/
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 40px;
    height: 60px;
    width: 100%;
    position: fixed;
    z-index: 100;
    background-color: #133E87; /* Màu nền của header */
    box-shadow: 0 1px 4px rgba(146,161,176,.15);
    top: 0%;
}

.logo-nav a {
    font-size: 20px;
    color: #F3F3E0; /* Màu chữ của logo */
    font-weight: 800;
}

.logo-nav a:hover {
    color: #CBDCEB; /* Màu chữ khi hover */
    transition: all ease 0.5s;
}

.search-input {
    width: 100%;
    margin-left: 0px;
    max-width: 1800px;
    height: 40px;
    outline: none;
    padding: 10px 10px;
    font-size: 18px;
    border-radius: 10px;
    border: 1px solid #CBDCEB; /* Viền của ô tìm kiếm */
    background-color: #F3F3E0; /* Nền của ô tìm kiếm */
    color: #133E87; /* Màu chữ trong ô tìm kiếm */
}

.nav-options {
    padding-left: 40px;
    display: flex;
    list-style-type: none;
    margin-bottom: 15px !important;
}

.nav-right {
    display: flex;
    align-items: center;
    justify-content: center;
}

.option {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 30px;
    margin-top: 15px;
    color: #133E87;
}

.option a {
    color: #608BC1; /* Màu chữ của các liên kết trong nav */
    display: flex;
    align-items: center;
    font-weight: 800;
    font-size: 18px;
}

.option a:hover {
    color: #CBDCEB; /* Màu chữ khi hover */
    transition: all ease 0.5s;
}

a {
    text-decoration: none !important;
}

.option:hover {
    color: #608BC1;
}

.mobile-menu {
    display: block;
}

/* Tìm kiếm sách  */

.search-books {
  position: relative;
  max-width: 300px;
  margin-right: 20px;
}

.search-input {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #CBDCEB;
  background-color: #F3F3E0;
  color: #133E87;
  font-size: 16px;
}

.book-results {
  position: absolute;
  top: 40px;
  left: 0;
  /* right: 2; */
  width: 100%;
  background-color: #F9F9F9;
  border: 1px solid #CBDCEB;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
}

.book-card {
  display: flex;
  align-items: center;
  margin: auto;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.book-card:last-child {
  border-bottom: none;
}

.book-image {
  width: 40px;
  height: 60px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 5px;
}

.book-info h3 {
  font-size: 16px;
  margin: 0;
  color: #133E87;
}

.no-results {
  text-align: center;
  color: #888;
  font-size: 14px;
  padding: 10px;
}


@media (min-width: 768px) {
    .mobile-menu {
        display: none !important;
    }
    .header {
        display: grid;
        grid-template-columns: 10% 60%;
    }
}

@media (max-width: 768px) {
    .header {
        padding: 0px 10px;
    }
    .nav-options {
        display: flex;
        width: 100%;
        height: 280px;
        position: absolute;
        top: 60px;
        left: -100%;
        opacity: 0;
        transition: all 0.5s ease;
        flex-direction: column;
        list-style-type: none;
        grid-gap: 0px;
    }
    .nav-options.active {
        background: #133E87; /* Màu nền của menu khi mở trên mobile */
        left: 0;
        opacity: 1;
        transition: all 0.5s ease;
        z-index: 100;
        align-content: center;
        padding-left: 0px;
    }
  
    .menu-icon {
        width: 45px;
        height: 45px;
        color: #F3F3E0; /* Màu của biểu tượng menu */
        padding: 2px;
        background-color: #CBDCEB; /* Nền của biểu tượng menu */
        border-radius: 5px;
        cursor: pointer;
        margin: 0px 5px 0px 10px;
    }
    .option {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 10vw;
        padding: 30px 0px;
    }
}

</style>
