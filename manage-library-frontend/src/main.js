import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "./router";

import { useAuthStore } from "./stores/auth.store";
import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

app.use(VueSweetalert2);
const authStore = useAuthStore(); // Khởi tạo store không cần try-catch
app.mount("#app");
