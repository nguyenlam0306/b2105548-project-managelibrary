<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['user']);
const emit = defineEmits();

const closeModal = () => {
  emit('close');
};
</script>

<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <h3>Thông tin người dùng</h3>
      <p><strong>Họ Tên:</strong> {{ user.userFullName }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Loại Người Dùng:</strong> {{ user.userType }}</p>
      <p><strong>Điện Thoại:</strong> {{ user.mobileNumber }}</p>
      <p><strong>Địa Chỉ:</strong> {{ user.address }}</p>
      <button @click="closeModal">Đóng</button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
}
</style>
