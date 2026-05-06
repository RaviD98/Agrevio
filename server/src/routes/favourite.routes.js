import express from "express";

import isAuthenticated from "../middleware/isAuthenticated.js";

import {
  toggleFavouriteController,
  getFavouritesController,
} from "../controllers/favourite.controller.js";

const router = express.Router();

// Get all favourites
router.get("/", isAuthenticated, getFavouritesController);

// Toggle favourite
router.post("/:productId", isAuthenticated, toggleFavouriteController);

export default router;
