import express from "express";
import BookTransactionController from "../controllers/bookTransaction.controller.js";

const router = express.Router();

// Các route cho book transactions
router.post(
  "/add",
  BookTransactionController.addTransaction
);
router.get(
  "/all",
  BookTransactionController.getAllTransactions
);
router.put(
  "/update/:id",
  BookTransactionController.updateTransaction
);
router.delete(
  "/delete/:id",
  BookTransactionController.deleteTransaction
);
router.put("/updateStatus", BookTransactionController.updateTransactionStatus);

export default router;
