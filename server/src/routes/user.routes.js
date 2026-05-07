import express from "express";
import { getMe, becomeSellerController } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/me", isAuthenticated, getMe);
router.patch("/become-seller", isAuthenticated, becomeSellerController);

export default router;
