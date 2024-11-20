<script setup>
import { ref, reactive, onMounted } from "vue";
import PublisherService from "@/services/publisher.service.js";
import BookService from "@/services/book.service.js"; // Thêm service cho sách
import Swal from "sweetalert2";

const publisherService = new PublisherService();
const bookService = new BookService();

const publishersList = ref([]);

const publisher = reactive({
  publisherID: "",
  publisherName: "",
  address: "",
});

const selectedPublisher = reactive({
  publisherID: "",
  publisherName: "",
  address: "",
  books: [], // Danh sách sách của nhà xuất bản
});
const showModal = ref(false);

// Hàm lấy danh sách nhà xuất bản
async function fetchPublishers() {
  try {
    publishersList.value = await publisherService.getAllPublishers();
  } catch (error) {
    console.error("Failed to fetch publishers:", error);
  }
}

// Hàm lấy sách theo nhà xuất bản
async function fetchBooksByPublisher(publisherId) {
  try {
    const books = await bookService.getBookByPublisher(publisherId);
    selectedPublisher.books = books;
    showModal.value = true; // Hiển thị modal
  } catch (error) {
    console.error("Failed to fetch books for publisher:", error);
    Swal.fire("Lỗi", "Không thể lấy danh sách sách!", "error");
  }
}

onMounted(() => {
  fetchPublishers();
});

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
function closeModal() {
  showModal.value = false;
  // Nếu muốn thêm hiệu ứng, có thể setTimeout trước khi ẩn hoàn toàn
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

   <!-- Danh sách nhà xuất bản -->
    <div class="card shadow p-4">
      <h3 class="mb-4">Danh Sách Nhà Xuất Bản</h3>
      <table class="table table-hover table-responsive">
        <thead>
          <tr>
            <th>Mã NXB</th>
            <th>Tên NXB</th>
            <th>Địa Chỉ</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="publisher in publishersList" :key="publisher._id">
            <td>{{ publisher.publisherID }}</td>
            <td>{{ publisher.publisherName }}</td>
            <td>{{ publisher.address || "N/A" }}</td>
            <td>
              <button
                class="btn btn-primary"
                @click="fetchBooksByPublisher(publisher._id)"
              >
                Xem Sách
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal hiển thị sách -->
    <div
  class="modal fade"
  :class="{ show: showModal }"
  :style="{ display: showModal ? 'block' : 'none' }"
  tabindex="-1"
  role="dialog"
>
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">
          Sách của Nhà Xuất Bản: {{ selectedPublisher.publisherName }}
        </h5>
        <button
          type="button"
          class="btn-close"
          @click="closeModal"
        ></button>
      </div>
      <div class="modal-body">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Mã Sách</th>
              <th>Tên Sách</th>
              <th>Giá</th>
              <th>Số Lượng</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in selectedPublisher.books" :key="book.bookID">
              <td>{{ book.bookID }}</td>
              <td>{{ book.title }}</td>
              <td>{{ book.price }}</td>
              <td>{{ book.quantity }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
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

