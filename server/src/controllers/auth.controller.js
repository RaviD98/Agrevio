import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { registerUser, loginUser } from "../services/auth.service.js";

// Register
export const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json(
    new ApiResponse(
      201,
      {
        user: {
          id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
        },
      },
      "User registered successfully",
    ),
  );
});

// Login
export const login = asyncHandler(async (req, res) => {
  const user = await loginUser(req.body);

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // Save refresh token in DB
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // Cookies
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
        "Login successful",
      ),
    );
});

// Logout
export const logout = asyncHandler(async (req, res) => {
  const user = req.user;

  user.refreshToken = null;
  await user.save({ validateBeforeSave: false });

  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully"));
});
