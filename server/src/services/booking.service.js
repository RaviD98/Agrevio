import { ApiError } from "../utils/ApiError.js";

import { findProductById } from "../repositories/product.repository.js";

import {
  createBooking,
  findConflictingBooking,
  findBookingsByUser,
  findBookingById,
  updateBookingStatus,
} from "../repositories/booking.repository.js";

// Create booking
export const createBookingService = async (userId, bookingData) => {
  const { productId, startTime, endTime, deliveryRequired, deliveryAddress } =
    bookingData;

  // Product validation
  const product = await findProductById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // Only rentable products
  if (product.type !== "rent") {
    throw new ApiError(400, "This product is not available for rent");
  }

  // Time validation
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (start >= end) {
    throw new ApiError(400, "End time must be after start time");
  }

  // Conflict validation
  const conflictingBooking = await findConflictingBooking({
    productId,
    startTime: start,
    endTime: end,
  });

  if (conflictingBooking) {
    throw new ApiError(400, "Product already booked for selected time");
  }

  // Calculate hours
  const diffInHours = (end - start) / (1000 * 60 * 60);

  const totalHours = Math.max(1, Math.ceil(diffInHours));

  // Calculate total amount
  const totalAmount = totalHours * product.pricePerHour;

  // Create booking
  const booking = await createBooking({
    user: userId,

    product: productId,

    startTime: start,

    endTime: end,

    totalHours,

    totalAmount,

    deliveryRequired,

    deliveryAddress,
  });

  return booking;
};

// Get user bookings
export const getUserBookingsService = async (userId) => {
  return await findBookingsByUser(userId);
};

// Cancel booking
export const cancelBookingService = async (bookingId, userId) => {
  const booking = await findBookingById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  // Ownership validation
  if (booking.user.toString() !== userId.toString()) {
    throw new ApiError(403, "Unauthorized to cancel booking");
  }

  // Prevent duplicate cancel
  if (booking.bookingStatus === "cancelled") {
    throw new ApiError(400, "Booking already cancelled");
  }

  return await updateBookingStatus(bookingId, "cancelled");
};
