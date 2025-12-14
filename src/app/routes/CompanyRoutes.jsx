import { Routes, Route, Outlet } from "react-router-dom";
import CompanyLayout from "../layouts/CompanyLayout";
import PageNotFound from "../layouts/PageNotFound";
import {
    ApplicantDetails,
    CompanyProfile,
    CompanyDashboard as Dashboard,
    CompanySetting,
    PostJob,
    JobListing,
    CompanyBranches,
} from "../pages";
import ApplicantsTable from "../pages/Company/ApplicantList/ApplicantList";

export default function CompanyRoutes() {
    return (
        <Routes>
            <Route path="/" element={
                <CompanyLayout>
                    <Outlet />
                </CompanyLayout>
            }>
                <Route index element={<Dashboard />} />
                <Route path="company/:id" element={<CompanyProfile />} />
                <Route path="applicants/:id" element={<ApplicantDetails />} />
                <Route path="applicants" element={<ApplicantsTable />} />
                <Route path="settings" element={<CompanySetting />} />
                <Route path="post-job" element={<PostJob />} />
                <Route path="job-listing" element={<JobListing />} />
                <Route path="branches" element={<CompanyBranches />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    );
}
