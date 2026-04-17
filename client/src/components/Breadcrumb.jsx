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
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const iconMap = {
  home: <Home className="w-4 h-4 mr-1" />,
  products: <Store className="w-4 h-4 mr-1" />,
  about: <Info className="w-4 h-4 mr-1" />,
  contact: <Phone className="w-4 h-4 mr-1" />,
  cart: <ShoppingCart className="w-4 h-4 mr-1" />,
  seeds: <Leaf className="w-4 h-4 mr-1" />,
  irrigation: <Droplet className="w-4 h-4 mr-1" />,
  machinery: <Hammer className="w-4 h-4 mr-1" />,
  tools: <Wrench className="w-4 h-4 mr-1" />,
  pesticides: <Bug className="w-4 h-4 mr-1" />,
  storage: <Archive className="w-4 h-4 mr-1" />,
  team: <Users className="w-4 h-4 mr-1" />,
};

const Breadcrumb = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter(Boolean);

  return (
    <nav className="bg-[#edf7f6] dark:bg-[#121212] px-6 py-4 sticky top-0 z-40 rounded-lg shadow-sm flex flex-wrap items-center gap-2 text-sm font-medium">
      {/* HOME link */}
      <Link
        to="/"
        className="flex items-center text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-white transition"
      >
        <Home className="w-4 h-4 mr-1" />
        Home
      </Link>

      {/* dynamic parts */}
      {pathnames.map((name, idx) => {
        const routeTo = `/${pathnames.slice(0, idx + 1).join("/")}`;
        const label = name
          .replace(/-/g, " ")
          .replace(/^\w/, (c) => c.toUpperCase());
        const isLast = idx === pathnames.length - 1;
        const icon = iconMap[name.toLowerCase()] || (
          <PackageOpen className="w-4 h-4 mr-1" />
        );

        return (
          <React.Fragment key={routeTo}>
            <Separator orientation="vertical" className="h-4 bg-green-400" />
            {isLast ? (
              <span className="flex items-center text-gray-600 dark:text-gray-400 cursor-default">
                {icon} {label}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="flex items-center text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-white transition"
              >
                {icon} {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
