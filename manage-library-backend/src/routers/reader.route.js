import express from "express";
import ReaderController from "../controllers/reader.controller.js";

const router = express.Router();

// Thêm mới reader
router.post("/add", ReaderController.addReader);

// Lấy tất cả readers
router.get("/all", ReaderController.getAllReaders);

// Lấy thông tin reader theo ID
router.get("/:id", ReaderController.getReaderById);

// Cập nhật reader theo ID
router.put("/update/:id", ReaderController.updateReader);

// Xóa reader theo ID
router.delete("/delete/:id", ReaderController.deleteReader);

export default router;
