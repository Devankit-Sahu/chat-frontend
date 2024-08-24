import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, user, redirect = "/login", isLoading }) => {
  if (!user && !isLoading) return <Navigate to={redirect} />;

  return children;
};

export default ProtectedRoute;
