<script setup>
import { ref, reactive, onMounted } from "vue";
import PublisherService from "@/services/publisher.service.js";
import Swal from "sweetalert2";


const publisherService = new PublisherService()
// Reactive object cho form thêm publisher
const publisher = reactive({
    publisherID: "",
  publisherName: "",
  address: ""
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
    publisher.publisherID = "";
    publisher.publisherName = "";
    publisher.address = "";
    await fetchPublishers(); // Refresh danh sách sau khi thêm
  } catch (error) {
    Swal.fire("Lỗi", "Không thể thêm nhà xuất bản!", "error");
    console.error("Failed to add publisher:", error);
  }
}

// Tải danh sách nhà xuất bản khi trang được mở
onMounted(fetchPublishers);
</script>

<template>
  <div class="container ">
    <h2 class="mb-4">Quản Lý Nhà Xuất Bản</h2>

    <!-- Form Thêm Nhà Xuất Bản -->
    <form method="" @submit.prevent="onSubmit" class="mb-4">
      <div class="mb-3">
        <label for="publisherID" class="form-label">Mã Nhà xuất bản</label>
        <input
          type="text"
          id="publisherID"
          v-model="publisher.publisherID"
          class="form-control"
          required
        />
      </div>
      
        <div class="mb-3">
        <label for="publisherName" class="form-label">Tên nhà xuất bản</label>
        <input
          type="text"
          id="publisherName"
          v-model="publisher.publisherName"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Địa Chỉ</label>
        <input
          type="text"
          id="address"
          v-model="publisher.address"
          class="form-control" required
        />
      </div>
      <button type="submit" class="btn btn-primary">Thêm Nhà xuất bản</button>
    </form>

    <!-- Hiển Thị Danh Sách Nhà Xuất Bản -->
    <h3>Danh sách Nhà xuất bản</h3>
    <table class="table table-striped">
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
</template>



<style scoped>
.container {
  max-width: 600px;
  margin-top: 59px;
}

.table {
  margin-top: 20px;
}
</style>
