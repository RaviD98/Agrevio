import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/constants/api";

export const bookingApi = createApi({
  reducerPath: "bookingApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/bookings`,

    credentials: "include",
  }),

  tagTypes: ["Bookings"],

  endpoints: (builder) => ({
    // Create booking
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/",

        method: "POST",

        body: bookingData,
      }),

      invalidatesTags: ["Bookings"],
    }),

    // Get bookings
    getBookings: builder.query({
      query: () => ({
        url: "/",

        method: "GET",
      }),

      providesTags: ["Bookings"],
    }),

    // Cancel booking
    cancelBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/${bookingId}/cancel`,

        method: "PATCH",
      }),

      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingsQuery,
  useCancelBookingMutation,
} = bookingApi;
