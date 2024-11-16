<script setup>
import { ref, onMounted } from 'vue';
import userService from '../services/user.service';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const route = useRoute();
const router = useRouter();
const userId = route.params.id;

const userForm = ref({
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
  points: 0,
});

const isLoading = ref(false);
const isSubmitting = ref(false);

// Hàm lấy dữ liệu người dùng từ backend
const fetchUser = async () => {
  try {
    isLoading.value = true;
    const response = await userService.getUserById(userId);
    userForm.value = response;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin người dùng:', error);
    Swal.fire('Lỗi!', 'Không thể tải thông tin người dùng.', 'error');
    router.push('/users');
  } finally {
    isLoading.value = false;
  }
};

// Hàm xử lý cập nhật người dùng
const handleUpdateUser = async () => {
  if (!userForm.value.userFullName || !userForm.value.email) {
    Swal.fire('Lỗi!', 'Vui lòng điền đầy đủ các trường bắt buộc.', 'error');
    return;
  }

  try {
    isSubmitting.value = true;
    await userService.updateUser(userId, userForm.value);

    Swal.fire({
      icon: 'success',
      title: 'Thành công!',
      text: 'Thông tin người dùng đã được cập nhật.',
      showConfirmButton: false,
      timer: 1500,
    });

    router.push('/users');
  } catch (error) {
    console.error('Lỗi khi cập nhật người dùng:', error);
    Swal.fire('Lỗi!', 'Không thể cập nhật người dùng.', 'error');
  } finally {
    isSubmitting.value = false;
  }
};

// Lấy dữ liệu người dùng khi trang được tải
onMounted(() => {
  fetchUser();
});
</script>

<template>
  <div class="edit-user-container">
    <h2>Chỉnh Sửa Người Dùng</h2>
    <form @submit.prevent="handleUpdateUser" v-if="!isLoading">
      <div class="form-group">
        <label>Loại Người Dùng</label>
        <select v-model="userForm.userType">
          <option value="">Chọn loại</option>
          <option value="admin">Admin</option>
          <option value="staff">Nhân Viên</option>          
        </select>
      </div>

      <div class="form-group">
        <label>Họ Tên</label>
        <input type="text" v-model="userForm.userFullName" placeholder="Nhập họ tên" required />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="userForm.email" placeholder="Nhập email" required />
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
        {{ isSubmitting ? 'Đang xử lý...' : 'Cập Nhật' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.edit-user-container {
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
