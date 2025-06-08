import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';  // Import middleware
import userController from '../controllers/userController.js';  // Import controller

const router = express.Router();

// Route để lấy thông tin người dùng
router.get('/public/:userId', userController.getPublicUserInfo);
router.get('/user-info', authMiddleware.authenticateToken, userController.getPrivateUserInfo);

export default router;
