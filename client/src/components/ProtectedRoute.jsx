import { Navigate, Outlet } from "react-router";
import { useGetUserQuery } from "../redux/api/userApi";

const ProtectedRoute = () => {
  const { data, isLoading, isFetching, error } = useGetUserQuery();

  if (isLoading || isFetching) return <p>Loading...</p>;

  // if backend returns 401, error will be set
  if (error?.status === 401) return <Navigate to="/signin" replace />;

  // extra safety: if request succeeded but user missing
  if (!data?.user) return <Navigate to="/signin" replace />;

  return <Outlet />;
};

export default ProtectedRoute;