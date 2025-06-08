import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoute.js"
import staffRoutes from "./routes/staffRoute.js"
import serviceCategoryRoute from "./routes/serviceCategoryRoute.js"


dotenv.config();

const app = express();
app.use(express.json());

// Kết nối MongoDB
connectDB().catch((err) => {
  console.error("Kết nối MongoDB thất bại:", err);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/serviceCategory', serviceCategoryRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
