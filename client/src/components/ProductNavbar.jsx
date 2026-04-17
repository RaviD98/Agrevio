import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Leaf,
  Droplet,
  Hammer,
  Wrench,
  Bug,
  Home,
  Coffee,
  Archive,
} from "lucide-react";

const productCategories = [
  { label: "Quality Seeds", path: "/products/seeds", icon: Leaf },
  { label: "Irrigation", path: "/products/irrigation", icon: Droplet },
  { label: "Machinery", path: "/products/machinery", icon: Hammer },
  { label: "Farm Tools", path: "/products/tools", icon: Wrench },
  { label: "Fertilizers", path: "/products/fertilizers", icon: Leaf },
  { label: "Pesticides", path: "/products/pesticides", icon: Bug },
  { label: "Greenhouse", path: "/products/greenhouse", icon: Home },
  { label: "Animal Feed", path: "/products/feed", icon: Coffee },
  { label: "Storage", path: "/products/storage", icon: Archive },
];

const ProductNavbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="w-full bg-[#edf7f6] dark:bg-[#121212] border-b border-green-200/50 dark:border-green-800/50">
      <ul className="flex md:grid md:grid-cols-9 overflow-x-auto md:overflow-visible snap-x snap-mandatory">
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
                flex flex-col items-center justify-center
                px-6 py-4 flex-shrink-0 md:flex-shrink
                cursor-pointer select-none snap-center
                transition duration-200
                ${
                  isActive
                    ? "text-green-700 dark:text-green-300"
                    : "text-green-900 dark:text-green-400"
                }
                hover:text-[#68d388] dark:hover:text-[#68d388]
              `}
            >
              <Icon
                className={`w-6 h-6 mb-1 transition-transform ${
                  isActive ? "-translate-y-[2px]" : ""
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  isActive ? "underline underline-offset-4" : ""
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ProductNavbar;
