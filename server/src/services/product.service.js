import { ApiError } from "../utils/ApiError.js";

import {
  createProduct,
  findProducts,
  countProducts,
  findProductById,
  updateProductById,
  deleteProductById,
  findProductsByOwnerId,
} from "../repositories/product.repository.js";

// Create product
export const createProductService = async (userId, productData) => {
  const payload = {
    ...productData,

    category: productData.category.trim().toLowerCase(),

    owner: userId,
  };

  const product = await createProduct(payload);

  return product;
};

// Get all products
export const getProductsService = async ({
  page = 1,
  limit = 10,
  category,
  type,
  search,
}) => {
  const filter = {
    status: "active",
  };

  // category filter
  if (category) {
    filter.category = category.trim().toLowerCase();
  }

  // type filter
  if (type) {
    filter.type = type;
  }

  // search filter
  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  const skip = (page - 1) * limit;

  const products = await findProducts({
    filter,
    skip,
    limit: Number(limit),
    sort: { createdAt: -1 },
  });

  const totalProducts = await countProducts(filter);

  return {
    products,
    pagination: {
      total: totalProducts,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(totalProducts / limit),
    },
  };
};

// Get single product
export const getProductByIdService = async (productId) => {
  const product = await findProductById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

// Update product
export const updateProductService = async (productId, userId, updateData) => {
  const product = await findProductById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // ownership check
  if (product.owner._id.toString() !== userId.toString()) {
    throw new ApiError(403, "Unauthorized to update this product");
  }

  const updatedProduct = await updateProductById(productId, updateData);

  return updatedProduct;
};

// Delete product
export const deleteProductService = async (productId, userId) => {
  const product = await findProductById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // ownership check
  if (product.owner._id.toString() !== userId.toString()) {
    throw new ApiError(403, "Unauthorized to delete this product");
  }

  await deleteProductById(productId);

  return;
};

// Get vendor products
export const getMyProductsService = async (userId) => {
  const products =
    await findProductsByOwnerId(
      userId,
    );

  return products;
};
