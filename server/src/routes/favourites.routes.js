// routes/favorite.routes.js
import express from "express";
import {
  addFavourite,
  getFavourites,
  removeFavourite,
} from "../controllers/favourites.controllers.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/add", isAuthenticated, addFavourite);
router.get("/", isAuthenticated, getFavourites);
router.delete("/remove/:productId", isAuthenticated, removeFavourite);

export default router;