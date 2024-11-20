import { Server } from "socket.io";

export default function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  let onlineUsers = 0;

  io.on("connection", (socket) => {
     console.log("New client connected:", socket.id);
    io.emit("updateUserCount", onlineUsers);
    onlineUsers = onlineUsers + 1;

    socket.on("disconnect", () => {
      console.log("A user disconnected");
       onlineUsers = onlineUsers - 1;
       io.emit("updateUserCount", onlineUsers);
    });

    socket.on("transaction", () => {
      io.emit("updateTransaction");
    });

    socket.on("changeStatus", () => {
      io.emit("updateStatus");
    });
  });
}
