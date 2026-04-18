import express from "express";
import { login, register, logout } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);

// Example for testing
router.get("/me", isAuthenticated, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export default router;
