import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThemeProvider from "../providers/ThemeProvider";
import { useSelector } from "react-redux";
import CompanyRoutes from "./CompanyRoutes";
import UserRoutes from "./UserRoutes";

export default function MainRoutes() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.userRole);

  return (
    <ThemeProvider>
      <BrowserRouter>
        {isAuthenticated && userRole?.toLowerCase() === "company" ? (
          <CompanyRoutes />
        ) : (
          <UserRoutes />
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}