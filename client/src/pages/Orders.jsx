import React from "react";

import { useGetOrdersQuery } from "@/features/api/orderApi";
import LoadingScreen from "@/components/LoadingScreen";

const Orders = () => {
  const { data, isLoading, isError } = useGetOrdersQuery();

  const orders = data?.data || [];

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingScreen />
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load orders.</p>
      </div>
    );
  }

  // Empty
  if (!orders.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#edf7f6] dark:bg-[#121212]">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-3">
            No Orders Yet
          </h1>

          <p className="text-gray-600 dark:text-gray-400">
            Your order history will appear here.
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
          My Orders
        </h1>

        {/* Orders */}
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-lg p-6 border dark:border-[#2A2A2A]"
            >
              {/* Top */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-green-700 dark:text-green-300">
                    Order #{order._id.slice(-6)}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-4 flex-wrap">
                  <span className="px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
                    {order.status}
                  </span>

                  <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                    Payment: {order.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b dark:border-[#2A2A2A] pb-4"
                  >
                    {/* Product */}
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          item.product?.images?.[0] ||
                          "https://placehold.co/120x120"
                        }
                        alt={item.product?.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />

                      <div>
                        <h3 className="font-semibold text-lg">
                          {item.product?.title}
                        </h3>

                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>

                        <p className="text-sm text-gray-500 capitalize">
                          {item.product?.category}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-semibold text-green-700 text-lg">
                        ₹{item.price * item.quantity}
                      </p>

                      <p className="text-sm text-gray-500">
                        ₹{item.price} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-end mt-6">
                <div className="text-right">
                  <p className="text-gray-500 text-sm">Total Amount</p>

                  <h3 className="text-3xl font-bold text-green-700 dark:text-green-300">
                    ₹{order.totalAmount}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
