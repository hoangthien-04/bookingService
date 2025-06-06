const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');

// Import model (đảm bảo Model đã được định nghĩa)
const User = require('./models/userModel.js');
const Staff = require('./models/staffModel.js');
const Service = require('./models/serviceModel.js');
const Review = require('./models/reviewModel.js');
const Location = require('./models/locationModel.js');
const Favorite = require('./models/favoriteModel.js');
const Business = require('./models/businessModel.js');
const Appointment = require('./models/appointmentModel.js');

dotenv.config();

const app = express();
app.use(express.json());

// Kết nối MongoDB
connectDB().catch(err => {
  console.error('Kết nối MongoDB thất bại:', err);
});

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
