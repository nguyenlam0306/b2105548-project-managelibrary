import { defineStore } from "pinia";
import { io } from "socket.io-client";

const VUE_APP_SOCKET_ENDPOINT = "http://localhost:4000";

export const useSocketStore = defineStore({
  id: "Socket",
  state: () => ({
    io: null,
    onlineUsers:0,
  }),
  actions: {
    async connect() {
      this.io = io(VUE_APP_SOCKET_ENDPOINT);
      // Lắng nghe sự kiện từ server
      this.io.on("updateUserCount", (count) => {
        this.onlineUsers = count;
      });
    },

    async disconnect() {
      this.io.disconnect();
    },
  },
});
