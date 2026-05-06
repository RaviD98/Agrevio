import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["Seller", "Buyer", "Admin"],
      default: "Buyer",
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ userId: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

// Refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ userId: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const User = mongoose.model("User", userSchema);
