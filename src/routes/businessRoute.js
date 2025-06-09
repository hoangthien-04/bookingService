import express from "express";
import validateBusiness from "../middlewares/validateBusiness.js";
import bussinessController from "../controllers/businessController.js";
import { upload } from "../utils/uploadCloudinary.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post(
  "/",
  authMiddleware.authenticateToken,
  upload.single("logo"),
  validateBusiness,
  bussinessController.createBusiness
);

export default router;
