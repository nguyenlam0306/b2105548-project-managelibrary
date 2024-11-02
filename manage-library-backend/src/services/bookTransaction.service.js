import Book from "../models/book.model.js";
import BookTransaction from "../models/bookTransaction.model.js";

class BookTransactionService {
  async addTransaction(data) {
    const newTransaction = new BookTransaction(data);
    const transaction = await newTransaction.save();
    const book = await Book.findById(data.bookId);
    await book.updateOne({ $push: { transactions: transaction._id } });
    return transaction;
  }

  async getAllTransactions() {
    return await BookTransaction.find({}).sort({ _id: -1 });
  }

  async updateTransaction(id, data) {
    return await BookTransaction.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
  }

  async deleteTransaction(id) {
    const transaction = await BookTransaction.findByIdAndDelete(id);
    const book = await Book.findById(transaction.bookId);
    await book.updateOne({ $pull: { transactions: id } });
    return transaction;
  }
}

export default new BookTransactionService();
