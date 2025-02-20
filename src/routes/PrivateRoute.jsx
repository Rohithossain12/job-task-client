import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { users, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (users && users?.email) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace="true" />;
};

export default PrivateRoute;
