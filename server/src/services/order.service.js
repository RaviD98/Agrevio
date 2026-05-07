import {
  createOrder,
  findOrdersByUserId,
  updateOrderPaymentStatus,
} from "../repositories/order.repository.js";

import {
  findCartByUserId,
  clearCartByUserId,
} from "../repositories/cart.repository.js";

import { ApiError } from "../utils/ApiError.js";

// Create order from cart
export const createOrderService = async (userId) => {
  // Get cart
  const cart = await findCartByUserId(userId);

  if (!cart || !cart.items.length) {
    throw new ApiError(400, "Cart is empty");
  }

  // Prepare order items
  const orderItems = cart.items.map((item) => ({
    product: item.product._id,

    quantity: item.quantity,

    price: item.product.price,
  }));

  // Calculate total
  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Create order
  const order = await createOrder({
    user: userId,

    items: orderItems,

    totalAmount,
  });

  // Clear cart after order
  await clearCartByUserId(userId);

  return order;
};

// Get user orders
export const getUserOrdersService = async (userId) => {
  const orders = await findOrdersByUserId(userId);

  return orders;
};

export const updateOrderPaymentStatusService = async (orderId, updateData) => {
  return await updateOrderPaymentStatus(orderId, updateData);
};