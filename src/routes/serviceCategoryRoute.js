import express from "express";
import serviceCategoryController from "../controllers/serviceCategoryController.js";
import { upload } from "../utils/uploadCloudinary.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/", serviceCategoryController.getAllServiceCategories);
router.post(
  "/",
  authMiddleware.authenticateToken,
  upload.single("image"),
  serviceCategoryController.createServiceCategory
);

router.put(
  "/:id",
  authMiddleware.authenticateToken,
  upload.single("image"),
  serviceCategoryController.updateServiceCategory
);

router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  serviceCategoryController.deleteServiceCategory
);

export default router;
