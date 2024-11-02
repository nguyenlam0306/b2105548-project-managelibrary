import Reader from "../models/reader.model.js";

class ReaderService {
  // Thêm mới một reader
  async addReader(data) {
    const newReader = new Reader(data);
    return await newReader.save();
  }

  // Lấy tất cả reader
  async getAllReaders() {
    return await Reader.find({}).populate("transactions");
  }

  // Lấy thông tin một reader theo ID
  async getReaderById(id) {
    return await Reader.findById(id).populate("transactions");
  }

  // Cập nhật thông tin reader
  async updateReader(id, data) {
    return await Reader.findByIdAndUpdate(id, data, { new: true });
  }

  // Xóa reader
  async deleteReader(id) {
    return await Reader.findByIdAndDelete(id);
  }
}

export default new ReaderService();
