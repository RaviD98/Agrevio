import { Navigate } from "react-router-dom";

import { useGetMeQuery } from "@/features/api/authApi";
import SectionLoader from "./SectionLoader";

const ProtectedRoute = ({ children }) => {
  const { data, isLoading, isError } = useGetMeQuery();

  // Wait until auth check completes
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <SectionLoader />
      </div>
    );
  }

  // If request failed or no user
  if (isError || !data?.data?.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
