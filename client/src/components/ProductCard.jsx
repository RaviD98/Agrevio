import React from "react";
import { useNavigate } from "react-router-dom";

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
        cursor-pointer rounded-lg p-4
        bg-[#edf7f6] dark:bg-[#121212]
        shadow-md dark:shadow-black/50
        transition
        duration-300
        hover:shadow-lg hover:scale-[1.03]
        focus:outline-none focus:ring-4
        focus:ring-green-300 dark:focus:ring-green-600
        select-none
        flex flex-col justify-between
        min-h-[150px]
      "
    >
      <div className="flex items-center justify-between mb-3">
        <h3
          className="
            flex items-center gap-3
            text-green-700 dark:text-green-400
            font-semibold text-lg
            transition-colors
            group-hover:text-green-600
          "
        >
          <Icon className="w-7 h-7" />
          {title}
        </h3>
        <button
          type="button"
          aria-label={`Explore ${title}`}
          className="
            bg-[#68d388] dark:bg-green-700
            text-white font-semibold
            px-3 py-1.5 rounded-md
            shadow-md
            transition
            hover:bg-green-600 dark:hover:bg-green-600
            focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600
          "
          onClick={(e) => {
            e.stopPropagation();
            navigate(path);
          }}
        >
          Explore
        </button>
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ProductCard;
