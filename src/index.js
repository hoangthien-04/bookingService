import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";
import authRoutes from "./routes/authRoutes.js";
import businessRoute from "./routes/businessRoute.js";
import userRoutes from "./routes/userRoute.js";
import staffRoutes from "./routes/staffRoute.js";
import locationRoutes from "./routes/locationRoute.js";
import serviceCategoryRoute from "./routes/serviceCategoryRoute.js";
import serviceRoute from "./routes/serviceRoute.js";
import favoriteRoute from "./routes/favoriteRoute.js";
import appointment from "./routes/appointmentRoute.js";
import review from "./routes/reviewRoute.js";
import country from "./routes/countryRoute.js";

import cors from "cors";

dotenv.config();

const app = express();
const corsOptions = {
  origin: "https://projectlandingpagefe.vercel.app",
  credentials: true
}
app.use(
  cors(corsOptions)
);
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
app.use("/api/user", userRoutes);
app.use("/api/business", businessRoute);
app.use("/api/staff", staffRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/serviceCategory", serviceCategoryRoute);
app.use("/api/service", serviceRoute);
app.use("/api/favorite", favoriteRoute);
app.use("/api/appointment", appointment);
app.use("/api/review", review);
app.use("/api/country", country);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
