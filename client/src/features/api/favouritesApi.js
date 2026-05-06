import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const favouritesApi = createApi({
  reducerPath: "favouritesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1",
    credentials: "include", 
  }),
  endpoints: (builder) => ({
    
    // Add favourite
    addFavourite: builder.mutation({
      query: (productId) => ({
        url: "/favourite/add",
        method: "POST",
        body: { productId },
      }),
    }),

    // Get favourites
    getFavourites: builder.query({
      query: () => "/favourite",
    }),

    // Remove favourite
    removeFavourite: builder.mutation({
      query: (productId) => ({
        url: `/favourite/remove/${productId}`,
        method: "DELETE",
      }),
    }),

  }),
});

export const {
  useAddFavouriteMutation,
  useGetFavouritesQuery,
  useRemoveFavouritesMutation,
} = favouritesApi;