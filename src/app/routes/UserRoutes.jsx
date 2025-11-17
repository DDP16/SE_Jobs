import MainLayout from "@/layouts/MainLayout";
import {
    CompanyDetails,
    CompanyList,
    CompanySignUp,
    FindJobs,
    Home,
    JobDescription,
    MyJobs,
    Profile,
    ProfileDashboard,
    SignIn,
    SignUp,
    UserProfileSettings
} from "@/pages";
import { Outlet, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PageNotFound from "@/layouts/PageNotFound";

function MainLayoutWrapper() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export default function UserRoutes() {
    return (
        <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/company/signup" element={<CompanySignUp />} />

            <Route path="/" element={<MainLayoutWrapper />}>
                <Route index element={<Home />} />
                <Route path="jobs" element={<FindJobs />} />
                <Route path="job" element={<JobDescription />} />
                <Route path="companies" element={<CompanyList />} />
                <Route path="company" element={<CompanyDetails />} />

                <Route path="profile" element={<PrivateRoute><Outlet /></PrivateRoute>}>
                    <Route path="dashboard" element={<ProfileDashboard />} />
                    <Route path="user-profile" element={<Profile />} />
                    <Route path="my-jobs" element={<MyJobs />} />
                    <Route path="job-invitation" element={<ProfileDashboard />} />
                    <Route path="email-subscriptions" element={<ProfileDashboard />} />
                    <Route path="notifications" element={<ProfileDashboard />} />
                    <Route path="settings" element={<UserProfileSettings />} />
                </Route>

                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    );
}