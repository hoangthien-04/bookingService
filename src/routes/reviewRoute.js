import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import reviewController from '../controllers/reviewController.js';

const router = express.Router();

// POST /api/review
// body: { appointmentId, subType, subId, content, rate }
router.post('/', authMiddleware.authenticateToken, reviewController.createReview);

export default router;
