import JobHeader from "./partials/JobHeader";
import JobDetails from "./partials/JobDetails";
import JobSidebar from "./partials/JobSidebar";
import { PerksSection } from "../../../components";
import CompanySection from "./partials/CompanySection";
import SimilarJobs from "./partials/SimilarJobs";
import { layoutType } from "../../../lib";
import { mockJobs } from "../../../../mocks/mockData";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getJobById } from "../../../modules/services/jobsService";
import { useEffect } from "react";

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

  const [searchParams] = useSearchParams();
  const jobId = searchParams.get("id");
  const dispatch = useDispatch();

  // Get job from Redux store
  const jobFromStore = useSelector(state => state.jobs.job);

  // Fetch job from API if jobId exists and job prop is not provided
  useEffect(() => {
    if (jobId && !job) {
      dispatch(getJobById(jobId));
    }
  }, [jobId, job, dispatch]);

  // Use job prop if provided, otherwise use job from Redux store, fallback to mockJobs
  if (!job) {
    if (jobFromStore) {
      job = jobFromStore;
    } else if (jobId) {
      job = mockJobs.find(j => j.id.toString() === jobId);
    }
  }

  return (
    <div className="min-h-screen bg-white mx-auto space-y-12 pb-12">
      <div className={`pt-10 pb-5 ${layout !== layoutType.half_width ? "px-10 lg:px-25" : ""} bg-background-lightBlue`}>
        {finalConfig.showBreadcrumb && (
          <div className="mb-5">
            <p className="text-sm text-muted-foreground">
              Home / Companies / {typeof job?.company === 'string' ? job.company : job?.company?.name || "Company"} / {job?.title || "Job Title"}
            </p>
          </div>
        )}
        {finalConfig.showJobHeader && <JobHeader job={job} />}
      </div>

      <div className={` grid grid-cols-1 gap-8 ${layout !== layoutType.half_width ? "px-10 lg:px-25 lg:grid-cols-3 md:grid-cols-2" : "px-15 lg:grid-cols-1"}`}>
        <div className="lg:col-span-2">
          {finalConfig.showJobDetails && <JobDetails job={job} />}
        </div>
        <div className="sticky top-0 z-10 self-start">
          {finalConfig.showJobSidebar && <JobSidebar job={job} />}
        </div>
      </div>

      <div className="px-10 lg:px-25 space-y-12">
        {finalConfig.showPerksSection && <PerksSection job={job} />}
        {finalConfig.showCompanySection && <CompanySection job={job} />}
        {finalConfig.showSimilarJobs && <SimilarJobs job={job} />}
      </div>
    </div>
  );
}
