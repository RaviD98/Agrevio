import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: String,
    category: String,

    type: {
      type: String,
      enum: ["rent", "sale", "both"],
      required: true,
      index: true,
    },

    // Sale
    price: {
      type: Number,
      min: 0,
    },

    stock: {
      type: Number,
      min: 0,
      default: 0,
    },

    // Rent
    pricePerHour: {
      type: Number,
      min: 0,
    },

    securityDeposit: {
      type: Number,
      min: 0,
    },

    location: {
      type: String,
      required: true,
      index: true,
    },

    images: [String],

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },
  },
  { timestamps: true },
);

// Conditional validation
productSchema.pre("save", function (next) {
  if (this.type === "sale" || this.type === "both") {
    if (!this.price) {
      return next(new Error("Price required for sale items"));
    }
  }

  if (this.type === "rent" || this.type === "both") {
    if (!this.pricePerHour || !this.securityDeposit) {
      return next(new Error("Rent fields missing"));
    }
  }

  next();
});

export const Product = mongoose.model("Product", productSchema);
