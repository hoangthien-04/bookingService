// routes/authRoutes.js
import express from "express";
const router = express.Router();

import validateRegister from "../middlewares/validateRegister.js";
import authController from "../controllers/authController.js";

// POST /api/auth/register → first chạy validateRegister, sau đó vào controller.registerUser
router.post("/register", validateRegister, authController.registerUser);

export default router;
