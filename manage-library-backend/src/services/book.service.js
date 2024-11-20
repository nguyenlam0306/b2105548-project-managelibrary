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
  async getBookByPublisher(publisherId) {
   try {
     // Tìm sách theo publisherId
     const publisher = await Publisher.findById(publisherId).populate(
       "books"
     );
     if (!publisher) {
       throw new Error("Không tìm thấy nhà xuất bản!");
     }
     return publisher.books;
   } catch (error) {
     throw new Error("Lỗi khi lấy danh sách sách: " + error.message);
   }
  }

  async addBook(bookData) {
    console.log(bookData)
    try {
      // Tạo một instance của Book từ bookData
      const newBook = new Book(bookData);

      // Lưu vào MongoDB
      const savedBook = await newBook.save();

      // Cập nhật danh sách sách cho Category và Publisher
      if (bookData.categories) {
        await BookCategory.findByIdAndUpdate(bookData.categories, {
          $push: { books: savedBook._id },
        });
      }

      if (bookData.publisher) {
        await Publisher.findByIdAndUpdate(bookData.publisher, {
          $push: { books: savedBook._id },
        });
      }

      return savedBook;
    } catch (error) {
      throw new Error("Error saving book: " + error.message);
    }
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
