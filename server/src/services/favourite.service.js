import { ApiError } from "../utils/ApiError.js";

import {
  findFavouritesByUserId,
  createFavourite,
  addProductToFavourites,
  removeProductFromFavourites,
} from "../repositories/favourite.repository.js";

import { findProductById } from "../repositories/product.repository.js";

// Get favourites
export const getFavourites = async (userId) => {
  let favourites = await findFavouritesByUserId(userId);

  // create empty favourites doc if not exists
  if (!favourites) {
    favourites = await createFavourite(userId);
  }

  return favourites;
};

// Toggle favourite
export const toggleFavourite = async (userId, productId) => {
  // validate product
  const product = await findProductById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // ensure favourites document exists
  let favourites = await findFavouritesByUserId(userId);

  if (!favourites) {
    favourites = await createFavourite(userId);
  }

  // check if product already favourited
  const alreadyExists = favourites.products.some(
    (item) => item._id.toString() === productId,
  );

  // remove if exists
  if (alreadyExists) {
    favourites = await removeProductFromFavourites(userId, productId);

    return {
      favourites,
      message: "Removed from favourites",
    };
  }

  // otherwise add
  favourites = await addProductToFavourites(userId, productId);

  return {
    favourites,
    message: "Added to favourites",
  };
};
