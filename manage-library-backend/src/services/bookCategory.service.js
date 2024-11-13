import BookCategory from "../models/bookCategory.model.js";

class BookCategoryService {
  async getAllCategories() {
    return await BookCategory.find({});
  }
  async getCategoryById(id) {
    return await BookCategory.findById(id);
  }
  async addCategory(categoryData) {
    const newCategory = new BookCategory({
      categoryName: categoryData.categoryName,
    });
    return await newCategory.save();
  }
}

export default new BookCategoryService();
