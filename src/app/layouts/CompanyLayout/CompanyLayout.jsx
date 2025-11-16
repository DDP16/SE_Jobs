import { CompanySidebar, TopBar } from "@/components";
import React from "react";

export default function CompanyLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-neutral-100">
      <CompanySidebar />
      <div className="flex flex-col flex-1">
        <TopBar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
};
