import React from "react";

import { useGetUserDeliveriesQuery } from "@/features/api/deliveryApi";

import LoadingScreen from "@/components/LoadingScreen";

import EmptyState from "@/components/EmptyState";

import FallbackImage from "@/components/FallbackImage";

import { TbTruckDelivery } from "react-icons/tb";

const Deliveries = () => {
  const { data, isLoading, isError } = useGetUserDeliveriesQuery();

  const deliveries = data?.data || [];

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFAF5] dark:bg-[#2C2C2C]">
        <LoadingScreen />
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFAF5] dark:bg-[#2C2C2C]">
        <p className="text-red-500 text-lg">Failed to load deliveries.</p>
      </div>
    );
  }

  // Empty
  if (!deliveries.length) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center bg-[#FBFAF5] dark:bg-[#2C2C2C]">
        <EmptyState
          icon={<TbTruckDelivery className="text-8xl" />}
          title="No deliveries yet"
          description="Your deliveries will appear here."
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
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <p
            className="
              mb-3 text-sm
              font-semibold uppercase tracking-[0.2em]
              text-[#007200]
            "
          >
            Delivery Tracking
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
            My Deliveries
          </h1>

          <p
            className="
              mt-4 text-base
              text-gray-600
              dark:text-gray-300
            "
          >
            Track your order and booking deliveries in one place.
          </p>
        </div>

        {/* Delivery List */}
        <div className="space-y-6">
          {deliveries.map((delivery) => {
            const isOrder = !!delivery.order;

            const product = isOrder
              ? delivery.order?.items?.[0]?.product
              : delivery.booking?.product;

            return (
              <div
                key={delivery._id}
                className="
                  rounded-[2rem]
                  border border-gray-200
                  bg-white
                  p-5 md:p-7
                  shadow-[0_10px_40px_rgba(0,0,0,0.06)]
                  transition-all duration-300
                  dark:border-[#4A4A4A]
                  dark:bg-[#3A3A3A]
                "
              >
                {/* Top */}
                <div
                  className="
                    flex flex-col gap-5
                    md:flex-row md:items-start md:justify-between
                  "
                >
                  {/* Left */}
                  <div>
                    <h2
                      className="
                        text-2xl font-bold
                        text-[#007200]
                        dark:text-green-300
                        font-['Arvo']
                      "
                    >
                      Delivery #{delivery._id.slice(-6)}
                    </h2>

                    <p
                      className="
                        mt-2 capitalize
                        text-sm text-gray-500
                        dark:text-gray-400
                      "
                    >
                      {delivery.deliveryStatus}
                    </p>
                  </div>

                  {/* Type Badge */}
                  <div
                    className="
                      w-fit rounded-full
                      bg-blue-100
                      px-4 py-1.5
                      text-sm font-semibold
                      text-blue-700
                    "
                  >
                    {isOrder ? "Order Delivery" : "Booking Delivery"}
                  </div>
                </div>

                {/* Product */}
                <div
                  className="
                    mt-8 flex flex-col gap-6
                    lg:flex-row lg:items-center lg:justify-between
                  "
                >
                  {/* Left */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <FallbackImage
                      src={product?.images?.[0]}
                      alt={product?.title}
                      className="
                        h-28 w-28
                        rounded-2xl
                        border border-gray-200
                        object-cover
                        dark:border-[#4A4A4A]
                      "
                    />

                    <div>
                      <h3
                        className="
                          text-2xl font-bold
                          text-[#1F2937]
                          dark:text-white
                          font-['Arvo']
                        "
                      >
                        {product?.title}
                      </h3>

                      <p
                        className="
                          mt-2 capitalize
                          text-gray-500
                          dark:text-gray-400
                        "
                      >
                        {product?.category}
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div
                    className="
                      rounded-2xl
                      bg-[#FBFAF5]
                      p-5
                      dark:bg-[#2C2C2C]
                    "
                  >
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Delivery Charge
                      </p>

                      <p
                        className="
                          mt-1 text-2xl font-bold
                          text-[#007200]
                          dark:text-green-300
                          font-['Arvo']
                        "
                      >
                        ₹{delivery.deliveryCharge}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Created At
                      </p>

                      <p className="mt-1 font-medium">
                        {new Date(delivery.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div
                  className="
                    mt-8 border-t border-gray-200
                    pt-6
                    dark:border-[#4A4A4A]
                  "
                >
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    Delivery Address
                  </p>

                  <p
                    className="
                      text-base leading-relaxed
                      text-[#1F2937]
                      dark:text-white
                    "
                  >
                    {delivery.address}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Deliveries;
