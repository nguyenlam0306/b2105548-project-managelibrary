import { Server } from "socket.io";

export default function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("A new connection");

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });

    socket.on("updatebook", () => {
      io.emit("updateBook");
    });

    socket.on("changeStatus", () => {
      io.emit("updateStatus");
    });
  });
}
