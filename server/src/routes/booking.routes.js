import express from "express";

import isAuthenticated from "../middleware/isAuthenticated.js";

import {
  createBookingController,
  getUserBookingsController,
  cancelBookingController,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/", createBookingController);

router.get("/", getUserBookingsController);

router.patch("/:bookingId/cancel", cancelBookingController);

export default router;
