import express from "express";

import {
  createCheckoutSession,
  stripeWebhookController,
} from "../controllers/payment.controller.js";

import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// Webhook
router.post(
  "/webhook",
  express.raw({
    type: "application/json",
  }),
  stripeWebhookController,
);

// Checkout
router.post(
  "/checkout-session",
  express.json(),
  isAuthenticated,
  createCheckoutSession,
);

export default router;
