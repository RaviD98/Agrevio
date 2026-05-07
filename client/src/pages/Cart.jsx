import React from "react";

import {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useClearCartMutation,
} from "@/features/api/cartApi";

import { Button } from "@/components/ui/button";

import CheckoutButton from "@/components/CheckoutButton";

import SectionLoader from "@/components/SectionLoader";

import EmptyState from "@/components/EmptyState";

import FallbackImage from "@/components/FallbackImage";

import { LiaTractorSolid } from "react-icons/lia";

const Cart = () => {
  const { data, isLoading, isError } = useGetCartQuery();

  const [removeFromCart] = useRemoveFromCartMutation();

  const [clearCart] = useClearCartMutation();

  const cartItems = data?.data?.items || [];

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.product.price || 0) * item.quantity,
    0,
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFAF5] dark:bg-[#2C2C2C]">
        <SectionLoader />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFAF5] dark:bg-[#2C2C2C]">
        <p className="text-red-500">Failed to load cart.</p>
      </div>
    );
  }

  // Empty cart
  if (!cartItems.length) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center bg-[#FBFAF5] dark:bg-[#2C2C2C]">
        <EmptyState
          icon={<LiaTractorSolid className="text-8xl" />}
          title="Your cart is empty"
          description="Add products to continue shopping."
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
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10">
          <p
            className="
              mb-3 text-sm
              font-semibold uppercase tracking-[0.2em]
              text-[#007200]
            "
          >
            Shopping
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
            Your Cart
          </h1>

          <p
            className="
              mt-4 text-base
              text-gray-600
              dark:text-gray-300
            "
          >
            Review your selected agricultural products before checkout.
          </p>
        </div>

        {/* Cart Container */}
        <div
          className="
            rounded-[2rem]
            border border-gray-200
            bg-white
            p-5 md:p-8
            shadow-[0_10px_40px_rgba(0,0,0,0.06)]
            dark:border-[#4A4A4A]
            dark:bg-[#3A3A3A]
          "
        >
          {/* Cart Items */}
          <div className="space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.product._id}
                className="
                  flex flex-col gap-5
                  rounded-3xl
                  border border-gray-200
                  bg-[#FBFAF5]
                  p-5
                  transition-all duration-300
                  sm:flex-row sm:items-center sm:justify-between
                  dark:border-[#4A4A4A]
                  dark:bg-[#2C2C2C]
                "
              >
                {/* Left */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  {/* Image */}
                  <FallbackImage
                    src={item.product?.images?.[0]}
                    alt={item.product?.title}
                    className="
                      h-24 w-24
                      rounded-2xl
                      border border-gray-200
                      object-cover
                      dark:border-[#4A4A4A]
                    "
                  />

                  {/* Info */}
                  <div>
                    <h3
                      className="
                        text-2xl font-bold
                        text-[#1F2937]
                        dark:text-white
                        font-['Arvo']
                      "
                    >
                      {item.product.title}
                    </h3>

                    <p
                      className="
                        mt-2 text-sm capitalize
                        text-gray-500
                        dark:text-gray-400
                      "
                    >
                      {item.product.category}
                    </p>

                    <p
                      className="
                        mt-3 text-base
                        text-gray-700
                        dark:text-gray-300
                      "
                    >
                      ₹{item.product.price} × {item.quantity}
                    </p>

                    <p
                      className="
                        mt-1 text-lg font-semibold
                        text-[#007200]
                        dark:text-green-300
                      "
                    >
                      ₹{item.product.price * item.quantity}
                    </p>
                  </div>
                </div>

                {/* Remove */}
                <Button
                  variant="destructive"
                  onClick={() => removeFromCart(item.product._id)}
                  className="
                    cursor-pointer
                    rounded-2xl
                    px-5 py-2.5
                    text-sm font-semibold
                  "
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div
            className="
              mt-8 flex flex-col gap-6
              border-t border-gray-200
              pt-6
              lg:flex-row lg:items-center lg:justify-between
              dark:border-[#4A4A4A]
            "
          >
            {/* Total */}
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Amount
              </p>

              <h2
                className="
                  mt-2 text-4xl
                  font-bold
                  text-[#007200]
                  dark:text-green-300
                  font-['Arvo']
                "
              >
                ₹{totalPrice}
              </h2>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <CheckoutButton
                metadata={{
                  type: "order",
                  resourceId: "pending",
                }}
              />

              <Button
                onClick={() => clearCart()}
                className="
                  cursor-pointer
                  rounded-2xl
                  bg-[#007200]
                  px-6 py-3
                  text-white font-semibold
                  transition-all duration-300
                  hover:bg-[#04471c]
                "
              >
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
