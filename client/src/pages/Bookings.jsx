import React from "react";

import { toast } from "sonner";

import {
  useGetBookingsQuery,
  useCancelBookingMutation,
} from "@/features/api/bookingApi";

const Bookings = () => {
  const { data, isLoading, isError } = useGetBookingsQuery();

  const [cancelBooking] = useCancelBookingMutation();

  const bookings = data?.data || [];

  // Cancel
  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId).unwrap();

      toast.success("Booking cancelled successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to cancel booking");
    }
  };

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading bookings...</p>
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load bookings.</p>
      </div>
    );
  }

  // Empty
  if (!bookings.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#edf7f6] dark:bg-[#121212]">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-3">
            No Bookings Yet
          </h1>

          <p className="text-gray-600 dark:text-gray-400">
            Your rental bookings will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#edf7f6] dark:bg-[#121212] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-8 text-blue-700 dark:text-blue-300">
          My Bookings
        </h1>

        {/* List */}
        <div className="space-y-8">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-lg p-6 border dark:border-[#2A2A2A]"
            >
              {/* Top */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300">
                    Booking #{booking._id.slice(-6)}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(booking.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-4 flex-wrap">
                  <span className="px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium capitalize">
                    {booking.bookingStatus}
                  </span>

                  <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium capitalize">
                    Payment: {booking.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Product */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                {/* Left */}
                <div className="flex items-center gap-4">
                  <img
                    src={
                      booking.product?.images?.[0] ||
                      "https://placehold.co/120x120"
                    }
                    alt={booking.product?.title}
                    className="w-24 h-24 rounded-xl object-cover"
                  />

                  <div>
                    <h3 className="text-xl font-semibold">
                      {booking.product?.title}
                    </h3>

                    <p className="text-gray-500 capitalize">
                      {booking.product?.category}
                    </p>

                    <p className="text-blue-700 font-medium">
                      ₹{booking.product?.pricePerHour}
                      /hour
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="text-right">
                  <p className="text-sm text-gray-500">Start</p>

                  <p className="font-medium mb-3">
                    {new Date(booking.startTime).toLocaleString()}
                  </p>

                  <p className="text-sm text-gray-500">End</p>

                  <p className="font-medium">
                    {new Date(booking.endTime).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Bottom */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 pt-6 border-t dark:border-[#2A2A2A] gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Total Hours</p>

                  <p className="font-semibold text-lg">
                    {booking.totalHours} hrs
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Total Amount</p>

                  <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                    ₹{booking.totalAmount}
                  </h3>
                </div>

                {/* Cancel */}
                {booking.bookingStatus !== "cancelled" && (
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
