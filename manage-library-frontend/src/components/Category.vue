<script setup>
import { ref, reactive, onMounted } from "vue";
import CategoryService from "@/services/category.service.js";
import Swal from "sweetalert2";

const categoryService = new CategoryService();

const category = reactive({  
  categoryName: "",  
});

const categoriesList = ref([]);

// Hàm lấy danh sách nhà xuất bản từ backend
async function fetchCategories() {
  try {
    categoriesList.value = await categoryService.getAllCategories();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
}

// Hàm xử lý khi submit form
async function onSubmit() {
  if (!category.categoryName) {
    Swal.fire("Lỗi", "Tên thể loại không được để trống!", "error");
    return;
  }

  try {
    await categoryService.addCategory(category);
    Swal.fire("Thành công", "Thể loại đã được thêm!", "success");
    // Reset form    
    category.categoryName = "";   
    await fetchCategories(); // Refresh danh sách sau khi thêm
  } catch (error) {
    Swal.fire("Lỗi", "Không thể thêm nhà xuất bản!", "error");
    console.error("Failed to add Category:", error);
  }
}

onMounted(fetchCategories);
</script>


<template>
  <div class="container">
    <div class="card shadow p-4 mb-5">
      <h2 class="text-center mb-4">Quản Lý thể loại</h2>

      <!-- Form Thêm Nhà Xuất Bản -->
      <form @submit.prevent="onSubmit">        

        <div class="mb-3">
          <label for="categoryName" class="form-label">Tên thể loại</label>
          <input
            type="text"
            id="categoryName"
            v-model="category.categoryName"
            class="form-control"
            placeholder="Nhập tên thể loại"
            required
          />
        </div>

       

        <button type="submit" class="btn btn-primary w-100">Thêm</button>
      </form>
    </div>

    <!-- Hiển Thị Danh Sách Nhà Xuất Bản -->
    <div class="card shadow p-4">
      <h3 class="mb-4">Danh sách thể loại</h3>
      <table class="table table-hover table-responsive">
        <thead>
          <tr>            
            <th>Tên thể loại</th>           
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categoriesList" :key="category._id">           
            <td>{{ category.categoryName }}</td>           
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

