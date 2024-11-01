import express from "express";
import BookCategoryController from "../controllers/bookCategory.controller.js";

const router = express.Router();

router.get("/allcategories", BookCategoryController.getAllCategories);
router.post("/addcategory", BookCategoryController.addCategory);

export default router;
