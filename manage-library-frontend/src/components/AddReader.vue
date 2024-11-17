<script setup>
import { ref } from 'vue';
import ReaderService from '@/services/reader.service';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useRouter } from 'vue-router';

const readerService = new ReaderService()
const router = useRouter();

// Khởi tạo các biến để lưu trữ dữ liệu từ form
const readerId = ref('');
const firstName = ref('');
const fullName = ref('');
const birthday = ref('');
const gender = ref('Male');
const address = ref('');
const phone = ref('');

// Hàm xử lý khi nhấn nút "Thêm Độc Giả"
const addReader = async () => {
  if (!readerId.value || !firstName.value || !fullName.value || !birthday.value || !address.value || !phone.value) {
    Swal.fire('Lỗi!', 'Vui lòng điền đầy đủ thông tin.', 'error');
    return;
  }

  const newReader = {
    readerId: readerId.value,
    firstName: firstName.value,
    fullName: fullName.value,
    birthday: birthday.value,
    gender: gender.value,
    address: address.value,
    phone: phone.value
  };

  try {
    await readerService.addReader(newReader);
    Swal.fire('Thành công!', 'Độc giả đã được thêm thành công.', 'success');
    router.push('/readers/all');
  } catch (error) {
    console.error('Lỗi khi thêm độc giả:', error);
    Swal.fire('Lỗi!', 'Có lỗi xảy ra khi thêm độc giả.', 'error');
  }
};
</script>

<template>
  <div class="add-reader">
    <h2>Thêm Mới Độc Giả</h2>
    <form @submit.prevent="addReader" class="form-container">
      <div class="form-group">
        <label for="readerId">Mã Độc Giả:</label>
        <input type="text" id="readerId" v-model="readerId" required />
      </div>

      <div class="form-group">
        <label for="firstName">Họ:</label>
        <input type="text" id="firstName" v-model="firstName" required />
      </div>

      <div class="form-group">
        <label for="fullName">Tên Đầy Đủ:</label>
        <input type="text" id="fullName" v-model="fullName" required />
      </div>

      <div class="form-group">
        <label for="birthday">Ngày Sinh:</label>
        <input type="date" id="birthday" v-model="birthday" required />
      </div>

      <div class="form-group">
        <label for="gender">Giới Tính:</label>
        <select id="gender" v-model="gender">
          <option value="Male">Nam</option>
          <option value="Female">Nữ</option>
          <option value="Other">Khác</option>
        </select>
      </div>

      <div class="form-group">
        <label for="address">Địa Chỉ:</label>
        <input type="text" id="address" v-model="address" required />
      </div>

      <div class="form-group">
        <label for="phone">Số Điện Thoại:</label>
        <input type="text" id="phone" v-model="phone" required />
      </div>

      <button type="submit" class="btn-submit">Thêm Độc Giả</button>
    </form>
  </div>
</template>

<style scoped>
.add-reader {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #133e87;
}

.form-container {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

input[type="date"] {
  padding: 8px;
}

.btn-submit {
  background-color: #608bc1;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #133e87;
}
</style>
