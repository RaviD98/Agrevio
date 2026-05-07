import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const deliveryApi = createApi({
  reducerPath: "deliveryApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/deliveries",

    credentials: "include",
  }),

  tagTypes: ["Deliveries"],

  endpoints: (builder) => ({
    // Get user deliveries
    getUserDeliveries: builder.query({
      query: () => ({
        url: "/",

        method: "GET",
      }),

      providesTags: ["Deliveries"],
    }),

    // Update delivery status
    updateDeliveryStatus: builder.mutation({
      query: ({ deliveryId, deliveryStatus }) => ({
        url: `/${deliveryId}/status`,

        method: "PATCH",

        body: {
          deliveryStatus,
        },
      }),

      invalidatesTags: ["Deliveries"],
    }),
  }),
});

export const { useGetUserDeliveriesQuery, useUpdateDeliveryStatusMutation } =
  deliveryApi;
