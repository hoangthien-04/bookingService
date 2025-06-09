import express from 'express';
import serviceController from '../controllers/serviceController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/popular-service', serviceController.getPopularService);
// POST /api/service
router.post('/',authMiddleware.authenticateToken, serviceController.createService);


export default router;
