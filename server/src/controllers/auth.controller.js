import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { registerUser, loginUser, refreshAccessToken } from "../services/auth.service.js";
import { findUserById } from "../repositories/user.repository.js";

// Register
export const register = asyncHandler(async (req, res) => {
  const data = await registerUser(req.body);

  res.status(201).json(
    new ApiResponse(
      201,
      {
        user: {
          _id: data._id,
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

  const loggedInUser = await findUserById(user._id).select("-refreshToken");

  // Cookies
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully",
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

export const refreshToken = asyncHandler(async (req, res) => {
  const oldToken = req.cookies.refreshToken;

  const { newAccessToken, newRefreshToken } =
    await refreshAccessToken(oldToken);


  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  res
    .cookie("accessToken", newAccessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .status(200)
    .json(new ApiResponse(200, null, "Token refreshed"));
});