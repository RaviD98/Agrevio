import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/api/authApi";
import authReducer from "../features/authSlice";
import cartReducer from "@/features/cartSlice";
import favouritesReducer from "@/features/favouritesSlice";
import { favouritesApi } from "../features/api/favouritesApi";
/* ---------- hydrate user (already present) ---------- */
// const persistedUser = JSON.parse(localStorage.getItem("user") || "null");


/* ---------- create store ---------- */
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [favouritesApi.reducerPath]: favouritesApi.reducer,
    auth: authReducer,
    cart: cartReducer,
    favourites: favouritesReducer,
  },
  // preloadedState: {
  //   auth: { user: persistedUser },
  // },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware)
  .concat(favouritesApi.middleware),
});

/* ---------- persist cart on every state change ---------- */
store.subscribe(() => {
  try {
    // const { items } = store.getState().cart;
    // const { items: favItems } = store.getState().favourites;
    // localStorage.setItem("cart", JSON.stringify(items));

    const { items: cartItems } = store.getState().cart;
    const { items: favItems } = store.getState().favourites;
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("favourites", JSON.stringify(favItems));
  } catch (err) {
    console.error("Unable to save cart:", err);
  }
});

export default store;
