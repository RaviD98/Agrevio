import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import {
  toggleFavourite,
  getFavourites,
} from "../services/favourite.service.js";

// Toggle favourite
export const toggleFavouriteController = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  const result = await toggleFavourite(userId, productId);

  return res
    .status(200)
    .json(new ApiResponse(200, result.favourites, result.message));
});

// Get all favourites
export const getFavouritesController = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const favourites = await getFavourites(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, favourites, "Favourites fetched successfully"));
});
