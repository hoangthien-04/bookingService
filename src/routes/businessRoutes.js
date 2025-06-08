import express from "express";
import validateBusiness from "../middlewares/validateBusiness.js";
import bussinessController from "../controllers/businessController.js";
import { upload } from "../utils/uploadCloudinary.js";
const router = express.Router();

router.post(
  "/",
  upload.single("logo"),
  validateBusiness,
  bussinessController.createBusiness
);

export default router;
