import React, { useEffect } from "react";
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
      {/* <ThemeHandler /> */}

      <ScrollToTop />

      <div className="w-full max-w-[100vw] overflow-x-hidden flex flex-col min-h-screen transition-colors duration-500 bg-background text-foreground scrollbar-hide">
        {/* Navbar */}
        {!shouldHideNavbar && (
          <div className="sticky top-0 z-50 bg-background">
            <NavBar />
          </div>
        )}

        {/* Breadcrumb */}
        {!shouldHideBreadcrumb && (
          <div className="sticky top-[var(--navbar-height)] z-40 bg-background border-b border-border">
            <Breadcrumb />
          </div>
        )}

        {/* Main Content */}
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
