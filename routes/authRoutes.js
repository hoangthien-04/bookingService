// routes/authRoutes.js
const express = require('express');
const router = express.Router();

const validateRegister = require('../middlewares/validateRegister');
const authController = require('../controllers/authController');

// POST /api/auth/register → first chạy validateRegister, sau đó vào controller.registerUser
router.post('/register', validateRegister, authController.registerUser);

module.exports = router;
