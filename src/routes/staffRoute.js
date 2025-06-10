import express from "express";
import staffController from "../controllers/staffController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware.authenticateToken, staffController.createStaff);
// API lấy danh sách 16 staff
router.get(
  "/top-staffs/:cityCode",
  authMiddleware.authenticateOptional,
  staffController.getRecommendedtaffs
);
router.get("/:staffId", staffController.getStaffById);

export default router;
