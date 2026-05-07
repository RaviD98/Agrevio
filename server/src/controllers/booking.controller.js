import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiResponse } from "../utils/ApiResponse.js";

import {
  createBookingService,
  getUserBookingsService,
  cancelBookingService,
} from "../services/booking.service.js";

// Create booking
export const createBookingController = asyncHandler(async (req, res) => {
  const booking = await createBookingService(req.user._id, req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, booking, "Booking created successfully"));
});

// Get user bookings
export const getUserBookingsController = asyncHandler(async (req, res) => {
  const bookings = await getUserBookingsService(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, bookings, "Bookings fetched successfully"));
});

// Cancel booking
export const cancelBookingController = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;

  const booking = await cancelBookingService(bookingId, req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, booking, "Booking cancelled successfully"));
});
