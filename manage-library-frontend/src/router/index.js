import { createRouter, createWebHistory } from "vue-router";
import AllBooks from "@/views/AllBooks.vue";
import About from "@/views/About.vue"
import { nextTick } from "vue";

// import MemberDashboard from "@/views/Dashboard/MemberDashboard.vue";
// import AdminDashboard from "@/views/Dashboard/AdminDashboard.vue";
import { useAuthStore } from "@/stores/auth.store.js";

const routes = [
  { path: "/", name: "Home", component: () => import("../views/Home.vue") },
  // {
  //   path: "/signin",
  //   component: Signin,
  //   beforeEnter: (to, from, next) => {
  //     const authStore = useAuthStore();
  //     if (authStore.user) {
  //       if (authStore.user.isAdmin) {
  //         next("/dashboard@admin");
  //       } else {
  //         next("/dashboard@member");
  //       }
  //     } else {
  //       next();
  //     }
  //   },
  // },
  // {
  //   path: "/dashboard@member",
  //   component: MemberDashboard,
  //   beforeEnter: (to, from, next) => {
  //     const authStore = useAuthStore();
  //     if (authStore.user && !authStore.user.isAdmin) {
  //       next();
  //     } else {
  //       next("/");
  //     }
  //   },
  // },
  // {
  //   path: "/dashboard@admin",
  //   component: AdminDashboard,
  //   beforeEnter: (to, from, next) => {
  //     const authStore = useAuthStore();
  //     if (authStore.user && authStore.user.isAdmin) {
  //       next();
  //     } else {
  //       next("/");
  //     }
  //   },
  // },
  { path: "/books", name: "Books", component: AllBooks },
  {
    path: "/signin",
    name: "Signin",
    meta: {
      requireAuth: false,
    },
    component: () => import("../views/Signin.vue")
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  if (to.meta.requireAuth && !authStore.user) {
    authStore.returnURL = to.fullPath;
    return {
      path: "/signin",
    };
  }
});
router.afterEach((to, from) => {
  nextTick(() => {
    document.title = to.name;
  });
});
export default router;
