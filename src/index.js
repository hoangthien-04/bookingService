import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";
import authRoutes from "./routes/authRoutes.js";
import businessRoute from "./routes/businessRoute.js";
import userRoutes from "./routes/userRoute.js"
import staffRoutes from "./routes/staffRoute.js"
import serviceCategoryRoute from "./routes/serviceCategoryRoute.js"

dotenv.config();

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
app.use("/api/business", businessRoute); 
app.use('/api/staff', staffRoutes);
app.use('/api/serviceCategory', serviceCategoryRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
