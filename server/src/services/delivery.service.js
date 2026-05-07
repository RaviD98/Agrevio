import { ApiError } from "../utils/ApiError.js";

import Order from "../models/order.model.js";
import { Booking } from "../models/booking.model.js";

import {
  createDelivery,
  findDeliveryById,
  findDeliveriesByUserId,
  updateDeliveryStatus,
} from "../repositories/delivery.repository.js";

// Create delivery
export const createDeliveryService = async (userId, payload) => {
  const { orderId, bookingId, address, deliveryCharge = 0 } = payload;

  // Either order or booking required
  if (!orderId && !bookingId) {
    throw new ApiError(400, "Order ID or Booking ID is required");
  }

  // Prevent both together
  if (orderId && bookingId) {
    throw new ApiError(400, "Delivery can belong to either order or booking");
  }

  // Order delivery
  if (orderId) {
    const order = await Order.findById(orderId);

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    if (order.user.toString() !== userId.toString()) {
      throw new ApiError(403, "Unauthorized to access this order");
    }

    const delivery = await createDelivery({
      user: userId,
      order: orderId,
      address,
      deliveryCharge,
    });

    return delivery;
  }

  // Booking delivery
  if (bookingId) {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new ApiError(404, "Booking not found");
    }

    if (booking.user.toString() !== userId.toString()) {
      throw new ApiError(403, "Unauthorized to access this booking");
    }

    const delivery = await createDelivery({
      user: userId,
      booking: bookingId,
      address,
      deliveryCharge,
    });

    return delivery;
  }
};

// Get user deliveries
export const getUserDeliveriesService = async (userId) => {
  return await findDeliveriesByUserId(userId);
};

// Update delivery status
export const updateDeliveryStatusService = async (
  deliveryId,
  deliveryStatus,
) => {
  const delivery = await findDeliveryById(deliveryId);

  if (!delivery) {
    throw new ApiError(404, "Delivery not found");
  }

  const updatedDelivery = await updateDeliveryStatus(
    deliveryId,
    deliveryStatus,
  );

  return updatedDelivery;
};
