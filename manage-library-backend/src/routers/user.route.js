import express from "express";
import UserController from "../controllers/user.controller.js";
import checkAdmin from '../middlewares/checkAdmin.middleware.js';

const router = express.Router();
router.get("/all", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.put("/update/:id", UserController.updateUserById);
router.delete("/delete/:id", UserController.deleteUserById);

export default router;
