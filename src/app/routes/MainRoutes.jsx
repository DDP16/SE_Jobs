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
  UserProfileSettings,
  MyJobs,
  CompanyProfile,
  CompanyDashboard as Dashboard
} from "../pages";
import PageNotFound from "../layouts/PageNotFound";
import ThemeProvider from "../providers/ThemeProvider";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";
import CompanyLayout from "@/layouts/CompanyLayout/CompanyLayout";
import ApplicantDetails from "@/pages/Admin/ApplicantDetails/ApplicantDetails";
import CompanySignUp from "@/pages/Auth/CompanySignUp";

// Component wrapper cho MainLayout
function MainLayoutWrapper() {
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
          <Route path="company/signup" element={<CompanySignUp />} />

          <Route path="/" element={<MainLayoutWrapper />}>
            <Route index element={<Home />} />
            <Route path="jobs" element={<FindJobs />} />
            <Route path="job" element={<JobDescription />} />
            <Route path="companies" element={<CompanyList />} />
            <Route path="company" element={<CompanyDetails />} />

            <Route path="profile/dashboard" element={
              <PrivateRoute>
                <ProfileDashboard />
              </PrivateRoute>
            } />
            <Route path="profile/user-profile" element={<Profile />} />
            <Route path="profile/my-jobs" element={<MyJobs />} />
            <Route path="profile/job-invitation" element={<ProfileDashboard />} />
            <Route path="profile/email-subscriptions" element={<ProfileDashboard />} />
            <Route path="profile/notifications" element={<ProfileDashboard />} />
            <Route path="profile/settings" element={<UserProfileSettings />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          {/* Company routes */}
          <Route
            path="/company"
            element={
              <CompanyLayout>
                <Outlet />
              </CompanyLayout>
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
