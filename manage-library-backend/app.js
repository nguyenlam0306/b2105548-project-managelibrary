import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routers/auth.route.js";
import userRoutes from "./src/routers/user.route.js";
import bookRoutes from "./src/routers/book.route.js";
import publisherRoutes from "./src/routers/publisher.route.js";
import transactionRoutes from "./src/routers/bookTransaction.route.js";
import readerRoutes from "./src/routers/reader.route.js";
import categoryRoutes from "./src/routers/bookCategory.route.js";


/* App Config */
dotenv.config();
const app = express();

/* Middlewares */
app.use(express.json());
app.use(cors());

/* API Routes */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/publishers", publisherRoutes);
app.use("/api/readers", readerRoutes);

/* Test Route */
app.get("/", (req, res) => {
  res.status(200).send("Welcome to LibraryApp");
});

/* 404 Not Found Middleware */
app.use((req, res) => {
  res.status(404).json({ message: "404 Not Found" });
});

export default app;
