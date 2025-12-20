import JobHeader from "./partials/JobHeader";
import JobDetails from "./partials/JobDetails";
import JobSidebar from "./partials/JobSidebar";
import { PerksSection } from "../../../components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getJobById } from "../../../modules/services/jobsService";
import { useEffect } from "react";
import { CircularProgress, Box, Skeleton, Container } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function JobDescription({
  job,
}) {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get("id");
  const dispatch = useDispatch();
  const nav = useNavigate();

  const jobFromStore = useSelector(state => state.jobs.job);
  const jobStatus = useSelector(state => state.jobs.status);
  const jobError = useSelector(state => state.jobs.error);

  useEffect(() => {
    if (!jobId && job) return;

    if (!jobFromStore && jobFromStore?.id.toString() === jobId.toString()) {
      return;
    }

    dispatch(getJobById(jobId));
  }, [jobId, dispatch]);

  // Use job prop if provided, otherwise use job from Redux store
  if (!job && jobFromStore) {
    job = jobFromStore;
  }

  // Show loading state
  if (jobStatus === "loading" && !job) {
    return (
      <div className="min-h-screen bg-white mx-auto space-y-12 pb-12">
        <div className={`pt-10 pb-5 px-10 lg:px-25 bg-background-lightBlue`}>
          {/* Header Skeleton */}
          <Container maxWidth="lg">
            <Skeleton variant="text" width="40%" height={40} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 2 }} />
          </Container>
        </div>

        <div className={`grid grid-cols-1 gap-8 px-10 lg:px-25 lg:grid-cols-3 md:grid-cols-2`}>
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
      <div className="h-full w-full bg-white mx-auto flex items-center justify-center">
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
    <div className={`min-h-screen w-full bg-white mx-auto space-y-12 pb-12`}>
      <div className={`px-10 2xl:px-50 py-8 bg-background-lightBlue`}>
        <JobHeader job={job} textButton={t("edit")} onClickButton={() => {nav(`/edit-job/${jobId}`)}} />
      </div>

      <div className={`grid grid-cols-1 px-10 lg:px-25 lg:grid-cols-3 md:grid-cols-2 gap-8`}>
        <div className="lg:col-span-2">
          <JobDetails job={job} />
        </div>
        <div className={`sticky top-15 z-10 self-start`}>
          <JobSidebar job={job} />
        </div>
      </div>

      <div className="px-10 lg:px-25">
        <PerksSection job={job} />
      </div>
    </div>
  );
}
