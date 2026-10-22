import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function PublicRoute() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <></>
  if (isAuthenticated) return <Navigate to="/" replace/>

  return <Outlet />;
}
