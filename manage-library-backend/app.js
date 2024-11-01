import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/users.js";
import bookRoutes from "./routes/books.route.js";
import transactionRoutes from "./routes/bookTransactions.route.js";
import categoryRoutes from "./routes/bookCategory.js";

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

/* Test Route */
app.get("/", (req, res) => {
  res.status(200).send("Welcome to LibraryApp");
});

export default app;
