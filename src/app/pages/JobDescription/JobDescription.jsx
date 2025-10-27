import JobHeader from "./partials/JobHeader";
import JobDetails from "./partials/JobDetails";
import JobSidebar from "./partials/JobSidebar";
import PerksSection from "./partials/PerksSection";
import CompanySection from "./partials/CompanySection";
import SimilarJobs from "./partials/SimilarJobs";

export default function JobDescription({
  job,
  showBreadcrumb = true,
  showJobHeader = true,
  showJobDetails = true,
  showJobSidebar = true,
  showPerksSection = true,
  showCompanySection = true,
  showSimilarJobs = true,
  layout = "full", // "full" | "compact" | "minimal"
}) {
  // Layout configurations
  const layoutConfig = {
    full: {
      showBreadcrumb: true,
      showJobHeader: true,
      showJobDetails: true,
      showJobSidebar: true,
      showPerksSection: true,
      showCompanySection: true,
      showSimilarJobs: true,
    },
    compact: {
      showBreadcrumb: false,
      showJobHeader: true,
      showJobDetails: true,
      showJobSidebar: true,
      showPerksSection: false,
      showCompanySection: false,
      showSimilarJobs: false,
    },
    minimal: {
      showBreadcrumb: false,
      showJobHeader: true,
      showJobDetails: true,
      showJobSidebar: false,
      showPerksSection: false,
      showCompanySection: false,
      showSimilarJobs: false,
    },
  };

  // Use layout config if layout prop is provided
  const config = layoutConfig[layout] || {};
  const finalConfig = {
    showBreadcrumb: showBreadcrumb && config.showBreadcrumb !== false,
    showJobHeader: showJobHeader && config.showJobHeader !== false,
    showJobDetails: showJobDetails && config.showJobDetails !== false,
    showJobSidebar: showJobSidebar && config.showJobSidebar !== false,
    showPerksSection: showPerksSection && config.showPerksSection !== false,
    showCompanySection:
      showCompanySection && config.showCompanySection !== false,
    showSimilarJobs: showSimilarJobs && config.showSimilarJobs !== false,
  };

  return (
    <div className="min-h-screen bg-white mx-auto">
      <div className="py-10 px-30 bg-background-lightBlue">
        {finalConfig.showBreadcrumb && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Home / Companies / {job?.company || "Company"} /{" "}
              {job?.title || "Job Title"}
            </p>
          </div>
        )}
        {finalConfig.showJobHeader && <JobHeader job={job} />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-18 mx-30">
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
