import express from 'express';
import serviceController from '../controllers/serviceController.js';

const router = express.Router();

// POST /api/service
router.post('/', serviceController.createService);

export default router;
