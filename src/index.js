import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";
import authRoutes from "./routes/authRoutes.js";
import businessRoutes from "./routes/businessRoutes.js";
import userRoutes from "./routes/userRoute.js"
import staffRoutes from "./routes/staffRoute.js"
import locationRoutes from "./routes/locationRoute.js"
import serviceCategoryRoute from "./routes/serviceCategoryRoute.js"
import serviceRoute from './routes/serviceRoute.js'
import favoriteRoute from './routes/favoriteRoute.js'
import appointment from './routes/appointmentRoute.js'
import review from './routes/reviewRoute.js'

dotenv.config();

console.log("ENV CHECK:", {
  MONGO_URI: process.env.MONGO_URI?.substring(0, 10) + "...",
  JWT_SECRET: process.env.JWT_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Kết nối MongoDB
connectDB().catch((err) => {
  console.error("Kết nối MongoDB thất bại:", err);
});

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/user', userRoutes);
app.use("/api/business", businessRoutes); 
app.use('/api/staff', staffRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/serviceCategory', serviceCategoryRoute);
app.use('/api/service', serviceRoute);
app.use('/api/favorite', favoriteRoute)
app.use('/api/appointment', appointment)
app.use('/api/review', review)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
