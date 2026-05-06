import {
  findCartByUserId,
  createCart,
  saveCart,
  clearCartByUserId,
} from "../repositories/cart.repository.js";

import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";

const getCartByUserId = async (userId) => {
  let cart = await findCartByUserId(userId);

  if (!cart) {
    cart = await createCart({
      user: userId,
      items: [],
    });
  }

  return cart;
};

const addItemToCart = async (userId, productId, quantity = 1) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new ApiError(400, "Quantity must be a positive integer");
  }

  let cart = await findCartByUserId(userId);

  if (!cart) {
    cart = await createCart({
      user: userId,
      items: [
        {
          product: productId,
          quantity,
        },
      ],
    });

    return findCartByUserId(userId);
  }

  const existingItem = cart.items.find(
    (item) => item.product._id.toString() === productId.toString(),
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
    });
  }

  await saveCart(cart);

  return findCartByUserId(userId);
};

const removeItemFromCart = async (userId, productId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const cart = await findCartByUserId(userId);

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const itemExists = cart.items.some(
    (item) => item.product._id.toString() === productId.toString(),
  );

  if (!itemExists) {
    throw new ApiError(404, "Product not found in cart");
  }

  cart.items = cart.items.filter(
    (item) => item.product._id.toString() !== productId.toString(),
  );

  await saveCart(cart);

  return findCartByUserId(userId);
};

const clearCart = async (userId) => {
  let cart = await clearCartByUserId(userId);

  if (!cart) {
    cart = await createCart({
      user: userId,
      items: [],
    });
  }

  return cart;
};

export {
  getCartByUserId,
  addItemToCart,
  removeItemFromCart,
  clearCart,
};