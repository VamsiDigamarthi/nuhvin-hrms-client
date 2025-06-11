import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const useGetUserRole = () => {
  const role = localStorage.getItem("role");
  return role ?? null;
};

const useGetUserToken = () => {
  const token = localStorage.getItem("token");
  return token ?? null;
};

export const ProtectedRoute = ({ allowedRoles }) => {
  const dispatch = useDispatch();

  const userRole = useGetUserRole();
  const storedToken = useGetUserToken();

  useEffect(() => {
    if (userRole == "hr") {
      //   dispatch(getEmployees());
      //   dispatch(getDepts());
    }
  }, []);

  useEffect(() => {
    if (storedToken && userRole) {
      //   dispatch(fetchUserProfile());
    }
  }, [storedToken, userRole, dispatch]);

  if (!storedToken) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.includes(userRole)) {
    console.log("allowed if");

    return <Outlet />;
  }
};
