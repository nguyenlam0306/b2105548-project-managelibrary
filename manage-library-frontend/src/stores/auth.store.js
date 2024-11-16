// src/stores/auth.store.js
import { defineStore } from "pinia";
import router from "../router"
import authService from "@/services/auth.service";

// Định nghĩa store với Pinia
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    returnURL: null,
  }),
  actions: {
    async login(user) {
      this.user = await authService.login(user);
      localStorage.setItem("user", JSON.stringify(this.user));    
        router.push(this.returnURL || "/dashboard@admin");      
      return this.user;
    },
  },
});
