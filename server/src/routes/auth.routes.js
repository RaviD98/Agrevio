import express from "express";
import { login, register, logout, refreshToken } from "../controllers/auth.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.post("/refresh-token", refreshToken);

export default router;