import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";

const RequireAuth = ({ allowedRoles }) => {
  const role = useSelector((state) => state.userSlice.userData?.role);
  const location = useLocation();
  return allowedRoles?.find((userRole) => userRole === role) ? (
    <Outlet />
  ) : role !== null && role !== "" ? (
    <Navigate to="/unauthorized" />
  ) : (
    <Navigate to="/login" />
  );
};
export default RequireAuth;
