<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";

const tab = ref("AllUsers");
</script>

<template>
  <div class="btn-group ml-3 p-1" role="group">
    <!-- Nút Kho sách -->
    <router-link
      to="/users/all"
      class="btn custom-btn"
      :class="{ active: tab === 'AllUsers' }"
      @click="tab = 'AllUsers'"    >
      Danh sách thành viên
    </router-link>
    
    <!-- Nút Thêm thành viên -->
    <router-link
      to="/users/add"
      class="btn custom-btn"
      :class="{ active: tab === 'AddUser' }"
      @click="tab = 'AddUser'"
    >
      Thêm thành viên
    </router-link>

     <!-- Nút Độc giả -->
    <router-link
      to="/readers/all"
      class="btn custom-btn"
      :class="{ active: tab === 'AllReaders' }"
      @click="tab = 'AllReaders'"
    >
      Quản lý độc giả
    </router-link>
    <router-link
      to="/readers/add"
      class="btn custom-btn"
      :class="{ active: tab === 'AddReaders' }"
      @click="tab = 'AddReaders'"
    >
      Thêm độc giả
    </router-link>
  </div>

  <div>
    <Suspense>
      <template #default>
        <router-view />
      </template>
      <template #fallback>
        Loading ...
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
.btn-group {
  margin-top: 60px;
  margin-left: 26px;
}

.custom-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #09308a;
  color: white;
  border: none;
  transition: background-color 0.3s, transform 0.2s;
}

.custom-btn-a{
   display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4b76a1;
  color: white;
  border: none;
  transition: background-color 0.3s, transform 0.2s;
}


.custom-btn:hover {
  background-color: #00629b;
  color: aliceblue;
  /* color: aqua */
}

.custom-btn.active {
  background-color: #c8e8f4;
  transform: translateY(-2px);
}

.custom-btn:focus {
  box-shadow: none;
}
</style>
