import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";

import { Heart, ShoppingCart, MapPin, Package, Clock3 } from "lucide-react";

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

  const [isFavourite, setIsFavourite] = useState(false);

  const product = data?.data;

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f4] dark:bg-[#18181b]">
        <SectionLoader />
      </div>
    );
  }

  // Error
  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f4] dark:bg-[#18181b] text-red-500">
        Product not found
      </div>
    );
  }

  const tapProps = {
    whileTap: {
      scale: 0.96,
    },

    transition: {
      type: "spring",

      stiffness: 300,

      damping: 18,
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
      setIsFavourite((prev) => !prev);
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
    <div className="min-h-screen bg-[#f7f7f4] dark:bg-[#18181b] text-neutral-900 dark:text-neutral-100 transition-colors duration-500 pb-36">
      {/* Back */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <motion.button
          {...tapProps}
          onClick={() => navigate(-1)}
          className="
            text-sm font-medium text-neutral-600
            hover:text-neutral-900
            dark:text-neutral-400 dark:hover:text-white
            transition-colors
          "
        >
          ← Back
        </motion.button>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-10 items-start">
        {/* Image Section */}
        <div
          className="
            rounded-3xl border border-neutral-200
            bg-white shadow-sm overflow-hidden
            dark:border-neutral-800 dark:bg-[#222225]
          "
        >
          <div
            className="
              h-[420px] md:h-[520px]
              flex items-center justify-center
              bg-[#f3f4f6] dark:bg-[#1b1b1d]
            "
          >
            <img
              src={product.images?.[0] || "https://placehold.co/600x400"}
              alt={product.title}
              className="
                w-[90%] h-[90%]
                object-contain
                transition-transform duration-500
                hover:scale-105
              "
            />
          </div>
        </div>

        {/* Details */}
        <div
          className="
            rounded-3xl border border-neutral-200
            bg-white p-6 md:p-8 shadow-sm
            dark:border-neutral-800 dark:bg-[#222225]
          "
        >
          {/* Badge */}
          <div className="mb-5 flex flex-wrap gap-3">
            <span
              className="
                rounded-full bg-green-100
                px-4 py-1 text-sm font-semibold
                text-green-700
                dark:bg-green-900/30 dark:text-green-300
              "
            >
              {product.type}
            </span>

            <span
              className="
                rounded-full bg-neutral-100
                px-4 py-1 text-sm font-medium
                text-neutral-700
                dark:bg-neutral-800 dark:text-neutral-300
              "
            >
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            {product.title}
          </h1>

          {/* Description */}
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg mb-8">
            {product.description}
          </p>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div
              className="
                rounded-2xl border border-neutral-200
                bg-[#fafaf9] p-4
                dark:border-neutral-800 dark:bg-[#1c1c1f]
              "
            >
              <div className="flex items-center gap-3 mb-2">
                <Package className="h-5 w-5 text-green-600" />
                <p className="font-semibold">Category</p>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 capitalize">
                {product.category}
              </p>
            </div>

            <div
              className="
                rounded-2xl border border-neutral-200
                bg-[#fafaf9] p-4
                dark:border-neutral-800 dark:bg-[#1c1c1f]
              "
            >
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="h-5 w-5 text-green-600" />
                <p className="font-semibold">Location</p>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {product.location}
              </p>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-8 space-y-3">
            {product.type !== "rent" && (
              <div>
                <p className="text-sm text-neutral-500 mb-1">Purchase Price</p>

                <p className="text-4xl font-bold text-green-700 dark:text-green-400">
                  ₹{product.price}
                </p>
              </div>
            )}

            {product.type !== "sale" && (
              <div>
                <p className="text-sm text-neutral-500 mb-1">Rental Price</p>

                <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                  ₹{product.pricePerHour}/hour
                </p>
              </div>
            )}
          </div>

          {/* Booking UI */}
          {product.type !== "sale" && (
            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8">
              <div className="flex items-center gap-3 mb-6">
                <Clock3 className="h-6 w-6 text-blue-600" />

                <h2 className="text-2xl font-bold">Book Product</h2>
              </div>

              <div className="space-y-5">
                {/* Start */}
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Start Time
                  </label>

                  <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="
                      w-full rounded-2xl border border-neutral-200
                      bg-[#fafaf9] px-4 py-3
                      outline-none transition-all
                      focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                      dark:border-neutral-700 dark:bg-[#1b1b1d]
                      dark:focus:ring-blue-900/30
                    "
                  />
                </div>

                {/* End */}
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    End Time
                  </label>

                  <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="
                      w-full rounded-2xl border border-neutral-200
                      bg-[#fafaf9] px-4 py-3
                      outline-none transition-all
                      focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                      dark:border-neutral-700 dark:bg-[#1b1b1d]
                      dark:focus:ring-blue-900/30
                    "
                  />
                </div>

                {/* Delivery */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={deliveryRequired}
                    onChange={(e) => setDeliveryRequired(e.target.checked)}
                    className="h-4 w-4"
                  />

                  <label className="text-sm font-medium">
                    Delivery Required
                  </label>
                </div>

                {/* Address */}
                {deliveryRequired && (
                  <textarea
                    placeholder="Delivery address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="
                      w-full rounded-2xl border border-neutral-200
                      bg-[#fafaf9] px-4 py-3
                      outline-none transition-all
                      focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                      dark:border-neutral-700 dark:bg-[#1b1b1d]
                      dark:text-white dark:focus:ring-blue-900/30
                    "
                  />
                )}

                {/* Book */}
                <button
                  onClick={handleBooking}
                  className="
                    w-full rounded-2xl bg-blue-600
                    py-3 font-semibold text-white
                    transition-all duration-300
                    hover:bg-blue-700
                    active:scale-[0.99]
                  "
                >
                  Book Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div
        className="
          fixed bottom-0 left-0 z-50 w-full
          border-t border-neutral-200
          bg-white/90 backdrop-blur-xl
          dark:border-neutral-800 dark:bg-[#18181b]/90
        "
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-4">
          {/* Cart */}
          {product.type !== "rent" && (
            <motion.button
              {...tapProps}
              disabled={adding}
              className="
                flex items-center gap-2 rounded-2xl
                bg-green-600 px-6 py-3
                font-medium text-white
                transition-all duration-300
                hover:bg-green-700
                disabled:opacity-60
              "
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5" />

              {adding ? "Adding..." : "Add to Cart"}
            </motion.button>
          )}

          {/* Favourite */}
          {/* Favourite */}
          <button
            onClick={handleToggleFavourite}
            className="
    flex items-center gap-2 rounded-2xl
    border border-neutral-200
    bg-white px-6 py-3
    font-medium transition-all duration-300
    hover:bg-green-50
    dark:border-neutral-700 dark:bg-[#222225]
    dark:hover:bg-green-900/20
  "
          >
            <Heart
              className={`
      h-5 w-5 transition-all duration-300
      ${
        isFavourite
          ? "fill-green-500 text-green-500"
          : "text-neutral-500 dark:text-neutral-400"
      }
    `}
            />

            <span
              className={`
      transition-colors duration-300
      ${isFavourite ? "text-green-600 dark:text-green-400" : ""}
    `}
            >
              Favourite
            </span>
          </button>

          {/* Buy */}
          {product.type !== "rent" && (
            <motion.button
              {...tapProps}
              className="
                rounded-2xl bg-neutral-900
                px-6 py-3 font-medium text-white
                transition-all duration-300
                hover:bg-black
                dark:bg-white dark:text-black
              "
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
    </div>
  );
};

export default ItemDetails;
