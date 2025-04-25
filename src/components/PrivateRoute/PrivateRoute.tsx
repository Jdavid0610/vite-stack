import useAuth from "@/hooks/auth/useAuth";
import { Navigate } from "react-router-dom";
import { PrivateRouteProps } from "./PrivateRoute.interface";

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;
