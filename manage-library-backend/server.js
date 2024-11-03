import mongoose from "mongoose";
import app from "./app.js";
import http from 'http';
import initSocket from './src/socket/index.js'; // Đảm bảo đường dẫn chính xác

const server = http.createServer(app);
// console.log(server);
initSocket(server);

/* MongoDB connection */
const PORT = process.env.PORT || 8080;
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Ket noi Database thanh cong!");
  } catch (err) {
    console.error(err);
    process.exit();
  }
  server.listen(PORT, () => {
    console.log(`Server is listening at port: ${PORT}`);
  });
}

startServer();
