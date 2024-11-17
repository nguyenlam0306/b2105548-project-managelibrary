<script setup>
import { defineProps, ref, computed, watch, onMounted } from 'vue';
import transactionService from '@/services/transaction.service';
import BookService from '@/services/book.service';
import ReaderService from '@/services/reader.service';
import userService from '@/services/user.service';
import { useSocketStore } from '../stores/socket.store';
import Swal from 'sweetalert2';

const bookService = new BookService;
const readerService = new ReaderService;

const status = {
  active: 'Đã sẵn sàng',
  processing: 'Đang xử lý',
  accepted: 'Đã xử lý',
  rejected: 'Đã từ chối',
};

const props = defineProps(['transaction']);
const transactionStatus = ref(props.transaction.transactionStatus);

const bookPrice = ref('');

const readerName = ref('');
const userName = ref('');
const bookTitle = ref('');

// Định dạng số tiền
// const formatPrice = (price) => {
//   let formatPrice = price;
//   if (typeof formatPrice === 'number' && Number.isInteger(formatPrice)) {
//     formatPrice = formatPrice.toString();
//   }
//   let pos = 3;
//   while (pos < formatPrice.length) {
//     formatPrice = formatPrice.slice(0, -pos) + '.' + formatPrice.slice(-pos);
//     pos += 4;
//   }
//   return formatPrice;
// };

// Lấy thông tin độc giả
const fetchReaderName = async () => {
  try {
    const reader = await readerService.getReaderById(props.transaction.readerId);
    readerName.value = reader.fullName;
  } catch (error) {
    console.error('Lỗi khi lấy tên độc giả:', error);
  }
};

// Lấy thông tin nhân viên
const fetchUserName = async () => {
  try {
    const user = await userService.getUserById(props.transaction.userId);
    userName.value = user.userFullName;
  } catch (error) {
    console.error('Lỗi khi lấy tên người dùng:', error);
  }
};

// Lấy thông tin sách
const fetchBookTitle = async () => {
  try {
    const book = await bookService.getBookById(props.transaction.bookId);
    bookTitle.value = book.title;
    bookPrice.value = book.price;
  } catch (error) {
    console.error('Lỗi khi lấy tên sách:', error);
  }
};

// Hàm thay đổi trạng thái giao dịch
const changeStatus = async (transactionStatus) => {
  document.getElementById(`close${props.transaction._id}`).click();
  try {
    await transactionService.updateTransactionStatus(props.transaction._id, transactionStatus);
    const socketStore = useSocketStore();
    socketStore.io.emit('changeStatus');
    Swal.fire('Thành công!', 'Trạng thái đã được cập nhật.', 'success');
  } catch (err) {
    console.error('Lỗi khi cập nhật trạng thái:', err);
    Swal.fire('Lỗi!', 'Không thể cập nhật trạng thái.', 'error');
  }
};

// Gọi các hàm khi trang được tải
onMounted(() => {
  fetchReaderName();
  fetchUserName();
  fetchBookTitle();
});

watch(transactionStatus, async (newStatus) => {
  await changeStatus(newStatus);
});
</script>


<template>
  <tr data-bs-toggle="modal" :data-bs-target="`#Modal${transaction._id}`">
    <th scope="row">...{{ transaction._id.substr(transaction._id.length - 5) }}</th>
    <td>{{ readerName }}</td>
    <td>{{ userName }}</td>
    <td>{{ bookTitle }}</td>
    <td>{{ bookPrice }}đ</td>
    <td>{{ status[transaction.transactionStatus] }}</td>
    <td>{{ new Date(transaction.fromDate).toLocaleDateString() }}</td>
    <td>{{ new Date(transaction.toDate).toLocaleDateString() }}</td>
    <td>
      {{ transaction.returnDate ? new Date(transaction.returnDate).toLocaleDateString() : 'Chưa trả' }}
    </td>
  </tr>

  <!-- Modal chi tiết giao dịch -->
  <div class="modal fade" :id="`Modal${transaction._id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Giao dịch {{ transaction._id }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h3>Người mượn: {{ readerName }}</h3>
          <h4>Nhân viên: {{ userName }}</h4>
          <h4>Sách: {{ bookTitle }}</h4>
          <h5 class="h5">Tổng cộng: {{ bookPrice }}đ</h5>
          <div class="col-3 my-2">
            <select v-model="transactionStatus" class="form-select" aria-label="Default select example">
              <option value="processing">Đang xử lý</option>
              <option value="accepted">Đã nhận</option>
              <option value="rejected">Đã từ chối</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button :id="`close${props.transaction._id}`" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

h3,
h4,
h5 {
    color: #1e62a2;
}
</style>