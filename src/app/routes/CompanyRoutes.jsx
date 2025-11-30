import { Routes, Route, Outlet } from "react-router-dom";
import CompanyLayout from "@/layouts/CompanyLayout";
import PageNotFound from "@/layouts/PageNotFound";
import CompanyProfile from "@/pages/Company/CompanyProfile";
import ApplicantDetails from "@/pages/Company/ApplicantDetails";
import PostJob from "@/pages/Company/PostJob/PostJob";
import Dashboard from "../pages/Company/DashBoard/Dashboard";

export default function CompanyRoutes() {
  return (
    <Routes>
      <Route
        path=""
        element={
          <CompanyLayout>
            <Outlet />
          </CompanyLayout>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="postjob" element={<PostJob />} />
        <Route path="company" element={<CompanyProfile />} />
        <Route path="applicants/:id" element={<ApplicantDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}
