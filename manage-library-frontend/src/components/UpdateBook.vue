<script setup>
import Swal from 'sweetalert2';
import { ref, reactive, watch } from "vue";
import { useRoute } from 'vue-router';
import BookService from "../services/book.service";
import CategoryService from "@/services/category.service";
import PublisherService from '@/services/publisher.service';
import router from '@/router';


const bookService = new BookService();
const categoryService = new CategoryService();
const publisherService = new PublisherService();

const route = useRoute()
const bookId = route.params.id
console.log(bookId)

const categoriesList = ref([]);
const publishersList = ref([]);
const state = ref(null);
const isLoading = ref(false);
const error = ref("");

const result = await bookService.getBook(bookId)
// Fetch danh mục và nhà xuất bản
async function fetchData() {
    try {
        const [categories, publishers] = await Promise.all([
            categoryService.getAllCategories(),
            publisherService.getAllPublishers(),
        ]);
        categoriesList.value = categories;
        publishersList.value = publishers;
    } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
    }
}
fetchData();

// Định nghĩa reactive cho form sách
const book = reactive({
   ...result
});

// Xử lý thêm sách
async function onSubmit() {
    console.log("Dữ liệu trước khi gửi:", book);
    isLoading.value = true;

    try {
        const result = await bookService.updateBook( bookId, book);
        if (result) {               


            Swal.fire({
                icon: 'success',
                title: 'Hiệu chỉnh thành công!',
                text: 'Hãy xem lại danh sách!',
                timer: 2000,
                showConfirmButton: false,
            });
           router.push('/books/all');
        }
    } catch (err) {
        console.error("Lỗi khi hiệu chỉnh:", err);
        Swal.fire({
            icon: 'error',
            title: 'Hiệu chỉnh thất bại',
            text: 'Vui lòng kiểm tra lại thông tin!',
        });
    } finally {
        isLoading.value = false;
    }
}

watch(state, (newState) => {
    if (newState !== null) {
        setTimeout(() => {
            state.value = null;
        }, 3000);
    }
});
</script>

<template>
    <div class="container mt-5">
        <div class="card p-4 shadow-lg">
            <h3 class="text-center mb-4">Hiệu chỉnh sách</h3>
            <form @submit.prevent="onSubmit" enctype="multipart/form-data">
                <!-- Tên sách -->
                <div class="mb-3">
                    <label for="title" class="form-label">Tên sách</label>
                    <input type="text" class="form-control" id="title" v-model="book.title" required>
                </div>

                <!-- Mã sách & Giá -->
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="bookID" class="form-label">Mã sách</label>
                        <input type="text" class="form-control" id="bookID" v-model="book.bookID" required>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="price" class="form-label">Giá</label>
                        <input type="number" class="form-control" id="price" v-model="book.price" required>
                    </div>
                </div>

                <!-- Tác giả & Thể loại -->
                <div class="mb-3">
                    <label for="author" class="form-label">Tên tác giả</label>
                    <input type="text" class="form-control" id="author" v-model="book.author" required>
                </div>
                <div class="mb-3">
                    <label for="categories" class="form-label">Thể loại</label>
                    <select v-model="book.categories" class="form-select">
                        <option v-for="category in categoriesList" :key="category._id" :value="category._id">
                            {{ category.categoryName }}
                        </option>
                    </select>
                </div>

                <!-- Nhà xuất bản & Năm xuất bản -->
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="publisher" class="form-label">Nhà xuất bản</label>
                        <select v-model="book.publisher" class="form-select">
                            <option v-for="publisher in publishersList" :key="publisher._id" :value="publisher._id">
                                {{ publisher.publisherName }}
                            </option>
                        </select>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="publicationYear" class="form-label">Năm xuất bản</label>
                        <input type="number" class="form-control" id="publicationYear" v-model="book.publicationYear" required>
                    </div>
                </div>

                <!-- Số lượng -->
                <div class="mb-3">
                    <label for="quantity" class="form-label">Số lượng</label>
                    <input type="number" class="form-control" id="quantity" v-model="book.quantity" required>
                </div>

                <!-- Nút gửi và loading spinner -->
                <button type="submit" class="btn btn-primary w-100" :disabled="isLoading">
                    <span v-if="!isLoading">Chỉnh sửa</span>
                    <span v-else>
                        <div class="spinner-border spinner-border-sm" role="status"></div> Đang xử lý...
                    </span>
                </button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.btn.btn-primary {
    background-color: #153b77;
    border-color: #153b77;
}

.card {
    border-radius: 15px;
    border: none;
}

.spinner-border {
    color: #ffffff;
}
</style>
