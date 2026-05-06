import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import {
  createProductService,
  getProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
} from "../services/product.service.js";

// Create product
export const createProductController = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const product = await createProductService(userId, req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});

// Get all products
export const getProductsController = asyncHandler(async (req, res) => {
  const { page, limit, category, type, search } = req.query;

  const result = await getProductsService({
    page,
    limit,
    category,
    type,
    search,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Products fetched successfully"));
});

// Get single product
export const getProductByIdController = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await getProductByIdService(productId);

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
});

// Update product
export const updateProductController = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const updatedProduct = await updateProductService(
    productId,
    req.user._id,
    req.body,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

// Delete product
export const deleteProductController = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  await deleteProductService(productId, req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Product deleted successfully"));
});
