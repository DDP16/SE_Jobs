import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ThemeProvider from "../providers/ThemeProvider";
import { BrowserRouter } from "react-router-dom";
import CompanyRoutes from "./CompanyRoutes";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import { Role } from "@/lib/enums";
import { getMe } from "../modules";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { getCategories } from "../modules";

export default function MainRoutes() {
  const dispatch = useDispatch();
  const {isAuthenticated, user, isLoadingGetMe: isLoading} = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getMe());
      dispatch(getCategories());
    }
  }, [isAuthenticated, dispatch]);

  const userRole = useSelector((state) => state.auth.userRole);

  return (
    <ThemeProvider>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : (
        <BrowserRouter>
          {/* <AdminRoutes /> */}
          {isAuthenticated && userRole?.toLowerCase() === Role.ADMIN.toLowerCase() ? (
            <AdminRoutes />
          ) : isAuthenticated && userRole?.toLowerCase() === Role.EMPLOYER.toLowerCase() ? (
            <CompanyRoutes />
          ) : (
            <UserRoutes />
          )}
        </BrowserRouter>
      )}
    </ThemeProvider>
  );
}
