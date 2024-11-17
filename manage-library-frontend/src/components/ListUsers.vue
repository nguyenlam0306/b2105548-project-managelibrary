<script setup>
import { ref, onMounted } from 'vue';
import userService from '../services/user.service';
import UserModal from './UserModal.vue';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import router from '@/router';


const users = ref([]);
const selectedUser = ref(null);
const isLoading = ref(true);

const fetchUsers = async () => {
  try {
    isLoading.value = true;
    users.value = await userService.getAllUsers();
  } catch (error) {
    console.error('Lỗi khi lấy danh sách người dùng:', error);
    Swal.fire('Lỗi!', 'Không thể tải danh sách người dùng.', 'error');
  } finally {
    isLoading.value = false;
  }
};

// Xem thông tin chi tiết của người dùng
const viewUser = (user) => {
  selectedUser.value = user;
};

// Chỉnh sửa người dùng (giả sử có một form khác để xử lý)
const editUser = (user) => {
  Swal.fire({
    icon: 'info',
    title: 'Chỉnh sửa',
    text: `Chỉnh sửa thông tin của ${user.userFullName}`
  }); 
  router.push(`/users/update/${user._id}`);

};

// Xóa người dùng
const handleDeleteUser = async (userId) => {
  const result = await Swal.fire({
    title: 'Bạn có chắc chắn?',
    text: 'Xóa người dùng sẽ làm hỏng hệ thống.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Có, xóa!',
    cancelButtonText: 'Không'
  });

  if (result.isConfirmed) {
    try {
      await userService.deleteUser(userId);
      Swal.fire('Đã xóa!', 'Người dùng đã được xóa thành công.', 'success');
      fetchUsers(); // Cập nhật lại danh sách sau khi xóa
    } catch (error) {
      console.error('Lỗi khi xóa người dùng', error);
      Swal.fire('Lỗi!', 'Bạn chỉ có thể xóa chính bạn.', 'error');
    }
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="user-list">
    <h2>Danh Sách Người Dùng</h2>
    <div v-if="isLoading" class="loader">Đang tải...</div>
    
    <table v-if="users.length && !isLoading">
      <thead>
        <tr>
          <th>Họ Tên</th>
          <th>Email</th>
          <th>Loại Người Dùng</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.userFullName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.userType }}</td>
          <td>
            <button class="btn btn-view" @click="viewUser(user)">Chi tiết</button>
            <button class="btn btn-edit" @click="editUser(user)">Chỉnh sửa</button>
            <button class="btn btn-delete" @click="handleDeleteUser(user._id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Không có người dùng nào để hiển thị.</p>

    <UserModal v-if="selectedUser" :user="selectedUser" @close="selectedUser = null" />
  </div>
</template>

<style scoped>
.user-list {
  margin-top: 50px!important;
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #133e87;
  color: #fff;
}

.btn {
  margin-right: 5px;
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-view {
  background-color: #608bc1;
  color: #fff;
}

.btn-edit {
  background-color: #f3c623;
  color: #fff;
}

.btn-delete {
  background-color: #d33;
  color: #fff;
}

.loader {
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
}
</style>
