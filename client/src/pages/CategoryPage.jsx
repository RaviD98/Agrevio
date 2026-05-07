import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useGetProductsQuery } from "@/features/api/productApi";
import SectionLoader from "@/components/SectionLoader";

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
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f4] dark:bg-[#18181b]">
        <SectionLoader />
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f4] dark:bg-[#18181b]">
        <p className="text-red-500 text-lg font-medium">
          Failed to load products.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f4] dark:bg-[#18181b] px-4 py-8 md:px-8 transition-colors duration-500">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-green-600 dark:text-green-400 font-semibold mb-2">
          Product Category
        </p>

        <h2 className="text-4xl md:text-5xl font-bold capitalize tracking-tight text-neutral-900 dark:text-neutral-100">
          {category.replace(/-/g, " ")} Products
        </h2>
      </div>

      {/* Filters */}
      <div className="mb-10 flex flex-col gap-4 md:flex-row">
        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            flex-1 rounded-2xl border border-neutral-200
            bg-white px-5 py-3 text-sm
            shadow-sm outline-none transition-all duration-300
            placeholder:text-neutral-400
            focus:border-green-500 focus:ring-4 focus:ring-green-100
            dark:border-neutral-800 dark:bg-[#222225]
            dark:text-white dark:placeholder:text-neutral-500
            dark:focus:ring-green-900/30
          "
        />

        {/* Type filter */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="
            rounded-2xl border border-neutral-200
            bg-white px-5 py-3 text-sm
            shadow-sm outline-none transition-all duration-300
            focus:border-green-500 focus:ring-4 focus:ring-green-100
            dark:border-neutral-800 dark:bg-[#222225]
            dark:text-white dark:focus:ring-green-900/30
          "
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
            <h2 className="mb-3 text-3xl font-bold text-neutral-900 dark:text-white">
              No Products Found
            </h2>

            <p className="text-neutral-600 dark:text-neutral-400">
              Try changing filters or search keywords.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <Card
              key={product._id}
              onClick={() => navigate(`/products/item/${product._id}`)}
              className="
                group cursor-pointer overflow-hidden rounded-3xl
                border border-neutral-200
                bg-white/90 backdrop-blur-sm
                shadow-sm transition-all duration-300
                hover:-translate-y-1 hover:shadow-2xl
                dark:border-neutral-800 dark:bg-[#222225]
              "
            >
              {/* Image */}
              <div
                className="
                  relative flex h-72 items-center justify-center
                  overflow-hidden bg-[#f3f4f6]
                  dark:bg-[#1c1c1f]
                "
              >
                <img
                  src={product.images?.[0] || "https://placehold.co/600x400"}
                  alt={product.title}
                  className="
                    h-[90%] w-[90%] object-contain
                    transition-transform duration-500
                    group-hover:scale-105
                  "
                />
              </div>

              <CardHeader className="px-6 pt-6 pb-2">
                <CardTitle
                  className="
                    text-2xl font-semibold tracking-tight
                    text-neutral-900 dark:text-neutral-100
                  "
                >
                  {product.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <p
                  className="
                    mb-5 text-sm leading-relaxed
                    text-neutral-600 dark:text-neutral-400
                  "
                >
                  {product.description?.slice(0, 80) ||
                    "No description available"}
                </p>

                {/* Type */}
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className="
                      rounded-full bg-green-100 px-3 py-1
                      text-xs font-semibold capitalize
                      text-green-700
                      dark:bg-green-900/30 dark:text-green-300
                    "
                  >
                    {product.type}
                  </span>
                </div>

                {/* Price */}
                <div className="space-y-2 mb-6">
                  {product.type !== "rent" && (
                    <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                      ₹{product.price}
                    </p>
                  )}

                  {product.type !== "sale" && (
                    <p className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                      ₹{product.pricePerHour}/hour
                    </p>
                  )}
                </div>

                <button
                  className="
                    w-full rounded-2xl bg-green-600
                    px-5 py-3 text-sm font-medium text-white
                    transition-all duration-300
                    hover:bg-green-700
                    active:scale-[0.98]
                  "
                >
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
