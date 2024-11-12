import Book from "../models/book.model.js";
import BookTransaction from "../models/bookTransaction.model.js";
import Reader from "../models/reader.model.js"

class BookTransactionService {
  async addTransaction(data) {
    const newTransaction = new BookTransaction(data);
    const transaction = await newTransaction.save();
    const book = await Book.findById(data.bookId);
    const reader = await Reader.findById(data.borrowerName);

    await book.updateOne({ $push: { transactions: transaction._id } });
    await reader.updateOne({ $push: { transactions: transaction._id } });
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
    //  const reader = await Reader.findById(data.borrowerId);
    await book.updateOne({ $pull: { transactions: id } });
    //  await reader.updateOne({ $push: { transactions: transaction._id } });
    return transaction;
  }
  async updateTransactionStatus(transactionId, status, staffId) {
    return await BookTransaction.findOneAndUpdate(
      {
        _id: ObjectId.isValid(transactionId) ? new ObjectId(transactionId) : "",
      },
      {
        transactionStatus: status,
        borrowerId: staffId,
        returnDate: Date.now(),
      }
    );
  }
}

export default new BookTransactionService();
