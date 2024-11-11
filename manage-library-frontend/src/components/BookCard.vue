<script setup>
import { RouterLink } from "vue-router";
import { ref, defineProps, computed, defineEmits } from "vue";
import axios from 'axios';
import Swal from 'sweetalert2';

const props = defineProps([
  'bookId', 'bookID', 'title', 'price', 'categories', 'author',
  'quantity', 'publisher', 'publicationYear', 'bookStatus'
]);
const emits = defineEmits(['deleteBook']);

// Lấy giá trị isAdmin từ localStorage
const isAdmin = ref(localStorage.getItem('isAdmin'));

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
      const response = await emits('deleteBook', props.bookId);
      
        Swal.fire('Đã xóa!', 'Sách đã được xóa thành công.', 'success');
        window.location.reload(); // Hoặc emit sự kiện để cập nhật danh sách sách
       } 
       catch (err) {
      console.error(err);
      Swal.fire('Lỗi!', 'Có lỗi xảy ra khi xóa sách.', 'error');
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
          <div><span class="bold">Nhà xuất bản:</span> {{ publisher }}</div>
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

  <!-- <div class="modal fade" :id="'deleteModal' + bookId" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">Xác nhận xóa sách</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Bạn có chắc muốn xóa sách <strong>{{ title }}</strong> không?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Không</button>
          <button type="button" class="btn btn-danger" @click="$emit('deleteBook', bookId)" data-bs-dismiss="modal">
            Có
          </button>
        </div>
      </div>
    </div>
  </div> -->
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
