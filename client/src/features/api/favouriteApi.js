import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const favouriteApi = createApi({
  reducerPath: "favouriteApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/favourites",
    credentials: "include",
  }),

  tagTypes: ["Favourites"],

  endpoints: (builder) => ({
    // Get favourites
    getFavourites: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),

      providesTags: ["Favourites"],
    }),

    // Toggle favourite
    toggleFavourite: builder.mutation({
      query: (productId) => ({
        url: `/${productId}`,
        method: "POST",
      }),

      invalidatesTags: ["Favourites"],
    }),
  }),
});

export const { useGetFavouritesQuery, useToggleFavouriteMutation } =
  favouriteApi;
