import express from "express";
import BookCategoryController from "../controllers/bookCategory.controller.js";

const router = express.Router();

// Tạo một instance của BookCategoryController
const bookCategoryController = new BookCategoryController();

router.get(
  "/all",
  bookCategoryController.getAllCategories.bind(bookCategoryController)
);
router.post(
  "/add",
  bookCategoryController.addCategory.bind(bookCategoryController)
);

export default router;
