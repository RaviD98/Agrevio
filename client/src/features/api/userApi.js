import { BASE_URL } from "@/constants/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/users`,

    credentials: "include",
  }),

  tagTypes: ["User"],

  endpoints: (builder) => ({
    // Become seller
    becomeSeller: builder.mutation({
      query: () => ({
        url: "/become-seller",

        method: "PATCH",
      }),

      invalidatesTags: ["User"],
    }),
  }),
});

export const { useBecomeSellerMutation } = userApi;
