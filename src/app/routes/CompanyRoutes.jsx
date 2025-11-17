import CompanyLayout from "@/layouts/CompanyLayout";
import PageNotFound from "@/layouts/PageNotFound";
import {
    ApplicantDetails,
    CompanyProfile,
    CompanyDashboard as Dashboard,
} from "@/pages";
import { Outlet, Route, Routes } from "react-router-dom";

export default function CompanyRoutes() {
    return (
        <Routes>
            <Route index element={
                <CompanyLayout>
                    <Outlet />
                </CompanyLayout>
            }>
                <Route index element={<Dashboard />} />
                <Route path="company" element={<CompanyProfile />} />
                <Route path="applicants/:id" element={<ApplicantDetails />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    );
}
