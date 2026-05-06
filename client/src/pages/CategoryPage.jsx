import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useGetProductsQuery } from "@/features/api/productApi";

const CategoryPage = () => {
  const { category } = useParams();

  const navigate = useNavigate();

  // Filters
  const [search, setSearch] = useState("");

  const [type, setType] = useState("");

  const { data, isLoading, isError } = useGetProductsQuery({
    category,
    search,
    type,
  });

  const products = data?.data?.products || [];

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading products...</p>
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load products.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-[#edf7f6] dark:bg-[#121212]">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6 capitalize text-green-700 dark:text-green-300">
        {category.replace(/-/g, " ")} Products
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 rounded-lg border dark:bg-[#1A1A1A]"
        />

        {/* Type filter */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-3 rounded-lg border dark:bg-[#1A1A1A]"
        >
          <option value="">All Types</option>

          <option value="sale">Sale</option>

          <option value="rent">Rent</option>

          <option value="both">Both</option>
        </select>
      </div>

      {/* Empty */}
      {!products.length ? (
        <div className="min-h-[50vh] grid place-items-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-2">
              No Products Found
            </h2>

            <p className="text-gray-700 dark:text-gray-300">
              Try changing filters or search.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card
              key={product._id}
              onClick={() => navigate(`/products/item/${product._id}`)}
              className="cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.015]
                bg-white dark:bg-[#1A1A1A] border border-green-100 dark:border-[#2A2A2A] rounded-2xl overflow-hidden"
            >
              {/* Image */}
              <div className="h-56 overflow-hidden rounded-b-none">
                <img
                  src={product.images?.[0] || "https://placehold.co/600x400"}
                  alt={product.title}
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                />
              </div>

              <CardHeader className="p-4">
                <CardTitle className="text-green-800 dark:text-green-200 text-xl">
                  {product.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="px-4 pb-5">
                <p className="text-gray-700 dark:text-gray-400 mb-3 text-sm">
                  {product.description?.slice(0, 80) ||
                    "No description available"}
                </p>

                {/* Type */}
                <p className="mb-2 text-sm font-medium capitalize">
                  Type: {product.type}
                </p>

                {/* Price */}
                {product.type !== "rent" && (
                  <p className="font-semibold text-green-700 mb-2">
                    ₹{product.price}
                  </p>
                )}

                {product.type !== "sale" && (
                  <p className="font-semibold text-blue-700 mb-3">
                    ₹{product.pricePerHour}
                    /hour
                  </p>
                )}

                <button className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md">
                  View Details
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
