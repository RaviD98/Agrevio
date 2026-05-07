import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "./ui/button";

import { Leaf } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section
      className="
        min-h-screen
        bg-[#FBFAF5]
        dark:bg-[#2C2C2C]
        transition-colors duration-300
        px-4 py-10
        font-['Inter']
      "
    >
      <div
        className="
          mx-auto flex min-h-[85vh]
          max-w-5xl flex-col
          items-center justify-center
          text-center
        "
      >
        {/* Icon */}
        {/* <div
          className="
            mb-8 flex h-24 w-24
            items-center justify-center
            rounded-[2rem]
            bg-[#007200]/10
          "
        >
          <Leaf className="h-12 w-12 text-[#007200]" />
        </div> */}

        {/* 404 */}
        <h1
          className="
            text-[6rem] sm:text-[8rem] md:text-[10rem]
            leading-none
            font-bold
            tracking-tight
            text-[#007200]
            dark:text-green-300
            font-['Arvo']
          "
        >
          404
        </h1>

        {/* Heading */}
        <h2
          className="
            mt-6 text-3xl md:text-5xl
            font-bold leading-tight
            text-[#1f2937]
            dark:text-white
            font-['Arvo']
          "
        >
          Page Not Found
        </h2>

        {/* Description */}
        <p
          className="
            mt-5 max-w-2xl
            text-base md:text-lg
            leading-relaxed
            text-gray-600 dark:text-gray-300
          "
        >
          The page you’re looking for may have been moved, deleted, or doesn’t
          exist anymore.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => navigate("/")}
            className="
              cursor-pointer
              rounded-2xl
              bg-[#007200]
              px-8 py-6
              text-base font-medium text-white
              transition-all duration-300
              hover:bg-[#04471c]
            "
          >
            Back to Home
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="
              cursor-pointer
              rounded-2xl
              border-gray-300
              bg-white
              px-8 py-6
              text-base
              text-[#1f2937]
              transition-all duration-300
              hover:bg-gray-100
              dark:border-[#3A3A3A]
              dark:bg-[#3A3A3A]
              dark:text-white
              dark:hover:bg-[#444]
            "
          >
            Go Back
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
