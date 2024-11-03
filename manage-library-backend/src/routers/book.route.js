import express from "express";
import BookController from "../controllers/book.controller.js";

const router = express.Router();

// Tạo một instance của BookController
const bookController = new BookController();

router.get("/all", bookController.getAllBooks.bind(bookController));
router.get("/:id", bookController.getBookById.bind(bookController));
router.get("/", bookController.getBooksByCategory.bind(bookController));
router.post("/add", bookController.addBook.bind(bookController));
router.put("/update/:id", bookController.updateBook.bind(bookController));
router.delete(
  "/delete/:id",
  bookController.deleteBook.bind(bookController)
);

// Route tìm kiếm sách theo tiêu đề
router.get("/search", bookController.searchBooksByTitle.bind(bookController));

export default router;
