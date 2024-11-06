<template>
  <div>
    <p class="dashboard-option-title">Thêm sách mới</p>
    <form class="addbook-form" @submit.prevent="handleAddBook">
      <!-- Các input và v-select cho các trường dữ liệu -->
      <input class="addbook-submit" type="submit" value="SUBMIT" :disabled="isLoading">
    </form>
    
    <p class="dashboard-option-title">Sách đã thêm gần đây</p>
    <table class="admindashboard-table">
     <thead>
       <tr>
        <th>STT</th>
        <th>Tên sách</th>
        <th>Đã thêm</th>
      </tr>
     </thead>
      <tbody>
        <tr v-for="(book, index) in recentAddedBooks" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ book.title }}</td>
        <td>{{ book.createdAt.substring(0, 10) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { fetchCategories, fetchPublishers, addBook, fetchRecentBooks } from "@/services/book.service";

export default {
  setup() {
    const title = ref("");
    const bookID = ref("");
    const author = ref("");
    const quantity = ref(null);
    const publicationYear = ref("");
    const allPublishers = ref([]);
    const selectedPublishers = ref([]);
    const allCategories = ref([]);
    const selectedCategories = ref([]);
    const recentAddedBooks = ref([]);
    const isLoading = ref(false);

    const handleAddBook = async () => {
      isLoading.value = true;
      const BookData = {
        title: title.value,
        bookID: bookID.value,
        author: author.value,
        quantity: quantity.value,
        publicationYear: publicationYear.value,
        publishers: selectedPublishers.value.map((cat) => cat.value),
        categories: selectedCategories.value.map((cat) => cat.value),
      };
      const addedBook = await addBook(BookData);
      if (addedBook) {
        if (recentAddedBooks.value.length >= 5) {
          recentAddedBooks.value.pop();
        }
        recentAddedBooks.value.unshift(addedBook);
        resetForm();
        alert("Thêm sách mới thành công 🎉");
      }
      isLoading.value = false;
    };

    const resetForm = () => {
      title.value = "";
      bookID.value = "";
      author.value = "";
      quantity.value = null;
      publicationYear.value = "";
      selectedPublishers.value = [];
      selectedCategories.value = [];
    };

    onMounted(async () => {
      allCategories.value = await fetchCategories();
      allPublishers.value = await fetchPublishers();
      recentAddedBooks.value = await fetchRecentBooks();
    });

    return {
      title,
      bookID,
      author,
      quantity,
      publicationYear,
      allPublishers,
      selectedPublishers,
      allCategories,
      selectedCategories,
      recentAddedBooks,
      handleAddBook,
      isLoading,
    };
  },
};
</script>

<style scoped>
@import "../assets/AdminDashboard.css";
</style>
