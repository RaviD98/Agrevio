import React from "react";

import { useGetUserDeliveriesQuery } from "@/features/api/deliveryApi";

const Deliveries = () => {
  const { data, isLoading, isError } = useGetUserDeliveriesQuery();

  const deliveries = data?.data || [];

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading deliveries...</p>
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load deliveries.</p>
      </div>
    );
  }

  // Empty
  if (!deliveries.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#edf7f6] dark:bg-[#121212]">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-3">
            No Deliveries Yet
          </h1>

          <p className="text-gray-600 dark:text-gray-400">
            Your deliveries will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#edf7f6] dark:bg-[#121212] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-8 text-green-700 dark:text-green-300">
          My Deliveries
        </h1>

        {/* List */}
        <div className="space-y-8">
          {deliveries.map((delivery) => {
            const isOrder = !!delivery.order;

            const product = isOrder
              ? delivery.order?.items?.[0]?.product
              : delivery.booking?.product;

            return (
              <div
                key={delivery._id}
                className="bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-lg p-6 border dark:border-[#2A2A2A]"
              >
                {/* Top */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-green-700 dark:text-green-300">
                      Delivery #{delivery._id.slice(-6)}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1 capitalize">
                      {delivery.deliveryStatus}
                    </p>
                  </div>

                  <div className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium capitalize">
                    {isOrder ? "Order Delivery" : "Booking Delivery"}
                  </div>
                </div>

                {/* Product */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Left */}
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        product?.images?.[0] || "https://placehold.co/120x120"
                      }
                      alt={product?.title}
                      className="w-24 h-24 rounded-xl object-cover"
                    />

                    <div>
                      <h3 className="text-xl font-semibold">
                        {product?.title}
                      </h3>

                      <p className="text-gray-500 capitalize">
                        {product?.category}
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Delivery Charge</p>

                    <p className="font-semibold text-lg mb-3">
                      ₹{delivery.deliveryCharge}
                    </p>

                    <p className="text-sm text-gray-500">Created</p>

                    <p className="font-medium">
                      {new Date(delivery.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="mt-6 pt-6 border-t dark:border-[#2A2A2A]">
                  <p className="text-sm text-gray-500 mb-2">Delivery Address</p>

                  <p className="font-medium">{delivery.address}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Deliveries;
