import React from "react";
import { useNavigate } from "react-router-dom";

import { ArrowRight } from "lucide-react";

const ProductCard = ({ title, description, path, icon: Icon }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") navigate(path);
      }}
      className="
        group relative cursor-pointer
        overflow-hidden rounded-[2rem]
        border border-gray-200
        bg-white
        p-6
        transition-all duration-300
        hover:-translate-y-1
        hover:border-[#007200]/20
        dark:border-[#3A3A3A]
        dark:bg-[#3A3A3A]
        focus:outline-none
        focus:ring-2 focus:ring-[#007200]/20
        font-['Inter']
      "
    >
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* Top */}
        <div>
          {/* Icon */}
          <div
            className="
              mb-6 flex h-14 w-14
              items-center justify-center
              rounded-2xl
              bg-[#007200]/10
              transition-all duration-300
              group-hover:bg-[#007200]/15
            "
          >
            <Icon className="h-7 w-7 text-[#007200]" />
          </div>

          {/* Title */}
          <h3
            className="
              text-2xl font-bold
              leading-snug
              text-[#007200]
              dark:text-green-300
              font-['Arvo']
            "
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className="
              mt-4 text-sm leading-relaxed
              text-gray-600 dark:text-gray-300
            "
          >
            {description}
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex items-center justify-end">
          <button
            type="button"
            aria-label={`Explore ${title}`}
            onClick={(e) => {
              e.stopPropagation();
              navigate(path);
            }}
            className="
              flex cursor-pointer items-center gap-2
              rounded-2xl
              bg-[#007200]
              px-5 py-2.5
              text-sm font-medium text-white
              transition-all duration-300
              hover:bg-[#04471c]
            "
          >
            Explore
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
