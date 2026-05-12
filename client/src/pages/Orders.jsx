import React from "react";

import { useGetOrdersQuery } from "@/features/api/orderApi";

import EmptyState from "@/components/EmptyState";

import SectionLoader from "@/components/SectionLoader";

import FallbackImage from "@/components/FallbackImage";

import { BsCartX } from "react-icons/bs";

const Orders = () => {
  const { data, isLoading, isError } = useGetOrdersQuery();

  const orders = data?.data || [];

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFAF5] dark:bg-[#2C2C2C]">
        <SectionLoader />
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFAF5] dark:bg-[#2C2C2C]">
        <p className="text-red-500 text-lg">Failed to load orders.</p>
      </div>
    );
  }

  // Empty
  if (!orders.length) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center bg-[#FBFAF5] dark:bg-[#2C2C2C]">
        <EmptyState
          icon={<BsCartX className="text-8xl" />}
          title="No orders yet"
          description="Your purchased products will appear here."
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
            Purchase History
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
            My Orders
          </h1>

          <p
            className="
              mt-4 text-base
              text-gray-600
              dark:text-gray-300
            "
          >
            View all your purchased agricultural products and payment details.
          </p>
        </div>

        {/* Orders */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order?._id}
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
                    Order #{order?._id.slice(-6)}
                  </h2>

                  <p
                    className="
                      mt-2 text-sm
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Status */}
                <div className="flex flex-wrap gap-3">
                  <span
                    className="
                      rounded-full
                      bg-yellow-100
                      px-4 py-1.5
                      text-sm font-semibold
                      capitalize
                      text-yellow-700
                    "
                  >
                    {order.status}
                  </span>

                  <span
                    className="
                      rounded-full
                      bg-green-100
                      px-4 py-1.5
                      text-sm font-semibold
                      text-green-700
                    "
                  >
                    Payment: {order.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="mt-8 space-y-5">
                {order.items?.map((item, index) => (
                  <div
                    key={item?._id || `${order._id}-${index}`}
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
                    {/* Product */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
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

                      <div>
                        <h3
                          className="
                            text-2xl font-bold
                            text-[#1F2937]
                            dark:text-white
                            font-['Arvo']
                          "
                        >
                          {item.product?.title}
                        </h3>

                        <p
                          className="
                            mt-2 text-sm capitalize
                            text-gray-500
                            dark:text-gray-400
                          "
                        >
                          {item.product?.category}
                        </p>

                        <p
                          className="
                            mt-3 text-sm
                            text-gray-700
                            dark:text-gray-300
                          "
                        >
                          Quantity: {item?.quantity}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="sm:text-right">
                      <p
                        className="
                          text-3xl font-bold
                          text-[#007200]
                          dark:text-green-300
                          font-['Arvo']
                        "
                      >
                        ₹{item.price * item.quantity}
                      </p>

                      <p
                        className="
                          mt-1 text-sm
                          text-gray-500
                          dark:text-gray-400
                        "
                      >
                        ₹{item.price} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div
                className="
                  mt-8 flex justify-end
                  border-t border-gray-200
                  pt-6
                  dark:border-[#4A4A4A]
                "
              >
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Amount
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
                    ₹{order.totalAmount}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Orders;
