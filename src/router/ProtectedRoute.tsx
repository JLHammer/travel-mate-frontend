import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { usePaths } from "../hooks/usePaths";
import { Loader } from "../components/ui/Loader";

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const paths = usePaths();

  if (isLoading) return <Loader />;

  if (!user) {
    return <Navigate to={paths.login} replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};
