import express from "express";
import favoriteController from "../controllers/favoriteController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware.authenticateToken, favoriteController.userfavorite);

export default router;
