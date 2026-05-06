import { Product } from "../models/product.model.js";

// Create product
export const createProduct = (productData) => {
  return Product.create(productData);
};

// Get products with filters + pagination
export const findProducts = ({ filter, skip, limit, sort }) => {
  return Product.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate("owner", "name email");
};

// Count products
export const countProducts = (filter) => {
  return Product.countDocuments(filter);
};

// Get single product
export const findProductById = (productId) => {
  return Product.findById(productId).populate("owner", "name email");
};

// Update product
export const updateProductById = (productId, updateData) => {
  return Product.findByIdAndUpdate(productId, updateData, {
    new: true,
    runValidators: true,
  });
};

// Delete product
export const deleteProductById = (productId) => {
  return Product.findByIdAndDelete(productId);
};

// Get products by owner
export const findProductsByOwnerId = (ownerId) => {
  return Product.find({
    owner: ownerId,
  }).sort({
    createdAt: -1,
  });
};