import express from "express";
import PublisherController from "../controllers/publisher.controller.js";

const router = express.Router();

router.get("/all", PublisherController.getAllPublishers);
router.get( "/:id",
  PublisherController.getPublisherById
);
router.post("/add", PublisherController.createPublisher);
router.put(
  "/update/:id",
  PublisherController.updatePublisher
);
router.delete(
  "/delete/:id",
  PublisherController.deletePublisher
);

export default router;
