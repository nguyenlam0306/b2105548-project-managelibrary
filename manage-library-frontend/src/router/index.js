import { createRouter, createWebHistory } from "vue-router";
import AllBooks from "@/components/AllBooks.vue";
import About from "@/views/About.vue";
import { nextTick } from "vue";

import AdminDashboard from "../views/Dashboard/AdminDashboard.vue";
import { useAuthStore } from "@/stores/auth.store.js";
import AddBook from "@/components/AddBook.vue";
import Profile from "@/components/Profile.vue";
import UpdateBook from "@/components/UpdateBook.vue";
import Transactions from "@/components/Transactions.vue";
import ShowLibrary from "@/views/ShowLibrary.vue";
import Books from "@/components/Books.vue";
import Publishers from "@/components/Publishers.vue";
import Category from "@/components/Category.vue";
import AddTransaction from "@/components/AddTransaction.vue"
import Users from "@/components/Users.vue"
import ListUsers from "@/components/ListUsers.vue";
import AddUser from "@/components/AddUser.vue";
import EditUser from "@/components/EditUser.vue";
// import { component } from "vue/types/umd";
import ListReaders from "@/components/ListReaders.vue";

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
        component: Transactions,
        children: [
          {
            path: "/transactions/add",
            name: "Thêm giao dịch",
            component: AddTransaction,
          },
        ]
      },
      {
        path: "/publishers",
        name: "Nhà xuất bản",
        component: Publishers,
      },
      {
        path: "/categories",
        name: "Thể loại",
        component: Category,
      },
      {
        path: "/users",
        name: "Thành viên",
        component: Users,
        children: [          
          {
            path: "/users/all",
            name: "Danh sách",
            component: ListUsers,
          },
          {
            path: "/users/add",
            name: "Thêm users",
            component: AddUser,
          },
          {
            path: "/users/update/:id",
            name: "Hiệu chỉnh users",
            component: EditUser,
          },
          {
            path: "/readers/all",
            name: "Độc giả",
            component: ListReaders,
          }
        ]
      }
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
