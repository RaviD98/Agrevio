import { Favourite } from "../models/favourites.model.js";

// Add to favorite
export const addFavourite = async (req, res) => {
  const { productId } = req.body;

  let fav = await Favourite.findOne({ user: req.user._id });

  if (!fav) {
    fav = await Favourite.create({ user: req.user._id, items: [] });
  }

  // avoid duplicates
  if (!fav.items.includes(productId)) {
    fav.items.push(productId);
  }

  await fav.save();
  res.json(fav);
};

// Get favorites
export const getFavourites = async (req, res) => {
  const fav = await Favourite.findOne({ user: req.user._id })
    .populate("items");

  res.json(fav);
};

// Remove favorite
export const removeFavourite = async (req, res) => {
  const { productId } = req.params;

  const fav = await Favourite.findOne({ user: req.user._id });

  if (!fav) return res.json({ items: [] });

  fav.items = fav.items.filter(
    (item) => item.toString() !== productId
  );

  await fav.save();
  res.json(fav);
};