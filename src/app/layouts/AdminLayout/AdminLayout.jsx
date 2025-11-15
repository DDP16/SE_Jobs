import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { TopBar } from "@/components/admin/TopBar";
import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-neutral-100">
      <div className="w-1/6">
        <AdminSidebar />
      </div>
      <div className="flex flex-col flex-1">
        <TopBar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
