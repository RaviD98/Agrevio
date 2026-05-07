import React from "react";

import { toast } from "sonner";

import {
  useGetBookingsQuery,
  useCancelBookingMutation,
} from "@/features/api/bookingApi";

import CheckoutButton from "@/components/CheckoutButton";

import SectionLoader from "@/components/SectionLoader";

import EmptyState from "@/components/EmptyState";

import FallbackImage from "@/components/FallbackImage";

import { PiPhoneX } from "react-icons/pi";

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
      <div className="min-h-screen flex items-center justify-center bg-[#FBFAF5] dark:bg-[#2C2C2C]">
        <SectionLoader />
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFAF5] dark:bg-[#2C2C2C]">
        <p className="text-red-500">Failed to load bookings.</p>
      </div>
    );
  }

  // Empty
  if (!bookings.length) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center bg-[#FBFAF5] dark:bg-[#2C2C2C]">
        <EmptyState
          icon={<PiPhoneX className="text-8xl" />}
          title="No bookings yet"
          description="Your rental bookings will appear here."
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
            Rentals
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
            My Bookings
          </h1>

          <p
            className="
              mt-4 text-base
              text-gray-600
              dark:text-gray-300
            "
          >
            Track your rented products, booking duration, and payment status.
          </p>
        </div>

        {/* List */}
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
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
                    Booking #{booking._id.slice(-6)}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(booking.createdAt).toLocaleString()}
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
                    {booking.bookingStatus}
                  </span>

                  <span
                    className="
                      rounded-full
                      bg-green-100
                      px-4 py-1.5
                      text-sm font-semibold
                      capitalize
                      text-green-700
                    "
                  >
                    Payment: {booking.paymentStatus}
                  </span>
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
                    src={booking.product?.images?.[0]}
                    alt={booking.product?.title}
                    className="
                      h-28 w-28
                      rounded-2xl
                      object-cover
                      border border-gray-200
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
                      {booking.product?.title}
                    </h3>

                    <p
                      className="
                        mt-2 capitalize
                        text-gray-500
                        dark:text-gray-400
                      "
                    >
                      {booking.product?.category}
                    </p>

                    <p
                      className="
                        mt-3 text-lg font-semibold
                        text-[#007200]
                        dark:text-green-300
                      "
                    >
                      ₹{booking.product?.pricePerHour}/hour
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
                      Start Time
                    </p>

                    <p className="mt-1 font-medium">
                      {new Date(booking.startTime).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      End Time
                    </p>

                    <p className="mt-1 font-medium">
                      {new Date(booking.endTime).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom */}
              <div
                className="
                  mt-8 flex flex-col gap-5
                  border-t border-gray-200
                  pt-6
                  lg:flex-row lg:items-center lg:justify-between
                  dark:border-[#4A4A4A]
                "
              >
                {/* Info */}
                <div className="flex flex-wrap gap-8">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total Hours
                    </p>

                    <p className="mt-1 text-lg font-semibold">
                      {booking.totalHours} hrs
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total Amount
                    </p>

                    <h3
                      className="
                        mt-1 text-3xl font-bold
                        text-[#007200]
                        dark:text-green-300
                        font-['Arvo']
                      "
                    >
                      ₹{booking.totalAmount}
                    </h3>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  {/* Pay */}
                  {booking.paymentStatus === "pending" &&
                    booking.bookingStatus !== "cancelled" && (
                      <CheckoutButton
                        label="Pay Now"
                        metadata={{
                          type: "booking",

                          resourceId: booking._id,
                        }}
                        singleItem={{
                          title: booking.product?.title,

                          price: booking.totalAmount,
                        }}
                      />
                    )}

                  {/* Cancel */}
                  {booking.bookingStatus !== "cancelled" && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="
                        cursor-pointer
                        rounded-2xl
                        bg-red-600
                        px-5 py-3
                        text-sm font-semibold text-white
                        transition-all duration-300
                        hover:bg-red-700
                      "
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bookings;
