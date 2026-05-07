import {
  createOrderService,
  getUserOrdersService,
} from "../services/order.service.js";

import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiResponse } from "../utils/ApiResponse.js";

// Create order
export const createOrderController = asyncHandler(async (req, res) => {
  const order = await createOrderService(req.user._id);

  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order created successfully"));
});

// Get user orders
export const getUserOrdersController = asyncHandler(async (req, res) => {
  const orders = await getUserOrdersService(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully"));
});
