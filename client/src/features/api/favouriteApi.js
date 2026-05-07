import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const FAVOURITE_API = "http://localhost:8080/api/v1/favourites/";

export const favouriteApi = createApi({
  reducerPath: "favouriteApi",

  tagTypes: ["Favourite"],

  baseQuery: fetchBaseQuery({
    baseUrl: FAVOURITE_API,

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
