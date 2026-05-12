import React from "react";

import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

import CheckoutButton from "@/components/CheckoutButton";

import { Button } from "@/components/ui/button";

import FallbackImage from "@/components/FallbackImage";

const Payment = () => {
  const { state } = useLocation();

  const product = state?.product;

const user = useSelector((state) => state.auth.user);

const handleMetadata = {
  resourceId: "pending",

  type: "order",

  userId: user?.id || user?._id,

  items: JSON.stringify([
    {
      product: product._id,
      quantity: 1,
      price: product.price,
    },
  ]),

  totalAmount: product.price,
};

// console.log(handleMetadata);

  // No product
  if (!product) {
    return (
      <div
        className="
          min-h-screen
          flex items-center justify-center
          bg-[#FBFAF5]
          px-4
          text-center
          dark:bg-[#2C2C2C]
        "
      >
        <p className="text-lg font-semibold text-red-500">
          No item selected for purchase.
        </p>
      </div>
    );
  }

  return (
    <section
      className="
        min-h-screen
        bg-[#FBFAF5]
        px-4 py-10
        transition-colors duration-300
        dark:bg-[#2C2C2C]
        font-['Manrope']
      "
    >
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p
            className="
              mb-3 text-sm
              font-semibold uppercase tracking-[0.2em]
              text-[#007200]
            "
          >
            Checkout
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
            Payment Summary
          </h1>

          <p
            className="
              mt-4 text-base
              text-gray-600
              dark:text-gray-300
            "
          >
            Review your product details before completing the payment.
          </p>
        </div>

        {/* Card */}
        <div
          className="
            overflow-hidden
            rounded-[2rem]
            border border-gray-200
            bg-white
            shadow-[0_10px_40px_rgba(0,0,0,0.06)]
            dark:border-[#4A4A4A]
            dark:bg-[#3A3A3A]
          "
        >
          {/* Image */}
          <div
            className="
              flex h-72 items-center justify-center
              bg-[#FBFAF5]
              p-6
              dark:bg-[#2C2C2C]
            "
          >
            <FallbackImage
              src={product?.images?.[0]}
              alt={product?.name}
              className="
                h-full w-full
                object-contain
              "
            />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <h2
              className="
                text-3xl font-bold
                text-[#1F2937]
                dark:text-white
                font-['Arvo']
              "
            >
              {product.name}
            </h2>

            <p
              className="
                mt-4 text-base leading-relaxed
                text-gray-600
                dark:text-gray-300
              "
            >
              {product.description}
            </p>

            {/* Price */}
            <div className="mt-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Price
              </p>

              <h3
                className="
                  mt-2 text-4xl
                  font-bold
                  text-[#007200]
                  dark:text-green-300
                  font-['Arvo']
                "
              >
                ₹{product.price}
              </h3>
            </div>

            {/* Actions */}
            <div
              className="
                mt-8 flex flex-col gap-4
                sm:flex-row
              "
            >
              <div className="flex-1">
                <CheckoutButton
                  singleItem={product}
                  label="Proceed to Payment"
                  metadata={handleMetadata}
                />
              </div>

              <Button
                onClick={() => window.history.back()}
                variant="outline"
                className="
                  cursor-pointer
                  rounded-2xl
                  border-[#007200]
                  px-6 py-3
                  font-semibold
                  text-[#007200]
                  transition-all duration-300
                  hover:bg-[#007200]
                  hover:text-white
                  dark:border-green-400
                  dark:text-green-300
                  dark:hover:bg-[#04471c]
                "
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
