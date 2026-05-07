import {
  createCheckoutSessionService,
  verifyWebhookSignatureService,
} from "../services/payment.service.js";

import { updateOrderPaymentStatusService } from "../services/order.service.js";

import { updateBookingPaymentStatusService } from "../services/booking.service.js";

import { createDeliveryService } from "../services/delivery.service.js";

import { ApiResponse } from "../utils/ApiResponse.js";

import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/ApiError.js";

// Create checkout session
export const createCheckoutSession = asyncHandler(async (req, res) => {
  const { line_items, metadata } = req.body;

  if (!Array.isArray(line_items) || line_items.length === 0) {
    throw new ApiError(400, "No line items provided");
  }

  const session = await createCheckoutSessionService({
    lineItems: line_items,

    metadata,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        url: session.url,
      },
      "Checkout session created successfully",
    ),
  );
});

// Stripe webhook
export const stripeWebhookController = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = verifyWebhookSignatureService(req.body, signature);
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  // Payment success
  // Payment success
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const metadata = session.metadata;

    // ORDER
    if (metadata.type === "order") {
      const updatedOrder = await updateOrderPaymentStatusService(
        metadata.resourceId,
        {
          paymentStatus: "Paid",

          status: "Confirmed",
        },
      );

      // Auto-create delivery
      if (updatedOrder) {
        await createDeliveryService(updatedOrder.user, {
          orderId: updatedOrder._id,

          address: metadata.address || "Default Address",

          deliveryCharge: 0,
        });
      }
    }

    // BOOKING
    if (metadata.type === "booking") {
      const updatedBooking = await updateBookingPaymentStatusService(
        metadata.resourceId,
        {
          paymentStatus: "paid",

          bookingStatus: "confirmed",
        },
      );

      // Auto-create delivery
      if (updatedBooking?.deliveryRequired) {
        await createDeliveryService(updatedBooking.user, {
          bookingId: updatedBooking._id,

          address: updatedBooking.deliveryAddress,

          deliveryCharge: 0,
        });
      }
    }
  }

  res.status(200).json({
    received: true,
  });
};;
