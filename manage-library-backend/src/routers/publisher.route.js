import express from "express";
import PublisherController from "../controllers/publisher.controller.js";

const router = express.Router();

router.get("/allpublishers", PublisherController.getAllPublishers);
router.get( "/getpublisher/:id",
  PublisherController.getPublisherById
);
router.post("/addpublisher", PublisherController.createPublisher);
router.put(
  "/updatepublisher/:id",
  PublisherController.updatePublisher
);
router.delete(
  "/deletepublisher/:id",
  PublisherController.deletePublisher
);

export default router;
