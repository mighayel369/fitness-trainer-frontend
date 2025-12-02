import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useSelector } from "react-redux";
const TrainerPrivateRoute = ({ children }: { children: JSX.Element }) => {
 const token = useSelector((state: any) => state.auth.accessToken)
 console.log('token',token)

  if (!token) {
    return <Navigate to="/trainer/login" replace />;
  }

  return children;
};

export default TrainerPrivateRoute