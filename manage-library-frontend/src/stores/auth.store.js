// src/stores/authStore.js
import { defineStore } from "pinia";
import { ref, watch } from "vue";

// Định nghĩa store với Pinia
export const useAuthStore = defineStore("auth", () => {
  // Trạng thái khởi tạo
  const user = ref(JSON.parse(localStorage.getItem("user")) || null);
  const isFetching = ref(false);
  const error = ref(null);

  // Action đăng nhập
  function loginStart() {
    isFetching.value = true;
    error.value = null;
  }

  function loginSuccess(userData) {
    user.value = userData;
    isFetching.value = false;
  }

  function loginFailure(errorMsg) {
    user.value = null;
    isFetching.value = false;
    error.value = errorMsg;
  }

  // Theo dõi trạng thái user và lưu vào localStorage khi thay đổi
  watch(user, (newUser) => {
    localStorage.setItem("user", JSON.stringify(newUser));
  });

  return {
    user,
    isFetching,
    error,
    loginStart,
    loginSuccess,
    loginFailure,
  };
});
