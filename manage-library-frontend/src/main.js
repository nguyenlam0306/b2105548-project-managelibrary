import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
// import { BootstrapVue3 } from "bootstrap-vue";
import router from "./router"; // Đường dẫn đến cấu hình router
import { useAuthStore } from "./stores/auth.store";
import "./assets/main.css"; // Import CSS tùy chọn từ thư mục assets
import "bootstrap/dist/css/bootstrap.min.css"; // CSS Bootstrap
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";



// Tạo ứng dụng Vue
const app = createApp(App);
const pinia = createPinia();
// app.use(BootstrapVue3);
app.use(pinia);

// Sử dụng router và store (nếu có)
app.use(router);
 try {
   const authStore = useAuthStore();
 } catch (error) {
   console.log("Lỗi xác thực đăng nhập");
 }

// Mount ứng dụng vào phần tử có id="app" trong `index.html`
app.mount("#app");
