import { CompanySidebar, TopBar } from "../../components";
import React from "react";

export default function CompanyLayout({ children }) {
  return (
    <div className="h-screen flex">
      <CompanySidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
