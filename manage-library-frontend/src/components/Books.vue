<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";

const tab = ref("AllBooks");
</script>

<template>
  <div class="btn-group ml-3 p-1" role="group">
    <!-- Nút Kho sách -->
    <router-link
      to="/books/all"
      class="btn custom-btn"
      :class="{ active: tab === 'AllBooks' }"
      @click="tab = 'AllBooks'"
    >
      Kho sách
    </router-link>
    
    <!-- Nút Thêm sách -->
    <router-link
      to="/books/addbook"
      class="btn custom-btn"
      :class="{ active: tab === 'AddBook' }"
      @click="tab = 'AddBook'"
    >
      Thêm sách
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

.custom-btn:hover {
  background-color: #2a4c9b;
}

.custom-btn.active {
  background-color: #c8e8f4;
  transform: translateY(-2px);
}

.custom-btn:focus {
  box-shadow: none;
}
</style>
