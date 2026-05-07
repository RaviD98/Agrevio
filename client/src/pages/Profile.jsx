import React from "react";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Heart,
  ChevronRight,
} from "lucide-react";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

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
            Account
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
            My Profile
          </h1>

          <p
            className="
              mt-4 text-base
              text-gray-600
              dark:text-gray-300
            "
          >
            Manage your personal information and account activity.
          </p>
        </div>

        {/* Profile Card */}
        <Card
          className="
            rounded-[2rem]
            border border-gray-200
            bg-white
            shadow-[0_10px_40px_rgba(0,0,0,0.06)]
            dark:border-[#4A4A4A]
            dark:bg-[#3A3A3A]
          "
        >
          <CardContent
            className="
              flex flex-col gap-8
              p-6 md:flex-row md:items-center md:p-10
            "
          >
            {/* Avatar */}
            <div
              className="
                flex h-28 w-28 items-center justify-center
                rounded-full
                bg-[#007200]
                text-3xl font-bold text-white
                font-['Arvo']
              "
            >
              {user?.name?.slice(0, 2).toUpperCase()}
            </div>

            {/* Details */}
            <div className="flex-1">
              <h2
                className="
                  text-3xl font-bold
                  text-[#1F2937]
                  dark:text-white
                  font-['Arvo']
                "
              >
                {user?.name}
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <Mail size={18} />
                  <span>{user?.email}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <Phone size={18} />
                  <span>+91 XXXXXXXXXX</span>
                </div>

                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <MapPin size={18} />
                  <span>India</span>
                </div>
              </div>

              {/* Button */}
              {/* <Button
                className="
                  mt-8
                  cursor-pointer
                  rounded-2xl
                  bg-[#007200]
                  px-6 py-3
                  text-white
                  transition-all duration-300
                  hover:bg-[#04471c]
                "
              >
                Edit Profile
              </Button> */}
            </div>
          </CardContent>
        </Card>

        {/* Links */}
        <div
          className="
            mt-10
            rounded-[2rem]
            border border-gray-200
            bg-white
            p-4
            shadow-[0_10px_40px_rgba(0,0,0,0.05)]
            dark:border-[#4A4A4A]
            dark:bg-[#3A3A3A]
          "
        >
          <Link
            to="/orders"
            className="
              flex cursor-pointer items-center justify-between
              rounded-2xl
              px-4 py-4
              transition-all duration-300
              hover:bg-[#F4F1E8]
              dark:hover:bg-[#2C2C2C]
            "
          >
            <div className="flex items-center gap-4">
              <ShoppingBag className="text-[#007200]" size={22} />

              <div>
                <h3
                  className="
                    text-lg font-bold
                    text-[#1F2937]
                    dark:text-white
                    font-['Arvo']
                  "
                >
                  My Orders
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  View your order history
                </p>
              </div>
            </div>

            <ChevronRight className="text-gray-400" />
          </Link>

          <div className="my-2 h-px bg-gray-200 dark:bg-[#4A4A4A]" />

          <Link
            to="/favourites"
            className="
              flex cursor-pointer items-center justify-between
              rounded-2xl
              px-4 py-4
              transition-all duration-300
              hover:bg-[#F4F1E8]
              dark:hover:bg-[#2C2C2C]
            "
          >
            <div className="flex items-center gap-4">
              <Heart className="text-red-500" size={22} />

              <div>
                <h3
                  className="
                    text-lg font-bold
                    text-[#1F2937]
                    dark:text-white
                    font-['Arvo']
                  "
                >
                  Wishlist
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your saved favourite products
                </p>
              </div>
            </div>

            <ChevronRight className="text-gray-400" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Profile;
