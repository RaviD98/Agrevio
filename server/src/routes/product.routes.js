import express from "express";

import isAuthenticated from "../middleware/isAuthenticated.js";
import isAuthorized from "../middleware/isAuthorized.js";

import {
  createProductController,
  getProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} from "../controllers/productc.ontroller.js";

const router = express.Router();

// Public routes
router.get("/", getProductsController);

router.get("/:productId", getProductByIdController);

// Protected routes
router.post(
  "/",
  isAuthenticated,
  isAuthorized("Seller", "Admin"),
  createProductController,
);

router.patch(
  "/:productId",
  isAuthenticated,
  isAuthorized("Seller", "Admin"),
  updateProductController,
);

router.delete(
  "/:productId",
  isAuthenticated,
  isAuthorized("Seller", "Admin"),
  deleteProductController,
);

export default router;
