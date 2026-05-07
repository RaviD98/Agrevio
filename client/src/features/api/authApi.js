import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";
import { BASE_URL } from "@/constants/api";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
    }),
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn(result.data.data.user));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getMe: builder.query({
      query: () => ({
        url: `${BASE_URL}/users/me`,

        method: "GET",
      }),

      refetchOnMountOrArgChange: true,

      providesTags: ["Auth"],

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(userLoggedIn(result.data.data.user));
        } catch (error) {
          dispatch(userLoggedOut());
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",

        method: "POST",
      }),
    }),
  }),
});
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetMeQuery,
  useLogoutMutation,
} = authApi;
