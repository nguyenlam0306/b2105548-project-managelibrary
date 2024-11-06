import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/index";
import { useAuthStore } from "./stores/auth.store";
import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

const authStore = useAuthStore(); // Khởi tạo store không cần try-catch
app.mount("#app");
