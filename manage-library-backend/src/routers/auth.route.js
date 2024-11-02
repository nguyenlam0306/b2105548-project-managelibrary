import express from "express";
import AuthController from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/register", AuthController.register.bind(AuthController));
authRoutes.post("/signin", AuthController.login.bind(AuthController));

export default authRoutes;
