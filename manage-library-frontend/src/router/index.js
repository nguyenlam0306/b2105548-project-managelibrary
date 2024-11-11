import { createRouter, createWebHistory } from "vue-router";
import AllBooks from "@/components/AllBooks.vue";
import About from "@/views/About.vue";
import { nextTick } from "vue";

import AdminDashboard from "../views/Dashboard/AdminDashboard.vue";
// import MemberDashboard from "@/views/Dashboard/MemberDashboard.vue";
import { useAuthStore } from "@/stores/auth.store.js";
import AddBook from "@/components/AddBook.vue";
import RecentAddedBooks from "@/components/RecentAddedBooks.vue";
import Profile from "@/components/Profile.vue";
import UpdateBook from "@/components/UpdateBook.vue";
import AllTransactions from "@/components/AllTransactions.vue";
import AddTransaction from "@/components/AddTransaction.vue";
import ShowLibrary from "@/views/ShowLibrary.vue";
import Books from "@/components/Books.vue";

const routes = [
  { path: "/", name: "Home", component: () => import("../views/Home.vue") },
  {
    path: "/dashboard@admin",
    name: "Admin Dashboard",
    component: AdminDashboard,
    meta: {
      requireAuth: true,
    },
    redirect: { path: "/profile" },
    children: [
      {
        path: "/profile",
        name: "Profile",
        component: Profile,
      },
      {
        path: "/books",
        name: "Sách",
        component: Books,
        children: [
          {
            path: "/books/all",
            name: "List Sách",
            component: AllBooks,
          },
          {
            path: "/books/addbook",
            name: "Add Book",
            component: AddBook,
          },
          {
            path: "/books/update/:id",
            name: "Update Book",
            component: UpdateBook,
          },
        ],
      },
      {
        path: "/transactions",
        name: "Giao dịch",
        children: [
          {
            path: "/transactions/all",
            name: "All transactions",
            component: AllTransactions,
          },
          {
            path: "/transactions/add",
            name: "Add Transaction",
            component: AddTransaction,
          },         
        ],
      },
    ],
  },
  { path: "/showlibrary", name: "Library", component: ShowLibrary },
  {
    path: "/signin",
    name: "Sign in",
    meta: {
      requireAuth: false,
    },
    component: () => import("../views/Signin.vue"),
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
