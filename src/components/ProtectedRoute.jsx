import { Navigate } from "react-router-dom";
import LayoutLoader from "./layout/LayoutLoader";

const ProtectedRoute = ({ children, user, redirect = "/login", isLoading }) => {
  if (!user && !isLoading) return <Navigate to={redirect} />;

  if (isLoading) return <LayoutLoader />;

  return children;
};

export default ProtectedRoute;
