import React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Home,
  PackageOpen,
  Info,
  Phone,
  ShoppingCart,
  Leaf,
  Droplet,
  Hammer,
  Wrench,
  Bug,
  Archive,
  Users,
  Store,
  ChevronRight,
} from "lucide-react";

const iconMap = {
  home: <Home className="w-4 h-4" />,
  products: <Store className="w-4 h-4" />,
  about: <Info className="w-4 h-4" />,
  contact: <Phone className="w-4 h-4" />,
  cart: <ShoppingCart className="w-4 h-4" />,
  seeds: <Leaf className="w-4 h-4" />,
  irrigation: <Droplet className="w-4 h-4" />,
  machinery: <Hammer className="w-4 h-4" />,
  tools: <Wrench className="w-4 h-4" />,
  pesticides: <Bug className="w-4 h-4" />,
  storage: <Archive className="w-4 h-4" />,
  team: <Users className="w-4 h-4" />,
};

const Breadcrumb = () => {
  const { pathname } = useLocation();

  const rawPathnames = pathname.split("/").filter(Boolean);

  const pathnames = rawPathnames.filter(
    (segment) => segment !== "category" && segment !== "item",
  );

  const isMongoId = (value) => /^[0-9a-fA-F]{24}$/.test(value);

  return (
    <nav
      className="
        sticky top-0 z-40
        border-b border-gray-200
        bg-[#FBFAF5]/90
        backdrop-blur-md
        dark:border-[#3A3A3A]
        dark:bg-[#2C2C2C]/90
      "
    >
      <div
        className="
          mx-auto flex max-w-7xl
          items-center gap-2
          overflow-x-auto
          whitespace-nowrap
          px-4 py-4
          text-sm
          scrollbar-hide
          font-['Inter']
        "
      >
        {/* Home */}
        <Link
          to="/"
          className="
            flex items-center gap-2
            rounded-full px-3 py-1.5
            font-medium
            text-[#007200]
            transition-all duration-200
            hover:bg-[#007200]/10
            hover:text-[#04471c]
            dark:text-green-300
          "
        >
          <Home className="w-4 h-4" />
          Home
        </Link>

        {/* Dynamic Breadcrumbs */}
        {pathnames.map((name, idx) => {
          const routeTo = `/${rawPathnames.slice(0, idx + 1).join("/")}`;

          const isLast = idx === pathnames.length - 1;

          const icon = iconMap[name.toLowerCase()] || (
            <PackageOpen className="w-4 h-4" />
          );

          const label = isMongoId(name)
            ? "Product Details"
            : name.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());

          return (
            <React.Fragment key={routeTo}>
              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />

              {isLast ? (
                <span
                  className="
                    flex items-center gap-2
                    rounded-full
                    bg-[#007200]/10
                    px-3 py-1.5
                    font-medium
                    text-[#04471c]
                    dark:text-green-300
                  "
                >
                  {icon}
                  {label}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="
                    flex items-center gap-2
                    rounded-full px-3 py-1.5
                    font-medium
                    text-[#007200]
                    transition-all duration-200
                    hover:bg-[#007200]/10
                    hover:text-[#04471c]
                    dark:text-green-300
                  "
                >
                  {icon}
                  {label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumb;
