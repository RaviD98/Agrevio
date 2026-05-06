import {
  getCartByUserId,
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from "../services/cart.service.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    throw new ApiError(400, "Product ID is required");
  }

  const cart = await addItemToCart(userId, productId, quantity);

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Item added to cart successfully"));
});

const getCart = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const cart = await getCartByUserId(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart fetched successfully"));
});

const removeItem = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { productId } = req.params;

  const cart = await removeItemFromCart(userId, productId);

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Item removed from cart successfully"));
});

const clearUserCart = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const cart = await clearCart(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart cleared successfully"));
});

export {
  addToCart,
  getCart,
  removeItem,
  clearUserCart as clearCart,
};