import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThemeProvider from "../providers/ThemeProvider";
import { useSelector } from "react-redux";
import CompanyRoutes from "./CompanyRoutes";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import { Role } from "@/lib/enums";

export default function MainRoutes() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.userRole);

  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* {isAuthenticated && userRole?.toLowerCase() === Role.ADMIN.toLowerCase() ? (
          <AdminRoutes />
        ) : isAuthenticated && userRole?.toLowerCase() === Role.EMPLOYER.toLowerCase() ? (
          <CompanyRoutes />
        ) : (
          <UserRoutes />
        )} */}
        <CompanyRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
