import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: ReactElement; 
  [key: string]: string | ReactElement; 
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
  const token = localStorage.getItem("access_token");
  const isAuthenticated = !!token;

  return isAuthenticated ? (
    React.cloneElement(element, rest)
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
