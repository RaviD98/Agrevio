import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useGetProductsQuery } from "@/features/api/productApi";

import SectionLoader from "@/components/SectionLoader";

import { useDebounce } from "use-debounce";

import FallbackImage from "@/components/FallbackImage";

const CategoryPage = () => {
  const { category } = useParams();

  const navigate = useNavigate();

  // Filters
  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebounce(search, 500);

  const [type, setType] = useState("");

  const { data, isLoading, isError } = useGetProductsQuery({
    category,
    search: debouncedSearch,
    type,
  });

  const products = data?.data?.products || [];

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFAF5] dark:bg-[#2C2C2C]">
        <SectionLoader />
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFAF5] dark:bg-[#2C2C2C]">
        <p className="text-red-500 text-lg font-medium">
          Failed to load products.
        </p>
      </div>
    );
  }

  return (
    <section
      className="
        min-h-screen
        bg-[#FBFAF5]
        px-4 py-8 md:px-6 lg:px-8
        transition-colors duration-300
        dark:bg-[#2C2C2C]
        font-['Manrope']
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <p
            className="
              mb-3 text-sm
              font-semibold uppercase tracking-[0.2em]
              text-[#007200]
            "
          >
            Product Category
          </p>

          <h1
            className="
              text-4xl md:text-5xl
              font-bold capitalize
              text-[#007200]
              dark:text-green-300
              font-['Arvo']
            "
          >
            {category.replace(/-/g, " ")} Products
          </h1>

          <p
            className="
              mt-4 max-w-2xl
              text-base leading-relaxed
              text-gray-600
              dark:text-gray-300
            "
          >
            Browse high-quality agricultural products and equipment tailored for
            modern farming needs.
          </p>
        </div>

        {/* Filters */}
        <div
          className="
            mb-10 flex flex-col gap-4
            lg:flex-row
          "
        >
          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full flex-1
              rounded-2xl
              border border-gray-200
              bg-white
              px-5 py-3
              text-sm
              outline-none transition-all duration-300
              placeholder:text-gray-400
              focus:border-[#007200]
              focus:ring-4 focus:ring-[#007200]/10
              dark:border-[#4A4A4A]
              dark:bg-[#3A3A3A]
              dark:text-white
            "
          />

          {/* Type Filter */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="
              w-full cursor-pointer
              rounded-2xl
              border border-gray-200
              bg-white
              px-5 py-3
              text-sm
              outline-none transition-all duration-300
              focus:border-[#007200]
              focus:ring-4 focus:ring-[#007200]/10
              lg:w-[220px]
              dark:border-[#4A4A4A]
              dark:bg-[#3A3A3A]
              dark:text-white
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
              <h2
                className="
                  mb-3 text-3xl
                  font-bold
                  text-[#1F2937]
                  dark:text-white
                  font-['Arvo']
                "
              >
                No Products Found
              </h2>

              <p className="text-gray-600 dark:text-gray-400">
                Try changing filters or search keywords.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Products */}
            <div
              className="
                grid gap-6
                sm:grid-cols-2
                xl:grid-cols-3
              "
            >
              {products.map((product) => (
                <Card
                  key={product._id}
                  onClick={() => navigate(`/products/item/${product._id}`)}
                  className="
                    group cursor-pointer
                    overflow-hidden
                    rounded-[2rem]
                    border border-gray-200
                    bg-white
                    shadow-[0_10px_40px_rgba(0,0,0,0.06)]
                    transition-all duration-300
                    hover:-translate-y-1
                    dark:border-[#4A4A4A]
                    dark:bg-[#3A3A3A]
                  "
                >
                  {/* Image */}
                  <div
                    className="
                      flex h-64 sm:h-72
                      items-center justify-center
                      overflow-hidden
                      bg-[#FBFAF5]
                      dark:bg-[#2C2C2C]
                    "
                  >
                    <FallbackImage
                      src={product.images?.[0]}
                      alt={product.title}
                      className="
                        h-[90%] w-[90%]
                        object-contain
                        transition-transform duration-500
                        group-hover:scale-105
                      "
                    />
                  </div>

                  {/* Content */}
                  <CardHeader className="px-6 pt-6 pb-3">
                    <CardTitle
                      className="
                        line-clamp-1
                        text-2xl font-bold
                        text-[#1F2937]
                        dark:text-white
                        font-['Arvo']
                      "
                    >
                      {product.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="px-6 pb-6">
                    {/* Description */}
                    <p
                      className="
                        mb-5 line-clamp-3
                        text-sm leading-relaxed
                        text-gray-600
                        dark:text-gray-300
                      "
                    >
                      {product.description?.slice(0, 100) ||
                        "No description available"}
                    </p>

                    {/* Type */}
                    <div className="mb-5">
                      <span
                        className="
                          rounded-full
                          bg-[#007200]/10
                          px-3 py-1.5
                          text-xs font-semibold
                          capitalize
                          text-[#007200]
                        "
                      >
                        {product.type}
                      </span>
                    </div>

                    {/* Pricing */}
                    <div className="mb-6 space-y-2">
                      {product.type !== "rent" && (
                        <p
                          className="
                            text-3xl font-bold
                            text-[#007200]
                            dark:text-green-300
                            font-['Arvo']
                          "
                        >
                          ₹{product.price}
                        </p>
                      )}

                      {product.type !== "sale" && (
                        <p
                          className="
                            text-lg font-semibold
                            text-gray-700
                            dark:text-gray-300
                          "
                        >
                          ₹{product.pricePerHour}/hour
                        </p>
                      )}
                    </div>

                    {/* Button */}
                    <button
                      className="
                        w-full cursor-pointer
                        rounded-2xl
                        bg-[#007200]
                        px-5 py-3
                        text-sm font-semibold text-white
                        transition-all duration-300
                        hover:bg-[#04471c]
                      "
                    >
                      View Details
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CategoryPage;
