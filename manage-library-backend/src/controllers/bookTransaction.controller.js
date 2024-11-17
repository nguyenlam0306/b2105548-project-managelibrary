import bookTransactionService from "../services/bookTransaction.service.js";

class BookTransactionController {
  static async addTransaction(req, res) {
    try {     
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

      const updatedTransaction = await bookTransactionService.updateTransaction(
        req.params.id,
        req.body
      );
      res.status(200).json("Giao dịch được cập nhật thành công");
    } catch (err) {
      res.status(504).json(err);
    }
  }

  static async deleteTransaction(req, res) {
    try {     
      await bookTransactionService.deleteTransaction(req.params.id);
      res.status(200).json("Transaction deleted successfully");
    } catch (err) {
      res.status(504).json(err);
    }
  }

  static async updateTransactionStatus(req, res) {
    const transactionId = req.body.transactionId
    const followingStatus = req.body.transactionStatus
    const userId = req.userId
    try {
        const result = await bookTransactionService.updateTransactionStatus(
          transactionId,
          followingStatus,
          userId
        );
        res.status(200).json(result)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}
}

export default BookTransactionController;
