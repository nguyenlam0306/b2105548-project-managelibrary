import BookCategory from "../models/BookCategory.js";

class BookCategoryService {
  async getAllCategories() {
    return await BookCategory.find({});
  }

  async addCategory(categoryData) {
    const newCategory = new BookCategory({
      categoryName: categoryData.categoryName,
    });
    return await newCategory.save();
  }
}

export default new BookCategoryService();
