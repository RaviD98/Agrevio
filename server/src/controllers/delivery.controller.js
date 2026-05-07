import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import {
  createDeliveryService,
  getUserDeliveriesService,
  updateDeliveryStatusService,
} from "../services/delivery.service.js";

// Create delivery
export const createDeliveryController = asyncHandler(async (req, res) => {
  const delivery = await createDeliveryService(req.user._id, req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, delivery, "Delivery created successfully"));
});

// Get user deliveries
export const getUserDeliveriesController = asyncHandler(async (req, res) => {
  const deliveries = await getUserDeliveriesService(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, deliveries, "Deliveries fetched successfully"));
});

// Update delivery status
export const updateDeliveryStatusController = asyncHandler(async (req, res) => {
  const { deliveryId } = req.params;

  const { deliveryStatus } = req.body;

  const updatedDelivery = await updateDeliveryStatusService(
    deliveryId,
    deliveryStatus,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedDelivery,
        "Delivery status updated successfully",
      ),
    );
});
