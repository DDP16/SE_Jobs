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
import { CircularProgress, Box, Skeleton, Container } from "@mui/material";

export default function JobDescription({
  job,
  showBreadcrumb = true,
  showJobHeader = true,
  showJobDetails = true,
  showJobSidebar = true,
  showPerksSection = true,
  showCompanySection = true,
  showSimilarJobs = true,
  layout = layoutType.full, // "full" | "compact" | "minimal" | "preview"
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
    [layoutType.preview]: {
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

  // Get job and loading status from Redux store
  const jobFromStore = useSelector(state => state.jobs.job);
  const jobStatus = useSelector(state => state.jobs.status);
  const jobError = useSelector(state => state.jobs.error);

  // Helper function to get job ID from various fields
  const getJobIdValue = (job) => {
    if (!job) return null;
    return job.id || job.job_id || job.jobId || job._id || job.external_id;
  };

  // Fetch job from API if jobId exists and job prop is not provided
  useEffect(() => {
    if (!jobId) return;
    if (job) return;

    // Check if jobFromStore matches the requested jobId
    const jobFromStoreId = getJobIdValue(jobFromStore);
    if (jobFromStoreId && jobFromStoreId.toString() === jobId.toString()) {
      return;
    }
    // Fetch the job
    dispatch(getJobById(jobId));
  }, [jobId, dispatch]);

  // Use job prop if provided, otherwise use job from Redux store, fallback to mockJobs
  if (!job) {
    if (jobFromStore) {
      job = jobFromStore;
    } else if (jobId) {
      job = mockJobs.find(j => j.id.toString() === jobId);
    }
  }

  // Show loading state
  if (jobStatus === "loading" && !job) {
    return (
      <div className="min-h-screen bg-white mx-auto space-y-12 pb-12">
        <div className={`pt-10 pb-5 ${layout !== layoutType.preview ? "px-10 lg:px-25" : ""} bg-background-lightBlue`}>
          {/* Header Skeleton */}
          <Container maxWidth="lg">
            <Skeleton variant="text" width="40%" height={40} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 2 }} />
          </Container>
        </div>

        <div className={`grid grid-cols-1 gap-8 ${layout !== layoutType.preview ? "px-10 lg:px-25 lg:grid-cols-3 md:grid-cols-2" : "px-15 lg:grid-cols-1"}`}>
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-4">
            <Skeleton variant="text" width="60%" height={40} />
            <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 2 }} />
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-4">
            <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: 2 }} />
          </div>
        </div>

        {/* Center loading indicator */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 4
          }}
        >
          <CircularProgress size={40} />
        </Box>
      </div>
    );
  }

  // Show error state
  if (jobStatus === "failed" && jobError) {
    return (
      <div className="min-h-screen bg-white mx-auto flex items-center justify-center">
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            px: 4
          }}
        >
          <Box
            sx={{
              fontSize: '4rem',
              mb: 2
            }}
          >
            ⚠️
          </Box>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Failed to Load Job
          </h2>
          <p className="text-gray-600 mb-4">
            {jobError || "Something went wrong while loading the job details."}
          </p>
          <button
            onClick={() => dispatch(getJobById(jobId))}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </Box>
      </div>
    );
  }

  // Show not found state
  if (!job) {
    return (
      <div className="min-h-screen bg-white mx-auto flex items-center justify-center">
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            px: 4
          }}
        >
          <Box
            sx={{
              fontSize: '4rem',
              mb: 2
            }}
          >
            🔍
          </Box>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Job Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The job you're looking for doesn't exist or has been removed.
          </p>
          <a
            href="/"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Back to Home
          </a>
        </Box>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white mx-auto ${layout !== layoutType.preview ? "space-y-12 pb-12" : "space-y-6 pb-6"}`}>
      <div className={`${layout !== layoutType.preview ? "px-10 lg:px-50 py-8" : "sticky top-0 z-10"} bg-background-lightBlue`}>
        {/* {finalConfig.showBreadcrumb && (
          <div className="mb-5">
            <p className="text-sm text-muted-foreground">
              Home / Companies / {typeof job?.company === 'string' ? job.company : job?.company?.name || "Company"} / {job?.title || "Job Title"}
            </p>
          </div>
        )} */}
        {finalConfig.showJobHeader && <JobHeader job={job} layout={layout} />}
      </div>

      <div className={`grid grid-cols-1 ${layout !== layoutType.preview ? "px-10 lg:px-25 lg:grid-cols-3 md:grid-cols-2 gap-8" : "px-10 lg:grid-cols-1 gap-y-8"}`}>
        <div className="lg:col-span-2">
          {finalConfig.showJobDetails && <JobDetails job={job} />}
        </div>
        <div className={`${layout !== layoutType.preview ? "sticky top-0 z-10 self-start" : ""}`}>
          {finalConfig.showJobSidebar && <JobSidebar job={job} />}
        </div>
      </div>

      {finalConfig.showPerksSection &&
        <div className="px-10 lg:px-25">
          <PerksSection job={job} />
        </div>
      }
      {/* {finalConfig.showCompanySection &&
        <div className="px-10 lg:px-25">
          <CompanySection job={job} />
        </div>
      } */}
      {finalConfig.showSimilarJobs &&
        <div className="px-10 lg:px-25">
          <SimilarJobs job={job} />
        </div>
      }
    </div>
  );
}
