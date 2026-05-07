import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/constants/api";

export const favouriteApi = createApi({
  reducerPath: "favouriteApi",

  tagTypes: ["Favourite"],

  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/favourites`,

    credentials: "include",
  }),

  endpoints: (builder) => ({
    // Get favourites
    getFavourites: builder.query({
      query: () => ({
        url: "",

        method: "GET",
      }),

      providesTags: ["Favourite"],
    }),

    // Toggle favourite
    toggleFavourite: builder.mutation({
      query: (productId) => ({
        url: `${productId}`,

        method: "POST",
      }),

      invalidatesTags: ["Favourite"],
    }),
  }),
});

export const { useGetFavouritesQuery, useToggleFavouriteMutation } =
  favouriteApi;
