import { Favourite } from "../models/favourites.model.js";
import { Product } from "../models/product.model.js";

// Find favourites by user
export const findFavouritesByUserId = (userId) => {
  return Favourite.findOne({ user: userId }).populate(
    "products",
    "title category type price pricePerHour images location",
  );
};

// Create favourites document
export const createFavourite = (userId) => {
  return Favourite.create({
    user: userId,
    products: [],
  });
};

// Add product to favourites
export const addProductToFavourites = (userId, productId) => {
  return Favourite.findOneAndUpdate(
    { user: userId },
    {
      $addToSet: {
        products: productId,
      },
    },
    {
      new: true,
    },
  ).populate(
    "products",
    "title category type price pricePerHour images location",
  );
};

// Remove product from favourites
export const removeProductFromFavourites = (userId, productId) => {
  return Favourite.findOneAndUpdate(
    { user: userId },
    {
      $pull: {
        products: productId,
      },
    },
    {
      new: true,
    },
  );
};
