<script setup>
import Swal from 'sweetalert2';
import { ref, reactive, computed, watch } from "vue"
import BookService from "../services/book.service"

const bookService = new BookService()

const state = ref(null)

watch(state, (newState) => {
    setTimeout(() => {
        state.value = null
    }, 5000)
})
const isLoading = ref(false)
const error = ref("");

const book = reactive({
     title: null,
     bookID: null,
     price: null,
     author: null,
     quantity: null,    
     publisher: null,
     publicationYear: null,
     categories: null,
})
async function onSubmit() {
    isLoading.value = true
    try {
        const result = await bookService.addBook(book)
        console.log(result);
        if (result) {
            book.title = null
            book.bookID = null,
            book.price = null,
            book.quantity = null,
            book.categories = null,
            book.publicationYear = null,
            book.publisher = null ,      
            state.value = true
        }
 // Nếu thêm thành công
    Swal.fire({
      icon: 'success',
      title: 'Thêm sách thành công!',
      text: 'Hãy xem lại danh sách!',
      timer: 2000,
      showConfirmButton: false,
    });
    error.value= ""
    } catch (err) {
        state.value = false
      Swal.fire({
      icon: 'error',
      title: 'Thêm sách thất bại',
      text: 'Không hợp lệ thông tin sách',
    });
    }
    isLoading.value = false
    error.value= "Thông tin sách không hợp lệ hoặc thiếu"
}

</script>

<template>
    <div class="row justify-content-center mt-3">
        <div class="col-md-6">
            <form @submit.prevent="onSubmit" class="w-75 container" enctype="multipart/form-data">
                <div class="row mb-3">
                    <label for="title" class="form-label">Tên sách</label>
                    <input type="text" class="form-control" id="title" v-model="book.title" required>                                  
                </div>
                <div class="row mb-3">
                    <label for="bookID" class="form-label">Mã sách</label>
                    <input type="text" class="form-control" id="bookID" v-model="book.bookID" required>                                  
                </div>
                <div class="row mb-3">
                    <div class="col-7  ps-0">
                        <label for="bookPrice" class="form-label ps-3">Giá</label>
                        <input type="text" class="form-control" id="bookPrice" v-model="book.price" required>
                        <div class="error" v-if="error.price">{{ error.price }}</div>
                    </div>
                    <div class="col-5  pe-0">
                        <label class="form-label ps-3">Loại sách</label>
                        <!-- <select class="form-select" v-model="book.categories" required>
                            <option value="Tiểu thuyết">Tiểu thuyết</option>
                            <option value="Truyện ngắn">Truyện ngắn</option>
                            <option value="Học thuật">Cuộc sống</option>
                        </select>    
                                           -->
                         <input type="text" class="form-control" id="categories" v-model="book.categories" required> 
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="author">Tên tác giả</label>
                    <input type="text" id="author" class="form-control" required
                        v-model="book.author"></input>
                    <div class="error" v-if="error.author">{{ error.author }}</div>
                </div>
                <div class="row mb-3">
                    <label for="publisher">Nhà xuất bản</label>
                    <input type="text" id="publisher" class="form-control" required
                        v-model="book.publisher"></input>                                                    
                </div>  
                <div class="mb-3">
                    <div class="row mb-3">
                    <div class="col-7  ps-0">
                    <label for="quantity" class="form-label">Số lượng</label>
                    <input type="number" class="form-control" id="quantity" v-model="book.quantity" required> 
                    </div>
                    <div class="col-5  pe-0">                        
                        <label for="publicationYear ps-3" class="form-label">Năm xuất bản</label>
                    <input type="text" class="form-control" id="publicationYear" v-model="book.publicationYear" required>                       
                    
                </div>
                </div>
                  
                </div>
                <button type="submit" class="row btn btn-primary">Submit</button>
                <div class="spinner-border text-success ms-5" role="status" v-if="loading">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <span class="message alert alert-primary" :class="state ? 'alert-success' : 'alert-danger'"
                    v-if="state !== null">{{ state ? "Thành công" : "Thất Bại"
                    }}</span>
            </form>
        </div>
  
    </div>
</template>

<style scoped>
.btn.btn-primary {
    background-color: #006f3c;
    border-color: #006f3c;
}

.error {
    color: red;
    font-style: italic;
}

.message {
    margin-left: 50px;
}
</style>
