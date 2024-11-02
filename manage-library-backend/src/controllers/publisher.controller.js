import publisherService from "../services/publisher.service.js";

class PublisherController {
  // Lấy tất cả các nhà xuất bản
  static async getAllPublishers(req, res) {
    try {
      const publishers = await publisherService.getAllPublishers();
      res.status(200).json(publishers);
    } catch (error) {
      res.status(500).json({ error: "Cannot retrieve publishers" });
    }
  }

  // Lấy nhà xuất bản theo ID
  static async getPublisherById(req, res) {
    try {
      const publisher = await publisherService.getPublisherById(req.params.id);
      if (!publisher) {
        return res.status(404).json({ error: "Publisher not found" });
      }
      res.status(200).json(publisher);
    } catch (error) {
      res.status(500).json({ error: "Cannot retrieve publisher" });
    }
  }

  // Tạo mới một nhà xuất bản
  static async createPublisher(req, res) {
    try {
      const publisherData = { publisherID: req.body.publisherID,  publisherName: req.body.publisherName, address: req.body.address };

      const publisher = await publisherService.createPublisher(publisherData);
      res.status(201).json(publisher);
    } catch (error) {
      res.status(500).json({ error: "Cannot create publisher" });
    }
  }

  // Cập nhật nhà xuất bản theo ID
  static async updatePublisher(req, res) {
    try {
      const publisher = await publisherService.updatePublisher(
        req.params.id,
        req.body
      );
      if (!publisher) {
        return res.status(404).json({ error: "Publisher not found" });
      }
      res.status(200).json(publisher);
    } catch (error) {
      res.status(500).json({ error: "Cannot update publisher" });
    }
  }

  // Xóa nhà xuất bản theo ID
  static async deletePublisher(req, res) {
    try {
      const publisher = await publisherService.deletePublisher(req.params.id);
      if (!publisher) {
        return res.status(404).json({ error: "Publisher not found" });
      }
      res.status(200).json({ message: "Publisher deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Cannot delete publisher" });
    }
  }
}

// Tạo instance duy nhất của PublisherController
export default PublisherController;
