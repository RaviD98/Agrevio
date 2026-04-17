import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollToTop from "@/components/ScrollToTop";
import NavBar from "@/components/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import ProductNavbar from "@/components/ProductNavbar";
import Footer from "@/components/Footer";
import ThemeHandler from "@/components/ThemeHandler";

const RootLayout = () => {
  const location = useLocation();

  const hideNavbarPaths = ["/login"];
  const hideFooterPaths = ["/login", "/register"];
  const hideBreadcrumbPaths = ["/login", "/"];
  const hideProductNavbarPaths = ["/login", "/register", "/products","/products/:category", "/about", "/contact"];
  const isHomePage = location.pathname === "/";

  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);
  const shouldHideBreadcrumb = hideBreadcrumbPaths.includes(location.pathname);
  // const shouldHideProductNavbar = hideProductNavbarPaths.includes(location.pathname);
  // const shouldHideProductNavbar = hideProductNavbarPaths.some((path) =>
  //   new RegExp(`^${path.replace(":category", "[^/]+")}$`).test(
  //     location.pathname
  //   )
  // );

  // const shouldShowProductNavbar = location.pathname.startsWith("/products");

  return (
    <ThemeProvider defaultTheme="system" storageKey="agrohub-theme">
      <ThemeHandler />
      <ScrollToTop />

      <div className="w-full max-w-[100vw] overflow-x-hidden flex flex-col min-h-screen transition-colors duration-500 bg-background text-foreground scrollbar-hide">
        {/* Sticky NavBar */}

        {!shouldHideNavbar && (
          <div className="sticky top-0 z-50 bg-background">
            <NavBar />
          </div>
        )}

        {/* Sticky Breadcrumb */}
        {!shouldHideBreadcrumb && (
          <div className="sticky top-[var(--navbar-height)] z-40 bg-background border-b border-border">
            <Breadcrumb />
          </div>
        )}

        {/* {isHomePage && <ProductNavbar />} */}

        {/* Main Content with animation */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex-1 "
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>

        {!shouldHideFooter && <Footer />}
      </div>
    </ThemeProvider>
  );
};

export default RootLayout;
