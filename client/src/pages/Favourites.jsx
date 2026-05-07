import React from "react";

import { Link } from "react-router-dom";

import {
  useGetFavouritesQuery,
  useToggleFavouriteMutation,
} from "@/features/api/favouriteApi";

import LoadingScreen from "@/components/LoadingScreen";

import EmptyState from "@/components/EmptyState";

import FallbackImage from "@/components/FallbackImage";

import { Heart } from "lucide-react";

const Favourites = () => {
  const { data, isLoading, isError } = useGetFavouritesQuery();

  const [toggleFavourite] = useToggleFavouriteMutation();

  const favourites = data?.data?.products || [];

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFAF5] dark:bg-[#2C2C2C]">
        <LoadingScreen />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFAF5] dark:bg-[#2C2C2C]">
        <p className="text-red-500 text-lg">Failed to load favourites.</p>
      </div>
    );
  }

  // Empty state
  if (!favourites.length) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center bg-[#FBFAF5] dark:bg-[#2C2C2C]">
        <EmptyState
          icon={<Heart className="h-20 w-20" />}
          title="No favourites yet"
          description="Products you favourite will appear here."
        />
      </div>
    );
  }

  return (
    <section
      className="
        min-h-screen
        bg-[#FBFAF5]
        px-4 py-8 md:px-6
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
            Wishlist
          </p>

          <h1
            className="
              text-4xl md:text-5xl
              font-bold
              text-[#007200]
              dark:text-green-300
              font-['Arvo']
            "
          >
            Favourite Products
          </h1>

          <p
            className="
              mt-4 text-base
              text-gray-600
              dark:text-gray-300
            "
          >
            Quickly access products you’ve saved for later.
          </p>
        </div>

        {/* Grid */}
        <div
          className="
            grid gap-5
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {favourites.map((product) => (
            <div
              key={product._id}
              className="
                overflow-hidden
                rounded-[1.8rem]
                border border-gray-200
                bg-white
                shadow-[0_10px_30px_rgba(0,0,0,0.05)]
                transition-all duration-300
                hover:-translate-y-1
                dark:border-[#4A4A4A]
                dark:bg-[#3A3A3A]
              "
            >
              {/* Image */}
              <div
                className="
                  flex h-52 items-center justify-center
                  bg-[#FBFAF5]
                  p-4
                  dark:bg-[#2C2C2C]
                "
              >
                <FallbackImage
                  src={product?.images?.[0]}
                  alt={product.title}
                  className="
                    h-full w-full
                    object-contain
                  "
                />
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Title */}
                <h2
                  className="
                    line-clamp-1
                    text-2xl font-bold
                    text-[#1F2937]
                    dark:text-white
                    font-['Arvo']
                  "
                >
                  {product.title}
                </h2>

                {/* Description */}
                <p
                  className="
                    mt-3 line-clamp-2
                    text-sm leading-relaxed
                    text-gray-600
                    dark:text-gray-300
                  "
                >
                  {product.description}
                </p>

                {/* Location */}
                <p
                  className="
                    mt-3 text-sm
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  {product.location}
                </p>

                {/* Price */}
                <div className="mt-4">
                  <p
                    className="
                      text-2xl font-bold
                      text-[#007200]
                      dark:text-green-300
                      font-['Arvo']
                    "
                  >
                    {product.type === "rent"
                      ? `₹${product.pricePerHour}/hour`
                      : `₹${product.price}`}
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-5 flex gap-3">
                  <Link
                    to={`/products/item/${product._id}`}
                    className="
                      flex-1 cursor-pointer
                      rounded-2xl
                      bg-[#007200]
                      px-4 py-2.5
                      text-center text-sm
                      font-semibold text-white
                      transition-all duration-300
                      hover:bg-[#04471c]
                    "
                  >
                    View
                  </Link>

                  <button
                    onClick={() => toggleFavourite(product._id)}
                    className="
                      cursor-pointer
                      rounded-2xl
                      border border-red-300
                      px-4 py-2.5
                      text-sm font-semibold
                      text-red-500
                      transition-all duration-300
                      hover:bg-red-50
                      dark:border-red-500/40
                      dark:hover:bg-red-500/10
                    "
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Favourites;
