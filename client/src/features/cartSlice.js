import { createSlice } from "@reduxjs/toolkit";

/* ---------- helpers ---------- */
const loadCart = () => {
  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : {};
  } catch {
    // localStorage might be unavailable (e.g. private-mode)
    return {};
  }
};

/* ---------- initial state ---------- */
const initialState = {
  items: loadCart(), // ← hydrate from localStorage
};

/* ---------- slice ---------- */
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { category, slug, item } = action.payload; // item = {name, price, description}
      const key = `${category}:${slug}`;
      if (state.items[key]) {
        state.items[key].qty += 1;
      } else {
        state.items[key] = { qty: 1, data: item };
      }
    },
    removeFromCart: (state, action) => {
      delete state.items[action.payload];
    },
    clearCart: (state) => {
      state.items = {}; // ← reset but keep slice object
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
