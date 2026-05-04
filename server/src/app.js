import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

import userRoutes from "./routes/user.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import authRoutes from "./routes/auth.routes.js";

// Security middlewares
app.use(helmet());

// Logging
app.use(morgan("dev"));

// Body parser
app.use(express.json());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/payments", paymentRoutes);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
