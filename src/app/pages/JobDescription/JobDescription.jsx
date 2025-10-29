import JobHeader from "./partials/JobHeader";
import JobDetails from "./partials/JobDetails";
import JobSidebar from "./partials/JobSidebar";
import PerksSection from "./partials/PerksSection";
import CompanySection from "./partials/CompanySection";
import SimilarJobs from "./partials/SimilarJobs";
import { layoutType } from "../../lib";

export default function JobDescription({
  job,
  showBreadcrumb = true,
  showJobHeader = true,
  showJobDetails = true,
  showJobSidebar = true,
  showPerksSection = true,
  showCompanySection = true,
  showSimilarJobs = true,
  layout = layoutType.full, // "full" | "compact" | "minimal"
}) {
  // Layout configurations
  const layoutConfig = {
    [layoutType.full]: {
      showBreadcrumb: true,
      showJobSidebar: true,
      showPerksSection: true,
      showCompanySection: true,
      showSimilarJobs: true,
    },
    [layoutType.compact]: {
      showBreadcrumb: false, 
      showJobSidebar: true,
      showPerksSection: false,
      showCompanySection: false,
      showSimilarJobs: false,
    },
    [layoutType.half_width]: {
      showBreadcrumb: false, 
      showJobSidebar: true,
      showPerksSection: false,
      showCompanySection: false,
      showSimilarJobs: false,
    },
    [layoutType.minimal]: {
      showBreadcrumb: false,
      showJobSidebar: false,
      showPerksSection: false,
      showCompanySection: false,
      showSimilarJobs: false,
    },
  };

  // Use layout config if layout prop is provided
  const config = layoutConfig[layout] || {};
  const finalConfig = {
    showBreadcrumb: showBreadcrumb && config.showBreadcrumb,
    showJobHeader: showJobHeader,
    showJobDetails: showJobDetails,
    showJobSidebar: showJobSidebar && config.showJobSidebar,
    showPerksSection: showPerksSection && config.showPerksSection,
    showCompanySection: showCompanySection && config.showCompanySection,
    showSimilarJobs: showSimilarJobs && config.showSimilarJobs,
  };

  return (
    <div className="min-h-screen bg-white mx-auto">
      <div className={`py-10 ${layout !== layoutType.half_width ? "px-30" : ""} bg-background-lightBlue`}>
        {finalConfig.showBreadcrumb && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Home / Companies / {job?.company || "Company"} / {job?.title || "Job Title"}
            </p>
          </div>
        )}
        {finalConfig.showJobHeader && <JobHeader job={job} />}
      </div>

      <div className={`grid grid-cols-1 gap-8 py-18 ${layout !== layoutType.half_width ? "px-30 lg:grid-cols-3 md:grid-cols-2" : "px-15 lg:grid-cols-1"}`}>
        <div className="lg:col-span-2">
          {finalConfig.showJobDetails && <JobDetails job={job} />}
        </div>
        <div>{finalConfig.showJobSidebar && <JobSidebar job={job} />}</div>
      </div>

      {finalConfig.showPerksSection && <PerksSection job={job} />}
      {finalConfig.showCompanySection && <CompanySection job={job} />}
      {finalConfig.showSimilarJobs && <SimilarJobs job={job} />}
    </div>
  );
}
