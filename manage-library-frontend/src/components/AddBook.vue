<template>
  <div>
    <p class="dashboard-option-title">Thêm sách mới</p>
    <div class="dashboard-title-line"></div>
    <form class="addbook-form" @submit.prevent="addBook">
      <label class="addbook-form-label" for="title">Tên sách<span class="required-field">*</span></label><br />
      <input class="addbook-form-input" type="text" v-model="title" required><br />

      <label class="addbook-form-label" for="bookID">Mã sách</label><br />
      <input class="addbook-form-input" type="text" v-model="bookID"><br />

      <label class="addbook-form-label" for="author">Tên tác giả<span class="required-field">*</span></label><br />
      <input class="addbook-form-input" type="text" v-model="author" required><br />

      <label class="addbook-form-label" for="publicationYear">Năm xuất bản</label><br />
      <input class="addbook-form-input" type="text" v-model="publicationYear"><br />

      <label class="addbook-form-label" for="publisher">Nhà xuất bản</label><br />
      <v-select
        :options="allPublisher"
        v-model="selectedPublisher"
        placeholder="Thể loại"
        multiple
      ></v-select>

      <label class="addbook-form-label" for="copies">Số quyển<span class="required-field">*</span></label><br />
      <input class="addbook-form-input" type="text" v-model="quantity" required><br />

      <label class="addbook-form-label" for="categories">Thể loại<span class="required-field">*</span></label><br />
      <v-select
        :options="allCategories"
        v-model="selectedCategories"
        placeholder="Thể loại"
        multiple
      ></v-select>

      <input class="addbook-submit" type="submit" value="SUBMIT" :disabled="isLoading">
    </form>

    <p class="dashboard-option-title">Sách đã thêm gần đây</p>
    <div class="dashboard-title-line"></div>
    <table class="admindashboard-table">
      <tr>
        <th>STT</th>
        <th>Tên sách</th>
        <th>Đã thêm</th>
      </tr>
      <tr v-for="(book, index) in recentAddedBooks" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ book.title }}</td>
        <td>{{ book.createdAt.substring(0, 10) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import moment from "moment";
import VSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  components: { VSelect },
  setup() {
    const API_URL = import.meta.env.VITE_API_URL;
    const isLoading = ref(false);
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

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}api/categories/all`);
        allCategories.value = response.data.map((category) => ({
          value: category._id,
          label: category.categoryName,
        }));
      } catch (err) {
        console.log(err);
      }
    };
    const fetchPublishers = async () => {
      try {
        const response = await axios.get(`${API_URL}api/publishers/all`);
        allPublishers.value = response.data.map((publisher) => ({
          value: publisher._id,
          label: publisher.publisherName,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    const addBook = async () => {
      isLoading.value = true;
      const BookData = {
        title: title.value,
        bookID: bookID.value,
        author: author.value,
        quantity: quantity.value,
        publicationYear: publicationYear.value,
        publishers: selectedPublishers.value.map(cat => cat.value),
        categories: selectedCategories.value.map(cat => cat.value),
      };
      try {
        const response = await axios.post(`${API_URL}api/books/add`, BookData);
        if (recentAddedBooks.value.length >= 5) {
          recentAddedBooks.value.pop();
        }
        recentAddedBooks.value.unshift(response.data);
        resetForm();
        alert("Thêm sách mới thành công 🎉");
      } catch (err) {
        console.log(err);
      }
      isLoading.value = false;
    };

    const fetchRecentBooks = async () => {
      try {
        const response = await axios.get(`${API_URL}api/books/all`);
        recentAddedBooks.value = response.data.slice(0, 5);
      } catch (err) {
        console.log(err);
      }
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

    onMounted(() => {
      fetchCategories();
      fetchRecentBooks();
    });

    return {
      title,
      bookID,
      author,
      quantity,
      publicationYear,
      publisher,
      allPublishers,
      selectedPublishers,
      allCategories,
      selectedCategories,
      recentAddedBooks,
      addBook,
      isLoading,
    };
  },
};
</script>

<style scoped>
@import "../views/Dashboard/AdminDashboard.css";
</style>
