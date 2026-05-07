import React, { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "sonner";

import { userLoggedOut } from "@/features/authSlice";

import { useLogoutMutation } from "@/features/api/authApi";

import { useBecomeSellerMutation } from "@/features/api/userApi";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import {
  Leaf,
  LogOut,
  Moon,
  Sun,
  ShoppingCart,
  Package,
  Truck,
  LayoutDashboard,
  Store,
} from "lucide-react";

const AgriNavbar = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [logoutApi] = useLogoutMutation();

  const [becomeSeller, { isLoading: becomingSeller }] =
    useBecomeSellerMutation();

    const { theme, setTheme } = useTheme();

  // Logout
  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();

      dispatch(userLoggedOut());

      localStorage.removeItem("user");

      toast.success("Logged out successfully");

      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || "Logout failed");
    }
  };

  // Become seller
  const handleBecomeSeller = async () => {
    try {
      await becomeSeller().unwrap();

      toast.success("You are now a seller");

      window.location.reload();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to become seller");
    }
  };

  const navLinkClass = ({ isActive }) =>
    `transition hover:text-green-600 dark:hover:text-green-300 ${
      isActive
        ? "text-green-700 dark:text-green-300 font-semibold"
        : "text-gray-700 dark:text-gray-200"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-green-100 dark:border-[#222] bg-white/90 dark:bg-[#121212]/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="bg-green-100 dark:bg-green-900/40 p-2 rounded-xl">
            <Leaf className="h-5 w-5 text-green-700 dark:text-green-300" />
          </div>

          <h1 className="text-2xl font-bold text-green-800 dark:text-green-300">
            Agrevio
          </h1>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>

          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>

          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Theme */}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-green-700" />
            )}
          </Button>

          {/* Logged In */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="outline-none cursor-pointer">
                  <Avatar className="h-10 w-10 ring-2 ring-green-500 ring-offset-2 dark:ring-offset-[#121212]">
                    <AvatarImage src="" />

                    <AvatarFallback className="bg-green-600 text-white">
                      {user.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-64 dark:bg-[#1A1A1A]"
              >
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-semibold">{user.name}</span>

                    <span className="text-xs text-gray-500 capitalize">
                      {user.role}
                    </span>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => navigate("/cart")}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Cart
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => navigate("/orders")}>
                  <Package className="mr-2 h-4 w-4" />
                  Orders
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => navigate("/bookings")}>
                  <Package className="mr-2 h-4 w-4" />
                  Bookings
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => navigate("/deliveries")}>
                  <Truck className="mr-2 h-4 w-4" />
                  Deliveries
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => navigate("/favourites")}>
                  Favourites
                </DropdownMenuItem>

                {/* Become Seller */}
                {user.role === "Buyer" && (
                  <>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={handleBecomeSeller}
                      disabled={becomingSeller}
                    >
                      <Store className="mr-2 h-4 w-4" />
                      {becomingSeller ? "Processing..." : "Become a Seller"}
                    </DropdownMenuItem>
                  </>
                )}

                {/* Seller */}
                {(user.role === "Seller" || user.role === "Admin") && (
                  <>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => navigate("/vendor/dashboard")}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Vendor Dashboard
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AgriNavbar;
