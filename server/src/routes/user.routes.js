import express from "express";
import { getMe } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/me", isAuthenticated, getMe);

export default router;
