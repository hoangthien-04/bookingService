import express from 'express';
import locationController from '../controllers/locationController.js';
import authMiddleware from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router.post('/',authMiddleware.authenticateToken, locationController.createLocation);
router.get('/top-locations/:cityCode', authMiddleware.authenticateOptional, locationController.getRecommendedLocations);

export default router;
