import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },

    address: {
      type: String,
      required: true,
    },

    deliveryStatus: {
      type: String,
      enum: ["pending", "dispatched", "delivered", "returned"],
      default: "pending",
    },

    deliveryCharge: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true },
);

// Ensure relation exists
deliverySchema.pre("save", function (next) {
  if (!this.booking && !this.order) {
    return next(new Error("Delivery must belong to booking or order"));
  }
  next();
});

export const Delivery = mongoose.model("Delivery", deliverySchema);
