import express from "express";
import BookTransactionController from "../controllers/bookTransaction.controller.js";

const router = express.Router();

// Các route cho book transactions
router.post(
  "/add-transaction",
  BookTransactionController.addTransaction
);
router.get(
  "/all-transactions",
  BookTransactionController.getAllTransactions
);
router.put(
  "/update-transaction/:id",
  BookTransactionController.updateTransaction
);
router.delete(
  "/remove-transaction/:id",
  BookTransactionController.deleteTransaction
);

export default router;
