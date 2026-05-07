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
        group relative cursor-pointer overflow-hidden
        rounded-3xl border border-neutral-200
        bg-white/80 p-6 backdrop-blur-sm
        shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-2xl
        dark:border-neutral-800 dark:bg-[#222225]
        focus:outline-none focus:ring-2
        focus:ring-green-500
      "
    >
      {/* Glow Effect */}
      <div
        className="
          absolute inset-0 opacity-0 transition-opacity duration-300
          group-hover:opacity-100
          bg-gradient-to-br from-green-500/5 via-transparent to-transparent
        "
      />

      {/* Top Section */}
      <div className="relative z-10 flex items-start justify-between gap-4">
        {/* Icon + Title */}
        <div className="flex items-start gap-4">
          <div
            className="
              flex h-14 w-14 items-center justify-center
              rounded-2xl bg-green-100
              text-green-700
              transition-transform duration-300
              group-hover:scale-110
              dark:bg-green-900/30 dark:text-green-300
            "
          >
            <Icon className="h-7 w-7" />
          </div>

          <div>
            <h3
              className="
                text-xl font-semibold tracking-tight
                text-neutral-900 dark:text-neutral-100
              "
            >
              {title}
            </h3>

            <p
              className="
                mt-3 max-w-sm text-sm leading-relaxed
                text-neutral-600 dark:text-neutral-400
              "
            >
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10 mt-6 flex items-center justify-between">
        <span
          className="
            text-sm font-medium
            text-green-700 dark:text-green-400
          "
        >
          {/* Explore category */}
        </span>

        <button
          type="button"
          aria-label={`Explore ${title}`}
          onClick={(e) => {
            e.stopPropagation();
            navigate(path);
          }}
          className="
            flex items-center gap-2
            rounded-xl bg-green-600 px-4 py-2
            text-sm font-medium text-white
            transition-all duration-300
            hover:bg-green-700
            hover:gap-3
            focus:outline-none
          "
        >
          Explore
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;