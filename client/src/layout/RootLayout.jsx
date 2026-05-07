import React from "react";

import { Outlet, useLocation } from "react-router-dom";

import { ThemeProvider } from "@/components/ThemeProvider";

import ScrollToTop from "@/components/ScrollToTop";

import NavBar from "@/components/Navbar";

import Breadcrumb from "@/components/Breadcrumb";

import Footer from "@/components/Footer";

import { useGetMeQuery } from "@/features/api/authApi";

const RootLayout = () => {
  const location = useLocation();

  useGetMeQuery();

  const hideNavbarPaths = ["/login"];

  const hideFooterPaths = ["/login", "/register"];

  const hideBreadcrumbPaths = ["/login", "/"];

  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  const shouldHideBreadcrumb = hideBreadcrumbPaths.includes(location.pathname);

  return (
    <ThemeProvider defaultTheme="system" storageKey="agrohub-theme">
      <ScrollToTop />

      <div
        className="
          min-h-screen w-full max-w-[100vw]
          overflow-x-hidden
          bg-[#FBFAF5]
          text-[#1f2937]
          transition-colors duration-300
          dark:bg-[#2C2C2C]
          dark:text-[#F5F5F5]
          font-['Manrope']
        "
      >
        {/* Navbar */}
        {!shouldHideNavbar && (
          <header className="sticky top-0 z-50">
            <NavBar />
          </header>
        )}

        {/* Breadcrumb */}
        {!shouldHideBreadcrumb && (
          <div className="sticky top-[72px] z-40">
            <Breadcrumb />
          </div>
        )}

        {/* Main */}
        <main className="flex-1">
          <Outlet />
        </main>

        {/* Footer */}
        {!shouldHideFooter && <Footer />}
      </div>
    </ThemeProvider>
  );
};

export default RootLayout;
