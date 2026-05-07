import { BASE_URL } from "@/constants/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/orders`,

    credentials: "include",
  }),

  tagTypes: ["Orders"],

  endpoints: (builder) => ({
    // Create order
    createOrder: builder.mutation({
      query: () => ({
        url: "/",
        method: "POST",
      }),

      invalidatesTags: ["Orders"],
    }),

    // Get user orders
    getOrders: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),

      providesTags: ["Orders"],
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersQuery } = orderApi;
