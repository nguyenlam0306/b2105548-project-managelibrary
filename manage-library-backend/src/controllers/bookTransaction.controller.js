import bookTransactionService from "../services/bookTransaction.service.js";

class BookTransactionController {
  static async addTransaction(req, res) {
    try {
      if (!req.body.isAdmin)
        return res.status(403).json("You are not allowed to add a Transaction");

      const transaction = await bookTransactionService.addTransaction(req.body);
      res.status(200).json(transaction);
    } catch (err) {
      res.status(504).json(err);
    }
  }

  static async getAllTransactions(req, res) {
    try {
      const transactions = await bookTransactionService.getAllTransactions();
      res.status(200).json(transactions);
    } catch (err) {
      res.status(504).json(err);
    }
  }

 static async updateTransaction(req, res) {
    try {
      if (!req.body.isAdmin) return res.status(403).json("Permission denied.");

      const updatedTransaction = await bookTransactionService.updateTransaction(
        req.params.id,
        req.body
      );
      res.status(200).json("Transaction details updated successfully");
    } catch (err) {
      res.status(504).json(err);
    }
  }

  static async deleteTransaction(req, res) {
    try {
      if (!req.body.isAdmin)
        return res
          .status(403)
          .json("You don't have permission to delete a transaction!");

      await bookTransactionService.deleteTransaction(req.params.id);
      res.status(200).json("Transaction deleted successfully");
    } catch (err) {
      res.status(504).json(err);
    }
  }
}

export default BookTransactionController;
