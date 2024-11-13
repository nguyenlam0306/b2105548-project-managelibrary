import BookService from "../services/book.service.js"

class BookController {
  async getAllBooks(req, res) {
    try {
      const books = await BookService.getAllBooks();
      res.status(200).json(books);
    } catch (err) {
      res.status(504).json(err);
    }
  }

  async getBookById(req, res) {
    try {
      const book = await BookService.getBookById(req.params.id);
      res.status(200).json(book);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async getBooksByCategory(req, res) {
    const category = req.query.category;
    try {
      const books = await BookService.getBooksByCategory(category);
      res.status(200).json(books);
    } catch (err) {
      res.status(504).json(err);
    }
  }

  async addBook(req, res) { 
try {
  // Kiểm tra dữ liệu từ frontend
  const {
    title,
    bookID,
    price,
    quantity,
    publicationYear,
    publisher,
    author,
    bookStatus,
    categories,
    transactions,
  } = req.body;

  // Kiểm tra nếu thiếu các trường bắt buộc
  if (
    !title ||
    !bookID ||
    !price ||
    !quantity ||
    !publicationYear ||
    !publisher ||
    !author
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Tạo object bookData từ req.body
  const bookData = {
    title,
    bookID,
    price,
    quantity,
    publicationYear,
    publisher,
    author,
    bookStatus: bookStatus || "Available",
    categories,
    transactions,
  };

  // Gọi hàm addBook từ BookService để lưu sách
  const book = await BookService.addBook(bookData);

  // Trả về kết quả
  return res.status(200).json({ message: "Book added successfully", book });
} catch (err) {
  console.error("Error adding book:", err);
  return res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
}
      }
   
  

  async updateBook(req, res) {   
      try {
        await BookService.updateBook(req.params.id, req.body);
        res.status(200).json("Book details updated successfully");
      } catch (err) {
        res.status(504).json(err);
      }
    
  }

  async deleteBook(req, res) {
    
      try {
        const result = await BookService.deleteBook(req.params.id);
        res.status(200).json(result);
      } catch (err) {
        res.status(504).json(err);
      }   
  }

  // Thêm phương thức tìm kiếm sách theo tiêu đề
  async searchBooksByTitle(req, res) {
    try {
      const books = await BookService.searchBooksByTitle(req.query.title);
      res.status(200).json(books);
    } catch (err) {
      res.status(504).json(err);
    }
  }
}

export default BookController;
