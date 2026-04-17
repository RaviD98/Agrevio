import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    startTime: {
      type: Date,
      required: true,
    },

    endTime: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.startTime;
        },
        message: "End time must be after start time",
      },
    },

    totalHours: {
      type: Number,
      min: 1,
    },

    totalAmount: {
      type: Number,
      min: 0,
    },

    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    deliveryRequired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Index for conflict detection
bookingSchema.index({ product: 1, startTime: 1, endTime: 1 });

// Calculate hours
bookingSchema.pre("save", function (next) {
  const diff = (this.endTime - this.startTime) / (1000 * 60 * 60);
  this.totalHours = Math.max(1, Math.ceil(diff));
  next();
});

export const Booking = mongoose.model("Booking", bookingSchema);
