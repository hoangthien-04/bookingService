import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import appointmentController from '../controllers/appointmentController.js';

const router = express.Router();

// POST /appointments — user phải login trước
router.post('/', authMiddleware.authenticateToken, appointmentController.registerAppointment);

export default router;
