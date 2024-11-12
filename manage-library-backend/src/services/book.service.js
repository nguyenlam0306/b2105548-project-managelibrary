import Book from "../models/book.model.js"; 
import BookCategory from "../models/bookCategory.model.js";
import Publisher from "../models/publisher.model.js"
//  const ObjectId = require("mongoose").Types.ObjectId;
class BookService {
  async getAllBooks() {
    return await Book.find({}).populate("transactions").sort({ _id: -1 });
  }

  async getBookById(id) {
    return await Book.findById(id).populate("transactions");
  }

  async getBooksByCategory(categoryName) {
    return await BookCategory.findOne({ categoryName }).populate("books");
  }
  async getBookByPublisher(publisherName) {
    return await Publisher.findOne({ publisherName }).populate("books");
  }

  async addBook(bookData) {
    const newBook = new Book({
      title: bookData.title,
      bookID: bookData.bookID,
      price: bookData.price,
      quantity: bookData.quantity,
      publicationYear: bookData.publicationYear,
      publisher: bookData.publisher,
      author: bookData.author,
      bookStatus: bookData.bookStatus || "Available", // Giá trị mặc định nếu không được cung cấp
      categories: bookData.categories,
    });
    const savedBook = await newBook.save();
    await BookCategory.findOneAndUpdate(
      {
        _id: bookData.categories,
      },
      {
        $push: { books: savedBook._id },
      }
    );
    await Publisher.findOneAndUpdate(
      {
        _id: bookData.publisher,
      },
      { $push: { books: savedBook._id } }
    );
    return savedBook;
  }

  async updateBook(id, updateData) {
    return await Book.findByIdAndUpdate(id, { $set: updateData });
  }

  async deleteBook(id) {
    const book = await Book.findById(id);
    if (!book) throw new Error("Book not found");

    // Xóa sách
    await Book.findByIdAndDelete(id);

    try {
      await BookCategory.updateMany(
        { _id: book.categories },
        { $pull: { books: book._id } }
      );
    } catch (error) {
      throw new Error("Thất bại khi thay đổi " + error.message);
    }

    return "Sách đã được xóa";
  }
  async searchBooksByTitle(title) {
    return await Book.find({ $text: { $search: title } });
  }
}

export default new BookService();
