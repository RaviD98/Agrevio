import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/api/authApi";
import { favouriteApi } from "../features/api/favouriteApi";
import { productApi } from "@/features/api/productApi";
import { orderApi } from "@/features/api/orderApi";
import { bookingApi } from "@/features/api/bookingApi";
import {deliveryApi} from "@/features/api/deliveryApi";
import { userApi } from "@/features/api/userApi";
import authReducer from "../features/authSlice";
import { cartApi } from "@/features/api/cartApi";


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [favouriteApi.reducerPath]: favouriteApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [deliveryApi.reducerPath]: deliveryApi.reducer,
    [userApi.reducerPath]: userApi.reducer,

    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(favouriteApi.middleware)
      .concat(cartApi.middleware)
      .concat(productApi.middleware)
      .concat(orderApi.middleware)
      .concat(bookingApi.middleware)
      .concat(deliveryApi.middleware)
      .concat(userApi.middleware),
});

export default store;
