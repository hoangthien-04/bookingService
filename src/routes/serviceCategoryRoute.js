import express from "express";
import serviceCategoryController from "../controllers/serviceCategoryController.js";

const router = express.Router();

router.post("/", serviceCategoryController.createServiceCategory);

export default router;
