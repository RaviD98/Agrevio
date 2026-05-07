import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
      default: "",
    },

    state: {
      type: String,
      trim: true,
      default: "",
    },

    pincode: {
      type: String,
      trim: true,
      default: "",
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    deliveryStatus: {
      type: String,
      enum: [
        "pending",
        "processing",
        "dispatched",
        "out_for_delivery",
        "delivered",
        "cancelled",
        "returned",
      ],

      default: "pending",
    },

    deliveryCharge: {
      type: Number,
      min: 0,
      default: 0,
    },

    estimatedDeliveryDate: {
      type: Date,
      default: null,
    },

    deliveredAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Ensure delivery belongs to either booking or order
deliverySchema.pre("save", function (next) {
  if (!this.booking && !this.order) {
    return next(new Error("Delivery must belong to either booking or order"));
  }

  next();
});

export const Delivery = mongoose.model("Delivery", deliverySchema);
