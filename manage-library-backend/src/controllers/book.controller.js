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
    if (req.body.isAdmin) {
      try {
        const bookData = {
          title: req.body.title,
          bookID: req.body.bookID,
          price: req.body.price,
          quantity: req.body.quantity,
          publicationYear: req.body.publicationYear,
          publisher: req.body.publisher,
          author: req.body.author,
          bookStatus: req.body.bookStatus,
          categories: req.body.categories,
          transactions: req.body.transactions,
        };
        const book = await BookService.addBook(bookData);
        res.status(200).json(book);
      } catch (err) {
        res.status(504).json(err);
      }
    } else {
      res.status(403).json("You don't have permission to add a book!");
    }
  }

  async updateBook(req, res) {
    if (req.body.isAdmin) {
      try {
        await BookService.updateBook(req.params.id, req.body);
        res.status(200).json("Book details updated successfully");
      } catch (err) {
        res.status(504).json(err);
      }
    } else {
      res.status(403).json("You don't have permission to update this book!");
    }
  }

  async deleteBook(req, res) {
    if (req.body.isAdmin) {
      try {
        const result = await BookService.deleteBook(req.params.id);
        res.status(200).json(result);
      } catch (err) {
        res.status(504).json(err);
      }
    } else {
      res.status(403).json("You don't have permission to delete a book!");
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

export default new BookController();
