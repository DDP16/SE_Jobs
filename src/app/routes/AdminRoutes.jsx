import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { AdminDashboard as Dashboard, UsersPage } from "@/pages";
import AdminLayout from "@/layouts/AdminLayout";
import PageNotFound from "@/layouts/PageNotFound";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={
        <AdminLayout>
          <Outlet />
        </AdminLayout>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}