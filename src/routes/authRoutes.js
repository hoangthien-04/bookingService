import express from 'express';
import authController from '../controllers/authController.js'; // Import Controller
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', authController.login);
router.post('/refresh-token', authMiddleware.verifyRefreshToken, authController.refreshToken);
router.post('/logout', authMiddleware.verifyRefreshToken, authController.logout);

router.post('/register', authController.registerUser);

export default router;
