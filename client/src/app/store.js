import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/api/authApi";
import { favouriteApi } from "../features/api/favouriteApi";
import { productApi } from "@/features/api/productApi";
import authReducer from "../features/authSlice";
import { cartApi } from "@/features/api/cartApi";


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [favouriteApi.reducerPath]: favouriteApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [productApi.reducerPath]: productApi.reducer,

    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(favouriteApi.middleware)
      .concat(cartApi.middleware)
      .concat(productApi.middleware),
});

export default store;
