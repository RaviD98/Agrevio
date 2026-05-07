import Order from "../models/order.model.js";

export const createOrder = (orderData) => {
  return Order.create(orderData);
};

export const findOrdersByUserId = (userId) => {
  return Order.find({ user: userId })
    .populate("items.product")
    .sort({ createdAt: -1 });
};
