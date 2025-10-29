import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import FindJobs from "../pages/FindJobs";
import CompanyList from "../pages/CompanyList";
import CompanyDetails from "../pages/CompanyDetails";
import PageNotFound from "../layouts/PageNotFound";
import ThemeProvider from "../providers/ThemeProvider";
import MainLayout from "../layouts/MainLayout";
import JobDescription from "../pages/JobDescription";

export default function MainRoutes() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<FindJobs />} />
            <Route path="/companies" element={<CompanyList />} />
            <Route path="/company/:id" element={<CompanyDetails />} />
            <Route path="/job/:id" element={<JobDescription />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
