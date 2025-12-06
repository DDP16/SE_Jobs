import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ThemeProvider from "../providers/ThemeProvider";
import { BrowserRouter } from "react-router-dom";
import CompanyRoutes from "./CompanyRoutes";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import { Role } from "@/lib/enums";
import { getMe } from "../modules";

export default function MainRoutes() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getMe());
    }
  }, []);

  const userRole = useSelector((state) => state.auth.userRole);

  return (
    <ThemeProvider>
      <BrowserRouter>
        {isAuthenticated && userRole?.toLowerCase() === Role.ADMIN.toLowerCase() ? (
          <AdminRoutes />
        ) : isAuthenticated && userRole?.toLowerCase() === Role.EMPLOYER.toLowerCase() ? (
          <CompanyRoutes />
        ) : (
          <UserRoutes />
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}
