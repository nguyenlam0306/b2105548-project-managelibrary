import Publisher from "../models/publisher.model.js";

class PublisherService {
  // Lấy tất cả các nhà xuất bản
   async getAllPublishers() {
    return await Publisher.find({});
  }

  // Lấy nhà xuất bản theo ID
   async getPublisherById(id) {
    return await Publisher.findById(id);
  }

  // Tạo mới một nhà xuất bản
   async createPublisher(data) {
    const newPublisher = new Publisher({
      publisherID: data.publisherID,
      publisherName: data.publisherName,
      address: data.address,
    });
    return await newPublisher.save();
  }

  // Cập nhật nhà xuất bản theo ID
   async updatePublisher(id, data) {
    return await Publisher.findByIdAndUpdate(id, data, { new: true });
  }

  // Xóa nhà xuất bản theo ID
   async deletePublisher(id) {
    return await Publisher.findByIdAndDelete(id);
  }
}

export default new PublisherService();
