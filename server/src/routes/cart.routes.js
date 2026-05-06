import { Router } from "express";
import {
  addToCart,
  getCart,
  removeItem,
  clearCart,
} from "../controllers/cart.controller.js";

import isAuthenticated from "../middleware/isAuthenticated.js";

const router = Router();

router.post("/", isAuthenticated, addToCart);
router.get("/", isAuthenticated, getCart);
router.delete("/:productId", isAuthenticated, removeItem);
router.delete("/", isAuthenticated, clearCart);

export default router;
