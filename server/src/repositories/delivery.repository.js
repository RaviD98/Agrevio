import { Delivery } from "../models/delivery.model.js";

// Create delivery
export const createDelivery = (deliveryData) => {
  return Delivery.create(deliveryData);
};

// Find delivery by id
export const findDeliveryById = (deliveryId) => {
  return Delivery.findById(deliveryId)
    .populate("user", "name email")
    .populate({
      path: "order",
      populate: {
        path: "items.product",
        select: "title images category",
      },
    })
    .populate({
      path: "booking",
      populate: {
        path: "product",
        select: "title images category",
      },
    });
};

// Get all deliveries of user
export const findDeliveriesByUserId = (userId) => {
  return Delivery.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate({
      path: "order",
      populate: {
        path: "items.product",
        select: "title images category",
      },
    })
    .populate({
      path: "booking",
      populate: {
        path: "product",
        select: "title images category",
      },
    });
};

// Update delivery status
export const updateDeliveryStatus = (deliveryId, deliveryStatus) => {
  return Delivery.findByIdAndUpdate(
    deliveryId,
    {
      deliveryStatus,

      ...(deliveryStatus === "delivered"
        ? {
            deliveredAt: new Date(),
          }
        : {}),
    },
    {
      new: true,
      runValidators: true,
    },
  );
};
