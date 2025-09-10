import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useSelector } from "react-redux";
const AdminPrivateRoute = ({ children }: { children: JSX.Element }) => {
 const token = useSelector((state: any) => state.auth.accessToken)

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminPrivateRoute