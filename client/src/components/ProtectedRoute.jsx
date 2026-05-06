import { Navigate } from "react-router-dom";

import { useGetMeQuery } from "@/features/api/authApi";

const ProtectedRoute = ({ children }) => {
  const { data, isLoading, isError } = useGetMeQuery();

  // Wait until auth check completes
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
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
