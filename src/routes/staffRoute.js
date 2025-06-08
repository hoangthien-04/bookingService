import express from "express";
import staffController from "../controllers/staffController.js";

const router = express.Router();

// API lấy danh sách 16 staff
router.get("/top-staffs", staffController.getRecommendedtaffs);

export default router;
