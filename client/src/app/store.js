import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/api/authApi";
import { favouriteApi } from "../features/api/favouriteApi";
import authReducer from "../features/authSlice";
import cartReducer from "@/features/cartSlice";


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [favouriteApi.reducerPath]: favouriteApi.reducer,

    auth: authReducer,
    cart: cartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(favouriteApi.middleware),
});

/* ---------- persist cart only ---------- */
store.subscribe(() => {
  try {
    const { items: cartItems } = store.getState().cart;

    localStorage.setItem("cart", JSON.stringify(cartItems));
  } catch (err) {
    console.error("Unable to save cart:", err);
  }
});

export default store;
