import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { Home, FindJobs, JobDescription, CompanyDetails, CompanyList, SignIn } from "../pages";
import PageNotFound from "../layouts/PageNotFound";
import ThemeProvider from "../providers/ThemeProvider";
import MainLayout from "../layouts/MainLayout";

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
          <Route path="/" element={<LayoutWrapper />}>
            <Route index element={<Home />} />
            <Route path="jobs" element={<FindJobs />} />
            <Route path="job/:id" element={<JobDescription />} />
            <Route path="companies" element={<CompanyList />} />
            <Route path="company/:id" element={<CompanyDetails />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
