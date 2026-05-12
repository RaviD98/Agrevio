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
  Menu,
  X,
  Heart,
  User,
} from "lucide-react";

const AgriNavbar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [logoutApi] = useLogoutMutation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    `
      relative transition-all duration-200
      hover:text-[#04471c]
      dark:hover:text-green-300
      ${
        isActive
          ? "text-[#007200] dark:text-green-300 font-semibold"
          : "text-gray-700 dark:text-gray-200"
      }
    `;

  return (
    <nav
      className="
        sticky top-0 z-50
        border-b border-gray-200
        bg-[#FBFAF5]/90
        backdrop-blur-xl
        dark:border-[#3A3A3A]
        dark:bg-[#2C2C2C]/90
        transition-colors duration-300
        font-['Inter']
      "
    >
      <div
        className="
          mx-auto flex max-w-7xl
          items-center justify-between
          px-4 sm:px-6 py-4
        "
      >
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div
            className="
              flex h-11 w-11 items-center justify-center
              rounded-2xl
              bg-[#007200]/10
            "
          >
            <Leaf className="h-5 w-5 text-[#007200]" />
          </div>

          <div>
            <h1
              className="
                text-2xl font-bold
                text-[#007200]
                dark:text-green-300
                font-['Arvo']
              "
            >
              Agrevio
            </h1>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Smart Agriculture
            </p>
          </div>
        </div>

        {/* Desktop Links */}
        <div
          className="
            hidden md:flex
            items-center gap-8
            text-sm font-medium
          "
        >
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
        <div className="flex items-center gap-3">
          {/* Theme */}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="
              rounded-2xl
              border border-gray-200
              bg-white
              hover:bg-gray-100
              dark:border-[#3A3A3A]
              dark:bg-[#3A3A3A]
              dark:hover:bg-[#444]
              cursor-pointer
            "
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-[#007200]" />
            )}
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="
              md:hidden
              flex items-center justify-center
              h-10 w-10 rounded-2xl
              border border-gray-200
              bg-white
              dark:border-[#3A3A3A]
              dark:bg-[#3A3A3A]
            "
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          {/* User */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="outline-none cursor-pointer hidden md:block">
                  <Avatar className="h-11 w-11 ring-2 ring-[#007200]/20">
                    <AvatarImage src="" />

                    <AvatarFallback className="bg-[#007200] text-white font-semibold">
                      {user.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="
                  w-64 rounded-2xl
                  border border-gray-200
                  bg-white
                  dark:border-[#3A3A3A]
                  dark:bg-[#3A3A3A]
                "
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

                <DropdownMenuItem
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4 cursor-pointer" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate("/cart")}
                  className="cursor-pointer"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Cart
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer"
                >
                  <Package className="mr-2 h-4 w-4" />
                  Orders
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate("/bookings")}
                  className="cursor-pointer"
                >
                  <Package className="mr-2 h-4 w-4" />
                  Bookings
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate("/deliveries")}
                  className="cursor-pointer"
                >
                  <Truck className="mr-2 h-4 w-4" />
                  Deliveries
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate("/favourites")}
                  className="cursor-pointer"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Favourites
                </DropdownMenuItem>

                {/* Become Seller */}
                {user.role === "Buyer" && (
                  <>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={handleBecomeSeller}
                      disabled={becomingSeller}
                      className="cursor-pointer"
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
                  className="text-red-500 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="
                hidden md:flex
                rounded-2xl
                bg-[#007200]
                px-6 text-white
                transition-all duration-300
                hover:bg-[#04471c]
                cursor-pointer
              "
            >
              Login
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="
            md:hidden
            border-t border-gray-200
            bg-[#FBFAF5]
            px-4 py-5
            dark:border-[#3A3A3A]
            dark:bg-[#2C2C2C]
          "
        >
          <div className="flex flex-col gap-4 text-sm font-medium">
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

            {!user && (
              <Button
                onClick={() => navigate("/login")}
                className="
                  mt-3 rounded-2xl
                  bg-[#007200]
                  text-white
                  hover:bg-[#04471c]
                "
              >
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default AgriNavbar;
