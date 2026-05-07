import React from "react";

import { useNavigate, useLocation } from "react-router-dom";

import {
  GiWheat,
  GiWateringCan,
  GiFarmTractor,
  GiToolbox,
  GiPlantRoots,
  GiBugNet,
  GiGreenhouse,
  GiSittingDog,
  GiWoodPile,
} from "react-icons/gi";

const productCategories = [
  {
    label: "Quality Seeds",
    path: "/products/category/seeds",
    icon: GiWheat,
  },
  {
    label: "Irrigation",
    path: "/products/category/irrigation",
    icon: GiWateringCan,
  },
  {
    label: "Machinery",
    path: "/products/category/machinery",
    icon: GiFarmTractor,
  },
  {
    label: "Farm Tools",
    path: "/products/category/tools",
    icon: GiToolbox,
  },
  {
    label: "Fertilizers",
    path: "/products/category/fertilizers",
    icon: GiPlantRoots,
  },
  {
    label: "Pesticides",
    path: "/products/category/pesticides",
    icon: GiBugNet,
  },
  {
    label: "Greenhouse",
    path: "/products/category/greenhouse",
    icon: GiGreenhouse,
  },
  {
    label: "Animal Feed",
    path: "/products/category/feed",
    icon: GiSittingDog,
  },
  {
    label: "Storage",
    path: "/products/category/storage",
    icon: GiWoodPile,
  },
];

const ProductNavbar = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  return (
    <nav
      className="
        w-full
        border-b border-gray-200
        bg-[#FBFAF5]
        dark:border-[#3A3A3A]
        dark:bg-[#2C2C2C]
        transition-colors duration-300
        font-['Inter']
      "
    >
      <div className="max-w-7xl mx-auto">
        <ul
          className="
            flex overflow-x-auto
            md:grid md:grid-cols-9
            gap-2
            px-4 py-3
            scrollbar-hide
          "
        >
          {productCategories.map(({ label, path, icon: Icon }) => {
            const isActive = pathname.startsWith(path);

            return (
              <li
                key={path}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate(path)}
                onClick={() => navigate(path)}
                title={label}
                className={`
                  group flex min-w-[110px] cursor-pointer
                  flex-col items-center justify-center
                  rounded-2xl px-4 py-4
                  text-center transition-all duration-300
                  ${
                    isActive
                      ? "bg-[#007200] text-white"
                      : "text-gray-700 hover:bg-[#007200]/10 hover:text-[#007200] dark:text-gray-200"
                  }
                `}
              >
                <Icon
                  className={`
                    mb-2 text-2xl transition-transform duration-300
                    ${isActive ? "scale-110" : "group-hover:scale-105"}
                  `}
                />

                <span
                  className={`
                    text-sm font-medium leading-tight
                    ${isActive ? "font-semibold" : ""}
                  `}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default ProductNavbar;
