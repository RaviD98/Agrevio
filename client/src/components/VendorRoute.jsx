import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

const VendorRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "Seller" && user.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default VendorRoute;
