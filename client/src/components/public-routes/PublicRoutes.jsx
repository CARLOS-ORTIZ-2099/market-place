import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { Loading } from "../loading/Loading";

export const PublicRoutes = () => {
  const { auth, loading, user } = useAuth();

  if (loading) return <Loading />;

  if ((!loading, auth, user)) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
};
