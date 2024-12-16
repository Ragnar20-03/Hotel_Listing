import { Navigate, Outlet } from "react-router-dom";
import { useCookie } from "../../Hooks";

export const AuthGuard: React.FC = () => {
  const { getCookie } = useCookie();
  return getCookie("token") ? <Outlet /> : <Navigate to="/admin" />;
};
