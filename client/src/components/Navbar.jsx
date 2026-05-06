import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "@/features/authSlice";
import Profile from "@/pages/Profile";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Leaf, LogOut, Sun, Moon } from "lucide-react";

const AgriNavbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1️⃣ Initialise state from the DOM, not localStorage
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  // 2️⃣ Toggle handler that keeps DOM + localStorage in sync
  const toggleTheme = () => {
    setDarkMode((prev) => {
      const next = !prev;
      const root = document.documentElement;

      if (next) {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  const handleLogout = () => {
    dispatch(userLoggedOut());
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // bg-green-300bg-green-300  dark:bg-green-800

  return (
    <nav className="w-full shadow-md sticky top-0 z-50 bg-[#edf7f6] dark:bg-[#121212]">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6">
        {/* Logo */}
        <div className="flex items-center gap-2 text-green-950 dark:text-green-400 font-extrabold text-2xl">
          <Leaf className="text-green-600 dark:text-green-300" />
          <NavLink to="/" className="hover:underline">
            AgroHub
          </NavLink>
        </div>

        {/* Navigation Links */}
        <NavigationMenu>
          <div className="flex gap-6 text-green-900 dark:text-white font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-4 decoration-2 font-semibold"
                  : "hover:underline"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-4 decoration-2 font-semibold"
                  : "hover:underline"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-4 decoration-2 font-semibold"
                  : "hover:underline"
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-4 decoration-2 font-semibold"
                  : "hover:underline"
              }
            >
              Contact
            </NavLink>
          </div>
        </NavigationMenu>

        {/* Right Section: Auth + Dark Mode Toggle */}
        <div className="flex items-center gap-4">
          <Button
            size="icon"
            variant="ghost"
            className="hover:bg-green-200 dark:hover:bg-green-800"
            onClick={toggleTheme} /* ← use new handler */
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-300" />
            ) : (
              <Moon className="h-5 w-5 text-green-800" />
            )}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="outline-none focus:outline-none">
                  <Avatar className="h-9 w-9 cursor-pointer ring ring-green-600 ring-offset-2 ring-offset-white dark:ring-offset-green-950">
                    <AvatarImage src="" alt={user.name} />
                    <AvatarFallback>
                      {user.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="z-[999] bg-white dark:bg-green-900 text-green-900 dark:text-white"
              >
                <DropdownMenuLabel>Welcome, {user.name}</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/cart")}>
                  My Cart
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/Favourites")}>
                  Favourites
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 dark:text-red-400"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-700"
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
