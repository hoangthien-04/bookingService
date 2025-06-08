import express from 'express';
import authController from '../controllers/authController.js'; // Import Controller
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', authController.login);
router.post('/token', authMiddleware.authenticateToken, authController.refreshToken);
router.post('/logout', authMiddleware.authenticateToken, authController.logout);

router.post('/register', authController.registerUser);

export default router;
