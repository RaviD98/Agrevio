import React from "react";

import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import SectionLoader from "./SectionLoader";

const VendorRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  // Wait for auth restore
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SectionLoader />
      </div>
    );
  }

  // Not logged in
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Not seller/admin
  if (user.role !== "Seller" && user.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default VendorRoute;
