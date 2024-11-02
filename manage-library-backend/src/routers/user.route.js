import express from "express";
import UserController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/getuser/:id", UserController.getUserById);
router.get("/allusers", UserController.getAllUsers);
router.put("/updateuser/:id", UserController.updateUserById);
router.delete("/deleteuser/:id", UserController.deleteUserById);
router.put(
  "/:id/move-to-active-transactions",
  UserController.moveToActiveTransactions
);
router.put(
  "/:id/move-to-prev-transactions",
  UserController.moveToPrevTransactions
);

export default router;
