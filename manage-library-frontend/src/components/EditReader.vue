<template>
  <div class="edit-reader">
    <h2>Chỉnh Sửa Thông Tin Độc Giả</h2>
    <form @submit.prevent="updateReader">
      <div class="form-group">
        <label for="readerId">Mã Độc Giả</label>
        <input v-model="readerId" type="text" id="readerId" disabled />
      </div>
      <div class="form-group">
        <label for="firstName">Tên</label>
        <input v-model="firstName" type="text" id="firstName" required />
      </div>
      <div class="form-group">
        <label for="fullName">Họ và Tên</label>
        <input v-model="fullName" type="text" id="fullName" required />
      </div>
      <div class="form-group">
        <label for="birthday">Ngày Sinh</label>
        <input v-model="birthday" type="date" id="birthday" required />
      </div>
      <div class="form-group">
        <label for="gender">Giới Tính</label>
        <select v-model="gender" id="gender">
          <option value="Male">Nam</option>
          <option value="Female">Nữ</option>
          <option value="Other">Khác</option>
        </select>
      </div>
      <div class="form-group">
        <label for="address">Địa Chỉ</label>
        <input v-model="address" type="text" id="address" required />
      </div>
      <div class="form-group">
        <label for="phone">Số Điện Thoại</label>
        <input v-model="phone" type="text" id="phone" required />
      </div>
      <button type="submit" class="btn btn-primary">Cập Nhật</button>
      <button type="button" class="btn btn-secondary" @click="cancelEdit">Hủy</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ReaderService from '../services/reader.service';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const readerService = new ReaderService()
const route = useRoute();
const router = useRouter();

// Khởi tạo các biến để lưu trữ thông tin độc giả
const readerId = ref('');
const firstName = ref('');
const fullName = ref('');
const birthday = ref('');
const gender = ref('Male');
const address = ref('');
const phone = ref('');

const fetchReader = async () => {
  const { id } = route.params;
  try {
    const reader = await readerService.getReaderById(id);
    readerId.value = reader.readerId;
    firstName.value = reader.firstName;
    fullName.value = reader.fullName;
    birthday.value = reader.birthday.slice(0, 10); // Lấy đúng định dạng yyyy-mm-dd
    gender.value = reader.gender;
    address.value = reader.address;
    phone.value = reader.phone;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin độc giả:', error);
    Swal.fire('Lỗi!', 'Không thể tải thông tin độc giả.', 'error');
  }
};

// Hàm cập nhật thông tin độc giả
const updateReader = async () => {
  const updatedReader = {
    firstName: firstName.value,
    fullName: fullName.value,
    birthday: birthday.value,
    gender: gender.value,
    address: address.value,
    phone: phone.value,
  };

  try {
    await readerService.updateReader(route.params.id, updatedReader);
    Swal.fire('Thành công!', 'Thông tin độc giả đã được cập nhật.', 'success');
    router.push('/readers/all');
  } catch (error) {
    console.error('Lỗi khi cập nhật thông tin độc giả:', error);
    Swal.fire('Lỗi!', 'Có lỗi xảy ra khi cập nhật độc giả.', 'error');
  }
};

// Hủy bỏ chỉnh sửa và quay lại trang danh sách
const cancelEdit = () => {
  router.push('/readers/all');
};

// Lấy thông tin độc giả khi tải trang
onMounted(() => {
  fetchReader();
});
</script>

<style scoped>
.edit-reader {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  margin-top: 20px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #133e87;
  color: white;
}

.btn-secondary {
  background-color: #f3c623;
  color: white;
  margin-left: 10px;
}
</style>
