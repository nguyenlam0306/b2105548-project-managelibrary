<script setup>
import { ref } from 'vue';
import userService from '../services/user.service';
import authService from '@/services/auth.service';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const userForm = ref({
  isAdmin: false,
  userType: '',
  userFullName: '',
  admissionId: '',
  employeeId: '',
  age: null,
  gender: '',
  dob: '',
  address: '',
  mobileNumber: '',
  email: '',
  password: '',
  points: 0,
});

const isSubmitting = ref(false);

const resetForm = () => {
  userForm.value = {
    isAdmin: false,
    userType: '',
    userFullName: '',
    admissionId: '',
    employeeId: '',
    age: null,
    gender: '',
    dob: '',
    address: '',
    mobileNumber: '',
    email: '',
    password: '',
    points: 0,
  };
};

// Hàm xử lý gửi yêu cầu tạo người dùng mới
const handleAddUser = async () => {
  if (!userForm.value.userFullName || !userForm.value.email || !userForm.value.password) {
    Swal.fire('Lỗi!', 'Vui lòng điền đầy đủ các trường bắt buộc.', 'error');
    return;
  }

  try {
    isSubmitting.value = true;
    await authService.register(userForm.value);

    Swal.fire({
      icon: 'success',
      title: 'Thành công!',
      text: 'Người dùng đã được thêm thành công.',
      showConfirmButton: false,
      timer: 1500
    });

    resetForm();
  } catch (error) {
    console.error('Lỗi khi thêm người dùng:', error);
    Swal.fire('Lỗi!', 'Không thể thêm người dùng. Vui lòng thử lại.', 'error');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="add-user-container">
    <h2>Thêm Người Dùng Mới</h2>
    <form @submit.prevent="handleAddUser">
      <div class="form-group">
        <label>Loại Người Dùng</label>
        <select v-model="userForm.userType" required>
          <option value="">Chọn loại</option>
          <!-- <option value="admin">Admin</option> -->
          <option value="staff">Nhân Viên</option>          
        </select>
      </div>

      <div class="form-group">
        <label>Họ Tên</label>
        <input type="text" v-model="userForm.userFullName" placeholder="Nhập họ tên" required />
      </div>

       <div class="form-group">
        <label>Mã nhân viên (dùng để đăng nhập)</label>
        <input type="text" v-model="userForm.admissionId" placeholder="Nhập mã nhân viên" />
      </div>
        

      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="userForm.email" placeholder="Nhập email" required />
      </div>

      <div class="form-group">
        <label>Mật Khẩu</label>
        <input type="password" v-model="userForm.password" placeholder="Nhập mật khẩu" required />
      </div>

      <div class="form-group">
        <label>Điện Thoại</label>
        <input type="text" v-model="userForm.mobileNumber" placeholder="Nhập số điện thoại" />
      </div>

      <div class="form-group">
        <label>Ngày Sinh</label>
        <input type="date" v-model="userForm.dob" />
      </div>

      <div class="form-group">
        <label>Địa Chỉ</label>
        <textarea v-model="userForm.address" placeholder="Nhập địa chỉ"></textarea>
      </div>

      <button type="submit" class="btn-submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Đang xử lý...' : 'Thêm Người Dùng' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.add-user-container {
  max-width: 600px;
  margin: auto;
  margin-top: 40px!important;
  padding: 20px;
  background: #f3f3e0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input,
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #133e87;
}

textarea {
  resize: vertical;
}

.btn-submit {
  background-color: #133e87;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.btn-submit:hover {
  background-color: #608bc1;
}

.btn-submit:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
