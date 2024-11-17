<script setup>
import { ref, onMounted } from 'vue';
import ReaderService from '@/services/reader.service';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const readerService = new ReaderService()
const readers = ref([]);
const isLoading = ref(true);
const router = useRouter();

const fetchReaders = async () => {
  try {
    isLoading.value = true;
    readers.value = await readerService.getAllReaders();
  } catch (error) {
    console.error('Lỗi khi lấy danh sách độc giả:', error);
    Swal.fire('Lỗi!', 'Không thể tải danh sách độc giả.', 'error');
  } finally {
    isLoading.value = false;
  }
};

const handleDeleteReader = async (readerId) => {
  const result = await Swal.fire({
    title: 'Bạn có chắc chắn?',
    text: 'Xóa độc giả sẽ không thể khôi phục.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Có, xóa!',
    cancelButtonText: 'Không'
  });

  if (result.isConfirmed) {
    try {
      await readerService.deleteReader(readerId);
      Swal.fire('Đã xóa!', 'Độc giả đã được xóa thành công.', 'success');
      fetchReaders();
    } catch (error) {
      console.error('Lỗi khi xóa độc giả:', error);
      Swal.fire('Lỗi!', 'Có lỗi xảy ra khi xóa độc giả.', 'error');
    }
  }
};

const viewReader = (reader) => {
  router.push(`/readers/update/${reader._id}`);
};

onMounted(() => {
  fetchReaders();
});
</script>

<template>
  <div class="reader-list">
    <h2>Danh Sách Độc Giả</h2>
    <div v-if="isLoading" class="loader">Đang tải...</div>

    <table v-if="readers.length && !isLoading">
      <thead>
        <tr>
          <th>Mã Độc Giả</th>
          <th>Tên Đầy Đủ</th>
          <th>Ngày Sinh</th>
          <th>Giới Tính</th>
          <th>Địa Chỉ</th>
          <th>Điện Thoại</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reader in readers" :key="reader._id">
          <td>{{ reader.readerId }}</td>
          <td>{{ reader.fullName }}</td>
          <td>{{ new Date(reader.birthday).toLocaleDateString() }}</td>
          <td>{{ reader.gender }}</td>
          <td>{{ reader.address }}</td>
          <td>{{ reader.phone }}</td>
          <td>
            <button class="btn btn-edit" @click="viewReader(reader)">Chỉnh sửa</button>
            <button class="btn btn-delete" @click="handleDeleteReader(reader._id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Không có độc giả nào để hiển thị.</p>
  </div>
</template>

<style scoped>
.reader-list {
  margin-top: 50px;
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
