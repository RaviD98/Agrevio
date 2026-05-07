import express from "express";

import isAuthenticated from "../middleware/isAuthenticated.js";

import {
  createDeliveryController,
  getUserDeliveriesController,
  updateDeliveryStatusController,
} from "../controllers/delivery.controller.js";

const router = express.Router();

// Protected routes
router.use(isAuthenticated);

router.post("/", createDeliveryController);
router.get("/", getUserDeliveriesController);
router.patch(
  "/:deliveryId/status",
  express.json(),
  updateDeliveryStatusController,
);

export default router;
