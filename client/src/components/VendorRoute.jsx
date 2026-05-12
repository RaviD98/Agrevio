import React from "react";

import { Navigate } from "react-router-dom";

import { useGetMeQuery } from "@/features/api/authApi";

import SectionLoader from "./SectionLoader";

const VendorRoute = ({ children }) => {
  const { data, isLoading, isError } = useGetMeQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SectionLoader />
      </div>
    );
  }

  const user = data?.data?.user;

  // Not logged in
  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  // Not seller/admin
  if (user.role !== "Seller" && user.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default VendorRoute;
