import express from "express";
import { createCheckoutSession } from "../controllers/payment.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Protected route
router.post("/checkout-session", isAuthenticated, createCheckoutSession);

export default router;
