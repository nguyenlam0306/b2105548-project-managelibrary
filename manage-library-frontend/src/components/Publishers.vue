<script setup>
import { ref, reactive, onMounted } from "vue";
import PublisherService from "@/services/publisher.service.js";
import Swal from "sweetalert2";

const publisherService = new PublisherService();

const publisher = reactive({
  publisherID: "",
  publisherName: "",
  address: "",
});

const publishersList = ref([]);

// Hàm lấy danh sách nhà xuất bản từ backend
async function fetchPublishers() {
  try {
    publishersList.value = await publisherService.getAllPublishers();
  } catch (error) {
    console.error("Failed to fetch publishers:", error);
  }
}

// Hàm xử lý khi submit form
async function onSubmit() {
  if (!publisher.publisherName) {
    Swal.fire("Lỗi", "Tên nhà xuất bản không được để trống!", "error");
    return;
  }

  try {
    await publisherService.addPublisher(publisher);
    Swal.fire("Thành công", "Nhà xuất bản đã được thêm!", "success");
    // Reset form
    publisher.publisherID = "";
    publisher.publisherName = "";
    publisher.address = "";
    await fetchPublishers(); // Refresh danh sách sau khi thêm
  } catch (error) {
    Swal.fire("Lỗi", "Không thể thêm nhà xuất bản!", "error");
    console.error("Failed to add publisher:", error);
  }
}

onMounted(fetchPublishers);
</script>


<template>
  <div class="container">
    <div class="card shadow p-4 mb-5">
      <h2 class="text-center mb-4">Quản Lý Nhà Xuất Bản</h2>

      <!-- Form Thêm Nhà Xuất Bản -->
      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label for="publisherID" class="form-label">Mã Nhà Xuất Bản</label>
          <input
            type="text"
            id="publisherID"
            v-model="publisher.publisherID"
            class="form-control"
            placeholder="Nhập mã NXB"
          />
        </div>

        <div class="mb-3">
          <label for="publisherName" class="form-label">Tên Nhà Xuất Bản</label>
          <input
            type="text"
            id="publisherName"
            v-model="publisher.publisherName"
            class="form-control"
            placeholder="Nhập tên NXB"
            required
          />
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">Địa Chỉ</label>
          <input
            type="text"
            id="address"
            v-model="publisher.address"
            class="form-control"
            placeholder="Nhập địa chỉ NXB"
          />
        </div>

        <button type="submit" class="btn btn-primary w-100">Thêm Nhà Xuất Bản</button>
      </form>
    </div>

    <!-- Hiển Thị Danh Sách Nhà Xuất Bản -->
    <div class="card shadow p-4">
      <h3 class="mb-4">Danh Sách Nhà Xuất Bản</h3>
      <table class="table table-hover table-responsive">
        <thead>
          <tr>
            <th>Mã NXB</th>
            <th>Tên NXB</th>
            <th>Địa Chỉ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="publisher in publishersList" :key="publisher._id">
            <td>{{ publisher.publisherID }}</td>
            <td>{{ publisher.publisherName }}</td>
            <td>{{ publisher.address || "N/A" }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>




<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  margin-top: 50px;
  padding: 20px;
}

.card {
  border-radius: 12px;
  margin-bottom: 30px;
}

h2 {
  color: #153b77;
}

.btn-primary {
  background-color: #133e87;
  border-color: #133e87;
}

.btn-primary:hover {
  background-color: #1050a1;
  border-color: #1050a1;
}

.table {
  margin-top: 20px;
}

.table-hover tbody tr:hover {
  background-color: #f3f3e0;
}

@media (max-width: 768px) {
  .container {
    padding: 15px;
  }
}
</style>

