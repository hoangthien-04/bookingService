import express from "express";
import serviceCategoryController from "../controllers/serviceCategoryController.js";
import { upload } from "../utils/uploadCloudinary.js";
const router = express.Router();

router.get("/", serviceCategoryController.getAllServiceCategories);
router.post(
  "/",
  upload.single("image"),
  serviceCategoryController.createServiceCategory
);

router.put(
  "/:id",
  upload.single("image"),
  serviceCategoryController.updateServiceCategory
);

router.delete(
  "/:id",
  serviceCategoryController.deleteServiceCategory
);

export default router;
