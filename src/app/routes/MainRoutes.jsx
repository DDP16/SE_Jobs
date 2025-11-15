import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import {
  Home,
  FindJobs,
  JobDescription,
  CompanyDetails,
  CompanyList,
  SignIn,
  SignUp,
  ProfileDashboard,
  Profile,
  MyJobs,
} from "../pages";
import PageNotFound from "../layouts/PageNotFound";
import ThemeProvider from "../providers/ThemeProvider";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard";
import CompanyProfile from "@/pages/Admin/CompanyDetails/CompanyProfile";
import ApplicantDetails from "@/pages/Admin/ApplicantDetails/ApplicantDetails";

// Component wrapper cho MainLayout
function LayoutWrapper() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export default function MainRoutes() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<LayoutWrapper />}>
            <Route index element={<Home />} />
            <Route path="jobs" element={<FindJobs />} />
            <Route path="job" element={<JobDescription />} />
            <Route path="companies" element={<CompanyList />} />
            <Route path="company" element={<CompanyDetails />} />

            <Route path="profile/dashboard" element={<ProfileDashboard />} />
            <Route path="profile/user-profile" element={<Profile />} />
            <Route path="profile/my-jobs" element={<MyJobs />} />
            <Route path="profile/job-invitation" element={<ProfileDashboard />} />
            <Route path="profile/email-subscriptions" element={<ProfileDashboard />} />
            <Route path="profile/notifications" element={<ProfileDashboard />} />
            <Route path="profile/settings" element={<ProfileDashboard />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <AdminLayout>
                <Outlet />
              </AdminLayout>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="company" element={<CompanyProfile />} />
            <Route path="applicants/:id" element={<ApplicantDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
