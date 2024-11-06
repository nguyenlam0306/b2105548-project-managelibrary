// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Signin from "../views/Signin.vue";
import AllBooks from "../views/AllBooks.vue";
import MemberDashboard from "../views/Dashboard/MemberDashboard.vue";
import AdminDashboard from "../views/Dashboard/AdminDashboard.vue";
import { useAuthStore } from "../stores/auth.store.js";

const routes = [
  { path: "/", component: Home },
  {
    path: "/signin",
    component: Signin,
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.user) {
        if (authStore.user.isAdmin) {
          next("/dashboard@admin");
        } else {
          next("/dashboard@member");
        }
      } else {
        next();
      }
    },
  },
  {
    path: "/dashboard@member",
    component: MemberDashboard,
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.user && !authStore.user.isAdmin) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/dashboard@admin",
    component: AdminDashboard,
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.user && authStore.user.isAdmin) {
        next();
      } else {
        next("/");
      }
    },
  },
  { path: "/books", component: AllBooks },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
