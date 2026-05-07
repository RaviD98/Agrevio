import express from "express";

import isAuthenticated from "../middleware/isAuthenticated.js";

import {
  createOrderController,
  getUserOrdersController,
} from "../controllers/order.controller.js";

const router = express.Router();

// Create order
router.post("/", isAuthenticated, createOrderController);

// Get user orders
router.get("/", isAuthenticated, getUserOrdersController);

export default router;
