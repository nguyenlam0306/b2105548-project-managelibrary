<script setup>
import { RouterLink } from "vue-router";
import { ref, defineProps, computed, defineEmits } from "vue";
// import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuthStore } from "@/stores/auth.store";

const props = defineProps([
  'bookId', 'bookID', 'title', 'price', 'categories', 'author',
  'quantity', 'publisherName', 'publicationYear', 'bookStatus'
]);
const emits = defineEmits(['deleteBook']);

const authStore = useAuthStore()
// Lấy giá trị isAdmin từ localStorage
const isAdmin = authStore.isAdmin;
console.log(isAdmin)

const formatPrice = computed(() => {
  let formattedPrice = props.price;
  if (typeof formattedPrice === 'number' && Number.isInteger(formattedPrice)) {
    formattedPrice = formattedPrice.toString();
  }
  let pos = 3;
  while (pos < formattedPrice.length) {
    formattedPrice = formattedPrice.slice(0, -pos) + '.' + formattedPrice.slice(-pos);
    pos += 4;
  }
  return formattedPrice;
});


// Hàm xóa sách với SweetAlert
const handleDeleteBook = async () => {
  // Hiển thị hộp thoại xác nhận sử dụng SweetAlert
  const result = await Swal.fire({
    title: 'Bạn có chắc chắn?',
    text: 'Bạn có muốn xóa sách này không?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Có, xóa!',
    cancelButtonText: 'Không'
  });

  // Nếu người dùng xác nhận, thực hiện yêu cầu xóa
  if (result.isConfirmed) {
    try {

      if (!isAdmin) {
        throw new Error("Bạn không có quyền xóa sách.");
      }
      const res = await emits('deleteBook', props.bookId);
      console.log(res);
        Swal.fire('Đã xóa!', 'Sách đã được xóa thành công.', 'success');
        window.location.reload(); // Hoặc emit sự kiện để cập nhật danh sách sách
       } 
       catch (err) {
      console.error(err);
      Swal.fire('Lỗi!', 'Bạn không có quyền xóa sách', 'error');
    }
  }
};

</script>

<template>
  <div class="card mb-4 p-3 shadow-sm">
    <div class="row g-3">
      <!-- Hình ảnh sách -->
      <div class="col-sm-3 col-lg-2 text-center">
        <img src="/images/book.webp" class="mt-4 img-fluid rounded" alt="Book Image">
      </div>

      <!-- Thông tin sách -->
      <div class="col-sm-6 col-lg-7">
        <div class="card-body">
          <h5 class="card-title"><span class="bold">Tên sách:</span> {{ title }}</h5>
           <div><span class="bold">Mã sách:</span> {{ bookID }}</div>
          <div><span class="bold">Loại:</span> {{ categories }}</div>
          <div><span class="bold">Số lượng:</span> {{ quantity }}</div>
          <div><span class="bold">Giá:</span> {{ formatPrice }} VNĐ</div>
          <div><span class="bold">Tác giả:</span> {{ author }}</div>
          <div><span class="bold">Nhà xuất bản:</span> {{ publisherName }}</div>
          <div><span class="bold">Năm xuất bản:</span> {{ publicationYear }}</div>
          <div><span class="bold">Tình trạng:</span> {{ bookStatus }}</div>
        </div>
      </div>

      <!-- Nút Chỉnh sửa và Xóa chỉ hiện nếu là Admin -->
      <div v-if="isAdmin" class="col-sm-3 col-lg-3 d-flex flex-column justify-content-center align-items-center">
        <router-link :to="`/books/update/${bookId}`" class="btn btn-primary mb-2">Chỉnh sửa</router-link>
        <button class="btn btn-danger" @click="handleDeleteBook">Xóa</button>
      </div>
    </div>
  </div>
 
</template>

<style scoped>
.img-card {
  height: 150px;
  width: 100%;
  object-fit: contain;
}

.card-title {
  color: #09308a;
}

.bold {
  font-weight: bold;
}
</style>
