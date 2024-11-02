import express from "express";
import BookCategoryController from "../controllers/bookCategory.controller.js";

const router = express.Router();

// Tạo một instance của BookCategoryController
const bookCategoryController = new BookCategoryController();

router.get(
  "/allcategories",
  bookCategoryController.getAllCategories.bind(bookCategoryController)
);
router.post(
  "/addcategory",
  bookCategoryController.addCategory.bind(bookCategoryController)
);

export default router;
