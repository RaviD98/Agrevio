import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";

import { Heart, ShoppingCart } from "lucide-react";

import { toast } from "sonner";

import { useGetProductByIdQuery } from "@/features/api/productApi";

import { useAddToCartMutation } from "@/features/api/cartApi";

import { useToggleFavouriteMutation } from "@/features/api/favouriteApi";

import { useCreateBookingMutation } from "@/features/api/bookingApi";
import SectionLoader from "@/components/SectionLoader";

const ItemDetails = () => {
  const { productId } = useParams();

  const navigate = useNavigate();

  const [adding, setAdding] = useState(false);

  const [startTime, setStartTime] = useState("");

  const [endTime, setEndTime] = useState("");

  const [deliveryRequired, setDeliveryRequired] = useState(false);

  const [deliveryAddress, setDeliveryAddress] = useState("");

  const { data, isLoading, isError } = useGetProductByIdQuery(productId);

  const [addToCart] = useAddToCartMutation();

  const [toggleFavourite] = useToggleFavouriteMutation();

  const [createBooking] = useCreateBookingMutation();

  const product = data?.data;

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SectionLoader />
      </div>
    );
  }

  // Error
  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Product not found
      </div>
    );
  }

  const tapProps = {
    whileTap: {
      scale: 0.94,
    },

    transition: {
      type: "spring",

      stiffness: 300,

      damping: 15,
    },
  };

  // Add to cart
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

  // Favourite
  const handleToggleFavourite = async () => {
    try {
      await toggleFavourite(product._id).unwrap();

      toast.success("Favourite updated");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update favourite");
    }
  };

  // Booking
  const handleBooking = async () => {
    try {
      if (!startTime || !endTime) {
        return toast.error("Please select booking time");
      }

      await createBooking({
        productId: product._id,

        startTime,

        endTime,

        deliveryRequired,

        deliveryAddress,
      }).unwrap();

      toast.success("Booking created successfully");

      navigate("/bookings");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create booking");
    }
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-[#edf7f6] dark:bg-[#121212] text-gray-900 dark:text-gray-100">
      {/* Back */}
      <div className="p-4">
        <motion.button
          {...tapProps}
          onClick={() => navigate(-1)}
          className="font-medium underline underline-offset-4"
        >
          &larr; Back
        </motion.button>
      </div>

      {/* Main */}
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

          <p className="text-lg mb-4">Location: {product.location}</p>

          {/* Sale Price */}
          {product.type !== "rent" && (
            <p className="text-2xl font-semibold text-green-700 mb-2">
              ₹{product.price}
            </p>
          )}

          {/* Rent Price */}
          {product.type !== "sale" && (
            <p className="text-2xl font-semibold text-blue-700 mb-6">
              ₹{product.pricePerHour}
              /hour
            </p>
          )}

          {/* Booking UI */}
          {product.type !== "sale" && (
            <div className="space-y-4 border-t pt-6">
              <h2 className="text-2xl font-bold text-blue-700">Book Product</h2>

              {/* Start */}
              <div>
                <label className="block mb-2 font-medium">Start Time</label>

                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-3 rounded-lg border dark:bg-[#121212]"
                />
              </div>

              {/* End */}
              <div>
                <label className="block mb-2 font-medium">End Time</label>

                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full p-3 rounded-lg border dark:bg-[#121212]"
                />
              </div>

              {/* Delivery */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={deliveryRequired}
                  onChange={(e) => setDeliveryRequired(e.target.checked)}
                />

                <label>Delivery Required</label>
              </div>

              {/* Address */}
              {deliveryRequired && (
                <textarea
                  placeholder="Delivery address"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full p-3 rounded-lg border dark:bg-[#121212]"
                />
              )}

              {/* Book */}
              <button
                onClick={handleBooking}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
              >
                Book Now
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 w-full bg-[#edf7f6] dark:bg-[#1c1919] backdrop-blur-md shadow-[0_-2px_20px_rgba(0,0,0,0.15)] py-4 px-6 flex justify-center gap-4 z-50">
        {/* Cart */}
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

        {/* Buy */}
        {product.type !== "rent" && (
          <motion.button
            {...tapProps}
            className="bg-[#68d388] text-black font-medium px-5 py-2 rounded-md shadow"
            onClick={() =>
              navigate("/payment", {
                state: {
                  product,
                },
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
