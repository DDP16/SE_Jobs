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
import { getProvinces } from "../modules/services/addressService";

export default function MainRoutes() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoadingGetMe);

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getMe());
      dispatch(getCategories());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    dispatch(getProvinces());
  }, [dispatch])

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
