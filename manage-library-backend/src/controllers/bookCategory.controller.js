import BookCategoryService from "../services/bookCategory.service.js";

class BookCategoryController {
  async getAllCategories(req, res) {
    try {
      const categories = await BookCategoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (err) {
      res.status(504).json(err);
    }
  }

  async addCategory(req, res) {
    try {
      const categoryData = { categoryName: req.body.categoryName };
      const category = await BookCategoryService.addCategory(categoryData);
      res.status(200).json(category);
    } catch (err) {
      res.status(504).json(err);
    }
  }
}

export default BookCategoryController;
