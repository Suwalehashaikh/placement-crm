import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleProtectedRoute = ({
  children,
  allowedRoles,
}) => {
  const { user } = useAuth();

  

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = allowedRoles.includes(
    user.role
  );

  

  if (!hasAccess) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
};

export default RoleProtectedRoute;