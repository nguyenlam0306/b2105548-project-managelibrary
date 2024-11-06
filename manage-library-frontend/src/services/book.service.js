// src/services/BookService.js
import createAxiosInstance from "./api.service";

const API_URL = import.meta.env.VUE_APP_API_URL;
const axiosInstance = createAxiosInstance(API_URL);

export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get("api/categories/all");
    return response.data.map((category) => ({
      value: category._id,
      label: category.categoryName,
    }));
  } catch (err) {
    console.error(err);
  }
};

export const fetchPublishers = async () => {
  try {
    const response = await axiosInstance.get("api/publishers/all");
    return response.data.map((publisher) => ({
      value: publisher._id,
      label: publisher.publisherName,
    }));
  } catch (err) {
    console.error(err);
  }
};

export const addBook = async (BookData) => {
  try {
    const response = await axiosInstance.post("api/books/add", BookData);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchRecentBooks = async () => {
  try {
    const response = await axiosInstance.get("api/books/all");
    return response.data.slice(0, 5);
  } catch (err) {
    console.error(err);
  }
};
