import Book from "../models/book.model.js"; 
import BookCategory from "../models/bookCategory.model.js";

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
      transactions: bookData.transactions || [],
    });
    const savedBook = await newBook.save();
    await BookCategory.updateMany(
      { _id: savedBook.categories },
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

    await book.remove();
    await BookCategory.updateMany(
      { _id: book.categories },
      { $pull: { books: book._id } }
    );
    return "Book has been deleted";
  }
  async searchBooksByTitle(title) {
    return await Book.find({ $text: { $search: title } });
  }
}

export default new BookService();
