import { User } from "../models/user.model.js";

const findUserByEmail = (email) => {
  return User.findOne({ email });
};

const findUserByEmailWithPassword = (email) => {
  return User.findOne({ email }).select("+password");
};

const createUser = (data) => {
  return User.create(data);
};

const findUserById = (id) => {
  return User.findById(id).select("-password");
};

const saveUser = (user) => {
  return user.save({ validateBeforeSave: false });
};

export {findUserByEmail, findUserByEmailWithPassword, createUser, findUserById, saveUser};
