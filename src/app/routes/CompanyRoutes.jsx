import { Routes, Route, Outlet } from "react-router-dom";
import CompanyLayout from "../layouts/CompanyLayout";
import PageNotFound from "../layouts/PageNotFound";
import ComingSoon from "../layouts/ComingSoon";
import {
    ApplicantDetails,
    CompanyProfile,
    CompanyDashboard as Dashboard,
    CompanySetting,
    PostJob,
    EditJob,
    JobListing,
    CompanyBranches,
    JobDescriptionCompany,
    ContactUs,
} from "../pages";
import ApplicantsTable from "../pages/Company/ApplicantList/ApplicantList";
import { useDispatch, useSelector } from "react-redux";
import { getCompany } from "../modules";
import { use, useEffect } from "react";

export default function CompanyRoutes() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const { company } = useSelector((state) => state.company);
    const companyId = user?.company.id;

    useEffect(() => {
        if (companyId) {
            if (!company || companyId !== company?.id) {
                dispatch(getCompany(companyId));
            }
        }
    }, [dispatch, companyId, company]);

    useEffect(() => {
        console.log("User ", user);
        console.log("Company ", company);
    }, []);

    return (
        <Routes>
            <Route path="/" element={
                <CompanyLayout>
                    <Outlet />
                </CompanyLayout>
            }>
                <Route index element={<Dashboard />} />
                <Route path="company" element={<CompanyProfile />} />
                {/* <Route path="company/:id" element={<CompanyProfile />} /> */}
                {/* <Route path="applicants/:id" element={<ApplicantDetails />} />
                <Route path="applicants" element={<ApplicantsTable />} /> */}
                <Route path="applicants/:id" element={<ComingSoon />} />
                <Route path="applicants" element={<ComingSoon />} />
                <Route path="settings" element={<CompanySetting />} />
                <Route path="post-job" element={<PostJob />} />
                <Route path="edit-job/:jobId" element={<EditJob />} />
                <Route path="job-listing" element={<JobListing />} />
                <Route path="job" element={<JobDescriptionCompany />} />
                <Route path="branches" element={<CompanyBranches />} />
                <Route path="help-center" element={<ContactUs />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    );
}
