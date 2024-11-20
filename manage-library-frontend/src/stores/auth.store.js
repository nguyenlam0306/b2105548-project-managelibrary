// src/stores/auth.store.js
import { defineStore } from "pinia";
import router from "../router"
import authService from "@/services/auth.service";

// Định nghĩa store với Pinia
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    isAdmin: JSON.parse(localStorage.getItem("isAdmin")),
    returnURL: null,
  }),
  actions: {
    async login(user) {
      this.user = await authService.login(user);
      console.log(this.user.isAdmin)
      localStorage.setItem("user", JSON.stringify(this.user));
      localStorage.setItem("isAdmin", JSON.stringify(this.user.isAdmin));    
      router.push(this.returnURL || "/dashboard@admin");
      return this.user;
    },
  },
});
