import ReaderService from "../services/reader.service.js";

class ReaderController {
  // Tạo mới một reader
  async addReader(req, res) {
    try {
      const newReader = await ReaderService.addReader(req.body);
      res.status(201).json(newReader);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Lấy tất cả readers
  async getAllReaders(req, res) {
    try {
      const readers = await ReaderService.getAllReaders();
      res.status(200).json(readers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Lấy thông tin một reader theo ID
  async getReaderById(req, res) {
    try {
      const reader = await ReaderService.getReaderById(req.params.id);
      if (!reader) {
        return res.status(404).json({ message: "Reader not found" });
      }
      res.status(200).json(reader);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Cập nhật thông tin một reader
  async updateReader(req, res) {
    try {
      const updatedReader = await ReaderService.updateReader(
        req.params.id,
        req.body
      );
      if (!updatedReader) {
        return res.status(404).json({ message: "Reader not found" });
      }
      res.status(200).json(updatedReader);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Xóa một reader
  async deleteReader(req, res) {
    try {
      const deletedReader = await ReaderService.deleteReader(req.params.id);
      if (!deletedReader) {
        return res.status(404).json({ message: "Reader not found" });
      }
      res.status(200).json({ message: "Reader has been deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new ReaderController();
