import React from "react";
import { Link } from "react-router-dom";

import {
  useGetFavouritesQuery,
  useToggleFavouriteMutation,
} from "@/features/api/favouriteApi";

const Favourites = () => {
  const { data, isLoading, isError } = useGetFavouritesQuery();

  const [toggleFavourite] = useToggleFavouriteMutation();

  const favourites = data?.data?.products || [];

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading favourites...</p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Failed to load favourites.</p>
      </div>
    );
  }

  // Empty state
  if (!favourites.length) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#edf7f6" }}
      >
        <p className="text-xl font-semibold text-green-800">
          No favourites yet.
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full p-8"
      style={{ backgroundColor: "#edf7f6" }}
    >
      <h1 className="text-4xl font-bold text-center mb-10 text-green-900">
        Your Favourite Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {favourites.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl p-6 shadow-md border border-green-200"
          >
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-green-900">
                {product.title}
              </h2>

              <p className="text-green-700">{product.description}</p>

              <p className="font-semibold text-lg text-green-800">
                {product.type === "rent"
                  ? `₹${product.pricePerHour}/hour`
                  : `₹${product.price}`}
              </p>

              <p className="text-sm text-gray-600">{product.location}</p>

              <div className="flex gap-3 pt-3">
                <Link
                  to={`/products/item/${product._id}`}
                  className="px-5 py-2 rounded-md text-white font-medium"
                  style={{ backgroundColor: "#68d388" }}
                >
                  View Details
                </Link>

                <button
                  onClick={() => toggleFavourite(product._id)}
                  className="px-5 py-2 rounded-md border border-red-400 text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
