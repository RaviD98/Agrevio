import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/products",
    credentials: "include",
  }),

  tagTypes: ["Products"],

  endpoints: (builder) => ({
    // Get all products
    getProducts: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams(params);

        return `/?${searchParams.toString()}`;
      },

      providesTags: ["Products"],
    }),

    // Get single product
    getProductById: builder.query({
      query: (productId) => ({
        url: `/${productId}`,
        method: "GET",
      }),

      providesTags: ["Products"],
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "/",
        method: "POST",
        body: productData,
      }),

      invalidatesTags: ["Products"],
    }),
    getMyProducts: builder.query({
      query: () => ({
        url: "/my-products",
        method: "GET",
      }),

      providesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: ({ productId, productData }) => ({
        url: `/${productId}`,
        method: "PATCH",
        body: productData,
      }),

      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/${productId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useGetMyProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
