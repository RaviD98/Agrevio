import { createSlice } from "@reduxjs/toolkit";

/* ---------- helpers ---------- */
const loadFavs = () => {
  try {
    const stored = localStorage.getItem("favourites");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

/* ---------- initial state ---------- */
const initialState = {
  items: loadFavs(),          // ← hydrate from localStorage
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    toggleFavourite: (state, action) => {
      const key = action.payload;
      state.items[key] = !state.items[key];
    },
  },
});

export const { toggleFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
