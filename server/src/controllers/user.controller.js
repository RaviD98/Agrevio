import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
