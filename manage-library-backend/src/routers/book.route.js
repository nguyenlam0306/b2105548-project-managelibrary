import express from "express"
import BookController from "../controllers/book.controller.js"

const router = express.Router();

router.get("/allbooks", BookController.getAllBooks);
router.get("/getbook/:id", BookController.getBookById);
router.get("/", BookController.getBooksByCategory);
router.post("/addbook", BookController.addBook);
router.put("/updatebook/:id", BookController.updateBook);
router.delete("/removebook/:id", BookController.deleteBook);

// Route tìm kiếm sách theo tiêu đề
router.get("/search", BookController.searchBooksByTitle);

export default router;
