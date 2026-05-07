import { Booking } from "../models/booking.model.js";

// Create booking
export const createBooking = (bookingData) => {
  return Booking.create(bookingData);
};

// Find conflicting booking
export const findConflictingBooking = ({ productId, startTime, endTime }) => {
  return Booking.findOne({
    product: productId,

    bookingStatus: {
      $in: ["pending", "confirmed"],
    },

    startTime: {
      $lt: endTime,
    },

    endTime: {
      $gt: startTime,
    },
  });
};

// Get user bookings
export const findBookingsByUser = (userId) => {
  return Booking.find({
    user: userId,
  })
    .populate("product")
    .sort({ createdAt: -1 });
};

// Find single booking
export const findBookingById = (bookingId) => {
  return Booking.findById(bookingId).populate("product");
};

// Update booking status
export const updateBookingStatus = (bookingId, bookingStatus) => {
  return Booking.findByIdAndUpdate(
    bookingId,
    {
      bookingStatus,
    },
    {
      new: true,
    },
  );
};
