<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth.store";
import { RouterLink } from "vue-router";
const authStore = useAuthStore();
import Swal from 'sweetalert2';

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("isAdmin");
  Swal.fire('Đăng xuất thành công!', '', 'success');
  window.location.reload();
};

const isAdmin = ref(localStorage.getItem('isAdmin'));

</script>

<template>
  <nav
    id="sidebarMenu"
    class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse mt-3"
  >
    <div class="position-sticky pt-3 sidebar-sticky">
      <ul class="nav flex-column">
        <li class="nav-item mt-5" >
          <router-link
            class="nav-link active"
           
            aria-current="page"
            to="/profile"
          >
            <span data-feather="home" class="align-text-bottom"></span>
            Profile 
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link"  to="/books">
            <span data-feather="file" class="align-text-bottom"></span>
            Sách
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/transactions">
            <span data-feather="shopping-cart" class="align-text-bottom"></span>
            Giao dịch
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link"  to="/users" v-if="isAdmin">
            <span data-feather="users" class="align-text-bottom"></span>
           Thành viên
          </router-link>         
        </li>
        <li class="nav-item">
          <router-link class="nav-link"  to="/publishers">
            <span data-feather="users" class="align-text-bottom"></span>
          Nhà xuất bản
          </router-link>         
        </li>
        <li class="nav-item">
           <router-link class="nav-link"  to="/categories">
            <span data-feather="" class="align-text-bottom"></span>
          Thể loại
          </router-link> 
        </li>      
        <li class="nav-item mt-2">
          <p class="dashboard-option" @click="logout">
          <i class="fas fa-power-off" /> Đăng xuất
        </p>
        </li>

      </ul>
    </div>
  </nav>
</template>

<style scoped>
li.nav-item .nav-link {
  color: #333; /* Màu chữ mặc định */
  background-color: transparent; /* Màu nền mặc định */
  transition: background-color 0.3s ease, color 0.3s ease;
  padding: 10px;
  border-radius: 5px;
}

li.nav-item .nav-link:hover {
  color: #FFFFFF; /* Màu chữ khi hover */
  background-color: #133E87; /* Màu nền xanh dương khi hover */
}

.dashboard-option {
  color: #333; /* Màu chữ mặc định cho Đăng xuất */
  transition: background-color 0.3s ease, color 0.3s ease;
  padding: 10px;
  border-radius: 5px;
}

.dashboard-option:hover {
  color: #FFFFFF; /* Màu chữ khi hover cho Đăng xuất */
  background-color: #133E87; /* Màu nền xanh dương khi hover cho Đăng xuất */
}
p {
  cursor: pointer;
}
</style>
