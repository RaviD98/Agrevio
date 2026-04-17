import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },

    stripeSessionId: String,

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

// Ensure either booking or order exists
paymentSchema.pre("save", function (next) {
  if (!this.booking && !this.order) {
    return next(new Error("Payment must belong to booking or order"));
  }
  next();
});

export const Payment = mongoose.model("Payment", paymentSchema);
