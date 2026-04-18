import { ApiError } from "../utils/ApiError.js";
import {
  findUserByEmail,
  findUserByEmailWithPassword,
  createUser,
  saveUser,
} from "../repositories/user.repository.js";

export const registerUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await findUserByEmail(email.toLowerCase());

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = await createUser({
    name,
    email: email.toLowerCase(),
    password,
  });

  return user;
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await findUserByEmailWithPassword(email.toLowerCase());

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  return user;
};

export const logoutUser = async (user) => {
  user.refreshToken = null;
  await saveUser(user);
};
