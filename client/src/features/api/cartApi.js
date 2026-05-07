import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/constants/api";

export const cartApi = createApi({
  reducerPath: "cartApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/cart`,
    credentials: "include",
  }),

  tagTypes: ["Cart"],

  endpoints: (builder) => ({
    // Get cart
    getCart: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),

      providesTags: ["Cart"],
    }),

    // Add to cart
    addToCart: builder.mutation({
      query: ({ productId, quantity = 1 }) => ({
        url: "/",
        method: "POST",
        body: {
          productId,
          quantity,
        },
      }),

      invalidatesTags: ["Cart"],
    }),

    // Remove item
    removeFromCart: builder.mutation({
      query: (productId) => ({
        url: `/${productId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Cart"],
    }),

    // Clear cart
    clearCart: builder.mutation({
      query: () => ({
        url: "/",
        method: "DELETE",
      }),

      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi;
