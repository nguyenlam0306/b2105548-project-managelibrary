import * as publisherService from "../services/publisher.service.js";

export const getAllPublishers = async (req, res) => {
  try {
    const publishers = await publisherService.getAllPublishers();
    res.status(200).json(publishers);
  } catch (error) {
    res.status(500).json({ error: "Cannot retrieve publishers" });
  }
};

export const getPublisherById = async (req, res) => {
  try {
    const publisher = await publisherService.getPublisherById(req.params.id);
    if (!publisher)
      return res.status(404).json({ error: "Publisher not found" });
    res.status(200).json(publisher);
  } catch (error) {
    res.status(500).json({ error: "Cannot retrieve publisher" });
  }
};

export const createPublisher = async (req, res) => {
  try {
    const publisher = await publisherService.createPublisher(req.body);
    res.status(201).json(publisher);
  } catch (error) {
    res.status(500).json({ error: "Cannot create publisher" });
  }
};

export const updatePublisher = async (req, res) => {
  try {
    const publisher = await publisherService.updatePublisher(
      req.params.id,
      req.body
    );
    if (!publisher)
      return res.status(404).json({ error: "Publisher not found" });
    res.status(200).json(publisher);
  } catch (error) {
    res.status(500).json({ error: "Cannot update publisher" });
  }
};

export const deletePublisher = async (req, res) => {
  try {
    const publisher = await publisherService.deletePublisher(req.params.id);
    if (!publisher)
      return res.status(404).json({ error: "Publisher not found" });
    res.status(200).json({ message: "Publisher deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Cannot delete publisher" });
  }
};
