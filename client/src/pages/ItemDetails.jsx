import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
  Heart,
  ShoppingCart,
  MapPin,
  Package,
  Clock3,
  ArrowLeft,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { useGetProductByIdQuery } from "@/features/api/productApi";

import { useAddToCartMutation } from "@/features/api/cartApi";

import {
  useGetFavouritesQuery,
  useToggleFavouriteMutation,
} from "@/features/api/favouriteApi";

import { useCreateBookingMutation } from "@/features/api/bookingApi";

import SectionLoader from "@/components/SectionLoader";

import FallbackImage from "@/components/FallbackImage";

const ItemDetails = () => {
  const { productId } = useParams();

  const navigate = useNavigate();

  const [adding, setAdding] = useState(false);

  const [startTime, setStartTime] = useState("");

  const [endTime, setEndTime] = useState("");

  const [deliveryRequired, setDeliveryRequired] = useState(false);

  const [deliveryAddress, setDeliveryAddress] = useState("");

  const { data, isLoading, isError } = useGetProductByIdQuery(productId);

  const { data: favouritesData } = useGetFavouritesQuery();

  const [addToCart] = useAddToCartMutation();

  const [toggleFavourite] = useToggleFavouriteMutation();

  const [createBooking] = useCreateBookingMutation();

  const product = data?.data;

  const favourites = favouritesData?.data?.products || [];

  const isFavourite = favourites.some(
    (fav) => fav._id?.toString() === product?._id?.toString(),
  );

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFAF5] dark:bg-[#2C2C2C]">
        <SectionLoader />
      </div>
    );
  }

  // Error
  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFAF5] dark:bg-[#2C2C2C] text-red-500">
        Product not found
      </div>
    );
  }

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
  const handleFavourite = async () => {
    try {
      await toggleFavourite(product._id).unwrap();

      toast.success(
        isFavourite ? "Removed from favourites" : "Added to favourites",
      );
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
    <section
      className="
        min-h-screen pb-36
        bg-[#FBFAF5]
        text-[#1F2937]
        transition-colors duration-300
        dark:bg-[#2C2C2C]
        dark:text-[#F5F5F5]
        font-['Manrope']
      "
    >
      {/* Back */}
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="
            flex cursor-pointer items-center gap-2
            text-sm font-medium
            text-gray-600
            transition-colors duration-300
            hover:text-[#007200]
            dark:text-gray-300
            dark:hover:text-green-300
          "
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>

      {/* Main */}
      <div
        className="
          mx-auto grid max-w-7xl
          gap-8 px-4 py-8
          lg:grid-cols-2
        "
      >
        {/* Image */}
        <div
          className="
            overflow-hidden rounded-[2rem]
            border border-gray-200
            bg-white
            shadow-[0_10px_40px_rgba(0,0,0,0.06)]
            dark:border-[#4A4A4A]
            dark:bg-[#3A3A3A]
          "
        >
          <div
            className="
              flex h-[350px] sm:h-[450px] md:h-[520px]
              items-center justify-center
              bg-[#F5F5F5]
              dark:bg-[#2C2C2C]
            "
          >
            <FallbackImage
              src={product.images?.[0]}
              alt={product.title}
              className="
                h-[90%] w-[90%]
                object-contain
                transition-transform duration-300
                hover:scale-105
              "
            />
          </div>
        </div>

        {/* Details */}
        <div
          className="
            rounded-[2rem]
            border border-gray-200
            bg-white
            p-6 md:p-8
            shadow-[0_10px_40px_rgba(0,0,0,0.06)]
            dark:border-[#4A4A4A]
            dark:bg-[#3A3A3A]
          "
        >
          {/* Tags */}
          <div className="mb-5 flex flex-wrap gap-3">
            <span
              className="
                rounded-full
                bg-[#007200]/10
                px-4 py-1.5
                text-sm font-semibold
                capitalize
                text-[#007200]
              "
            >
              {product.type}
            </span>

            <span
              className="
                rounded-full
                bg-gray-100
                px-4 py-1.5
                text-sm font-medium
                capitalize
                text-gray-700
                dark:bg-[#2C2C2C]
                dark:text-gray-300
              "
            >
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h1
            className="
              text-4xl md:text-5xl
              font-bold leading-tight
              text-[#007200]
              dark:text-green-300
              font-['Arvo']
            "
          >
            {product.title}
          </h1>

          {/* Description */}
          <p
            className="
              mt-5 text-base leading-relaxed
              text-gray-600
              dark:text-gray-300
            "
          >
            {product.description}
          </p>

          {/* Info */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div
              className="
                rounded-2xl
                border border-gray-200
                bg-[#FBFAF5]
                p-4
                dark:border-[#4A4A4A]
                dark:bg-[#2C2C2C]
              "
            >
              <div className="mb-2 flex items-center gap-2">
                <Package className="h-5 w-5 text-[#007200]" />

                <p className="font-semibold">Category</p>
              </div>

              <p className="text-sm capitalize text-gray-600 dark:text-gray-300">
                {product.category}
              </p>
            </div>

            <div
              className="
                rounded-2xl
                border border-gray-200
                bg-[#FBFAF5]
                p-4
                dark:border-[#4A4A4A]
                dark:bg-[#2C2C2C]
              "
            >
              <div className="mb-2 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#007200]" />

                <p className="font-semibold">Location</p>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300">
                {product.location}
              </p>
            </div>
          </div>

          {/* Pricing */}
          <div className="mt-8 space-y-5">
            {product.type !== "rent" && (
              <div>
                <p className="text-sm text-gray-500">Purchase Price</p>

                <h2
                  className="
                    mt-1 text-4xl
                    font-bold
                    text-[#007200]
                    dark:text-green-300
                    font-['Arvo']
                  "
                >
                  ₹{product.price}
                </h2>
              </div>
            )}

            {product.type !== "sale" && (
              <div>
                <p className="text-sm text-gray-500">Rental Price</p>

                <h2
                  className="
                    mt-1 text-3xl
                    font-bold
                    text-[#007200]
                    dark:text-green-300
                    font-['Arvo']
                  "
                >
                  ₹{product.pricePerHour}/hour
                </h2>
              </div>
            )}
          </div>

          {/* Booking */}
          {product.type !== "sale" && (
            <div
              className="
                mt-10 border-t border-gray-200
                pt-8
                dark:border-[#4A4A4A]
              "
            >
              <div className="mb-6 flex items-center gap-3">
                <Clock3 className="h-6 w-6 text-[#007200]" />

                <h2
                  className="
                    text-2xl font-bold
                    font-['Arvo']
                  "
                >
                  Book Product
                </h2>
              </div>

              <div className="space-y-5">
                {/* Start */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Start Time
                  </label>

                  <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="
                      w-full rounded-2xl
                      border border-gray-200
                      bg-[#FBFAF5]
                      px-4 py-3
                      outline-none transition-all duration-300
                      focus:border-[#007200]
                      focus:ring-4 focus:ring-[#007200]/10
                      dark:border-[#4A4A4A]
                      dark:bg-[#2C2C2C]
                    "
                  />
                </div>

                {/* End */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    End Time
                  </label>

                  <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="
                      w-full rounded-2xl
                      border border-gray-200
                      bg-[#FBFAF5]
                      px-4 py-3
                      outline-none transition-all duration-300
                      focus:border-[#007200]
                      focus:ring-4 focus:ring-[#007200]/10
                      dark:border-[#4A4A4A]
                      dark:bg-[#2C2C2C]
                    "
                  />
                </div>

                {/* Delivery */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={deliveryRequired}
                    onChange={(e) => setDeliveryRequired(e.target.checked)}
                    className="h-4 w-4 accent-[#007200]"
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
                      w-full rounded-2xl
                      border border-gray-200
                      bg-[#FBFAF5]
                      px-4 py-3
                      outline-none transition-all duration-300
                      focus:border-[#007200]
                      focus:ring-4 focus:ring-[#007200]/10
                      dark:border-[#4A4A4A]
                      dark:bg-[#2C2C2C]
                    "
                  />
                )}

                {/* Button */}
                <button
                  onClick={handleBooking}
                  className="
                    w-full cursor-pointer
                    rounded-2xl
                    bg-[#007200]
                    py-3.5
                    font-semibold text-white
                    transition-all duration-300
                    hover:bg-[#04471c]
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
          border-t border-gray-200
          bg-white/90 backdrop-blur-xl
          dark:border-[#4A4A4A]
          dark:bg-[#2C2C2C]/90
        "
      >
        <div
          className="
            mx-auto flex max-w-7xl
            flex-wrap items-center justify-center
            gap-4 px-4 py-4
          "
        >
          {/* Cart */}
          {product.type !== "rent" && (
            <button
              disabled={adding}
              onClick={handleAddToCart}
              className="
                flex cursor-pointer items-center gap-2
                rounded-2xl
                bg-[#007200]
                px-6 py-3
                font-medium text-white
                transition-all duration-300
                hover:bg-[#04471c]
                disabled:opacity-60
              "
            >
              <ShoppingCart className="h-5 w-5" />

              {adding ? "Adding..." : "Add to Cart"}
            </button>
          )}

          {/* Favourite */}
          <Button
            onClick={handleFavourite}
            className={`
              cursor-pointer rounded-2xl
              border px-6 py-3
              font-medium transition-all duration-300
              ${
                isFavourite
                  ? "border-[#007200] bg-[#007200] text-white hover:bg-[#04471c]"
                  : "border-gray-300 bg-white text-black hover:bg-gray-100 dark:border-[#4A4A4A] dark:bg-[#3A3A3A] dark:text-white"
              }
            `}
          >
            <Heart
              className={`
                mr-2 h-4 w-4 transition-all
                ${isFavourite ? "fill-white text-white" : ""}
              `}
            />

            {isFavourite ? "Favourited" : "Favourite"}
          </Button>

          {/* Buy */}
          {product.type !== "rent" && (
            <button
              onClick={() =>
                navigate("/payment", {
                  state: {
                    product,
                  },
                })
              }
              className="
                cursor-pointer rounded-2xl
                border border-[#007200]
                bg-transparent
                px-6 py-3
                font-medium text-[#007200]
                transition-all duration-300
                hover:bg-[#007200]
                hover:text-white
              "
            >
              Buy Now
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ItemDetails;
