import express from "express";
import UserController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:id", UserController.getUserById);
router.get("/all", UserController.getAllUsers);
router.put("/update/:id", UserController.updateUserById);
router.delete("/delete/:id", UserController.deleteUserById);
router.put(
  "/:id/move-to-active-transactions",
  UserController.moveToActiveTransactions
);
router.put(
  "/:id/move-to-prev-transactions",
  UserController.moveToPrevTransactions
);

export default router;
