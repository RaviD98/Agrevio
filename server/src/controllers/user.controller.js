import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { becomeSellerService } from "../services/user.service.js";

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(
      200,
      {
        user: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          role: req.user.role,
        },
      },
      "User fetched",
    ),
  );
});

export const becomeSellerController = asyncHandler(async (req, res) => {
  const updatedUser = await becomeSellerService(req.user._id);

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "Seller access granted successfully"),
    );
});