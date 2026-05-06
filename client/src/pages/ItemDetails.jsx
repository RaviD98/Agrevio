import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";

import { toast } from "sonner";

import { useGetProductByIdQuery } from "@/features/api/productApi";

import { useAddToCartMutation } from "@/features/api/cartApi";

import { useToggleFavouriteMutation } from "@/features/api/favouriteApi";

const ItemDetails = () => {
  const { productId } = useParams();

  const navigate = useNavigate();

  const [adding, setAdding] = useState(false);

  const { data, isLoading, isError } = useGetProductByIdQuery(productId);

  const [addToCart] = useAddToCartMutation();

  const [toggleFavourite] = useToggleFavouriteMutation();

  const product = data?.data;

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading product...</p>
      </div>
    );
  }

  // Error state
  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Product not found
      </div>
    );
  }

  const tapProps = {
    whileTap: { scale: 0.94 },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  };

  const handleAddToCart = async () => {
    try {
      setAdding(true);

      await addToCart({
        productId: product._id,
        quantity: 1,
      }).unwrap();

      toast.success("Added to cart");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  const handleToggleFavourite = async () => {
    try {
      await toggleFavourite(product._id).unwrap();

      toast.success("Favourite updated");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update favourite");
    }
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-[#edf7f6] dark:bg-[#121212] text-gray-900 dark:text-gray-100">
      <div className="p-4">
        <motion.button
          {...tapProps}
          onClick={() => navigate(-1)}
          className="font-medium underline underline-offset-4"
        >
          &larr; Back
        </motion.button>
      </div>

      <div className="flex flex-col md:flex-row px-4 pb-32 gap-6">
        {/* Image */}
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            src={product.images?.[0] || "https://placehold.co/600x400"}
            alt={product.title}
            className="w-full md:max-w-md rounded-xl shadow-xl object-cover"
          />
        </div>

        {/* Details */}
        <div className="md:w-1/2 w-full bg-white/40 dark:bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>

          <p className="mb-4 text-lg">{product.description}</p>

          <p className="text-lg mb-2">Category: {product.category}</p>

          <p className="text-lg mb-2">Location: {product.location}</p>

          {/* Pricing */}
          {product.type !== "rent" && (
            <p className="text-2xl font-semibold text-green-700 mb-2">
              ₹{product.price}
            </p>
          )}

          {product.type !== "sale" && (
            <p className="text-2xl font-semibold text-blue-700">
              ₹{product.pricePerHour}/hour
            </p>
          )}
        </div>
      </div>

      {/* Bottom actions */}
      <div className="fixed bottom-0 left-0 w-full bg-[#edf7f6] dark:bg-[#1c1919] backdrop-blur-md shadow-[0_-2px_20px_rgba(0,0,0,0.15)] py-4 px-6 flex justify-center gap-4 z-50">
        {/* Add to cart */}
        {product.type !== "rent" && (
          <motion.button
            {...tapProps}
            disabled={adding}
            className="flex items-center gap-2 bg-[#68d388] text-black font-medium px-5 py-2 rounded-md shadow hover:brightness-110 disabled:opacity-60"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5" />

            {adding ? "Adding..." : "Add to Cart"}
          </motion.button>
        )}

        {/* Favourite */}
        <motion.button
          {...tapProps}
          className="flex items-center gap-2 px-5 py-2 rounded-md hover:bg-red-100/60"
          onClick={handleToggleFavourite}
        >
          <Heart className="h-5 w-5" />
          Favourite
        </motion.button>

        {/* Buy now */}
        {product.type !== "rent" && (
          <motion.button
            {...tapProps}
            className="bg-[#68d388] text-black font-medium px-5 py-2 rounded-md shadow"
            onClick={() =>
              navigate("/payment", {
                state: { product },
              })
            }
          >
            Buy Now
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default ItemDetails;
