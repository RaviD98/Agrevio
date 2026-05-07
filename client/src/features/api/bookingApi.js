import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  reducerPath: "bookingApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/bookings",

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
