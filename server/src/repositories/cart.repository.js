import Cart from "../models/cart.model.js";
const findCartByUserId = (userId) => {
  return Cart.findOne({ user: userId }).populate("items.product");
};

const createCart = (data) => {
  return Cart.create(data);
};

const saveCart = (cart) => {
  return cart.save();
};

const clearCartByUserId = (userId) => {
  return Cart.findOneAndUpdate(
    { user: userId },
    { $set: { items: [] } },
    { new: true },
  ).populate("items.product");
};

export {
  findCartByUserId,
  createCart,
  saveCart,
  clearCartByUserId,
};