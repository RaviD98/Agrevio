import jwt from "jsonwebtoken";
import { findUserById } from "../repositories/user.repository.js";
import { ApiError } from "../utils/ApiError.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken||req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Not authenticated");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await findUserById(decoded.userId);

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default isAuthenticated;
