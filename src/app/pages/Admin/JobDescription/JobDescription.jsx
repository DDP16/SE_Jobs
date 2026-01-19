import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getJobById } from "../../../modules/services/jobsService";
import { useEffect, useState } from "react";
import { CircularProgress, Box, Skeleton, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getAdminApplicationsByJobId } from "../../../modules/services/applicationsService";
import { JobHeader, TabApplicants, TabDetails } from "../../../components/manage/job";
import UpdateJobStatusModal from "./partials/UpdateJobStatusModal";

export default function JobDescription({
  tabShow = "details"
}) {
  const { t } = useTranslation();
  const jobId = useParams().id;
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [tabActive, setTabActive] = useState(tabShow);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const { job, status: jobStatus, error: jobError } = useSelector(state => state.jobs);
  const { status: applicationStatus, error: applicationError } = useSelector(state => state.applications);

  useEffect(() => {
    if (!jobId && job) return;

    if (!job && job?.id.toString() === jobId.toString()) {
      return;
    }

    dispatch(getJobById(jobId));
    dispatch(getAdminApplicationsByJobId({ jobId }));
  }, [jobId, dispatch]);

  const handleChangeTab = (tab) => {
    if (tabActive === tab) return;
    setTabActive(tab);
  };
  
  // Show loading state
  if ((jobStatus === "loading" && !job) || (applicationStatus === "loading")) {
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

  if (
    applicationStatus === "failed" 
    && (applicationError === "Authentication required" || applicationError === "Forbidden: insufficient permissions")
  ) {
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
            You do not have permission
          </h2>
          <p className="text-gray-600 mb-4">
            You do not have permission to access this data.
          </p>
          <button
            onClick={() => nav("/jobs")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Go Back to Job Page
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
    <div className={`min-h-screen w-full bg-white mx-auto`}>
      <div>
        <div className={`px-5 lg:px-10 pb-4 bg-background-lightBlue`}>
          <JobHeader job={job} textButton={"Update Status"} onClickButton={() => setIsStatusModalOpen(true)} />
        </div>
        <div className={`flex space-x-2 bg-background-lightBlue px-5 lg:px-10 transition-all`}>
          <button 
            className={
              `${tabActive === "details" ? "bg-white" : "bg-neutrals-10 cursor-pointer"}
              px-5 py-2 rounded-t-lg border-t-2 border-x-2 border-gray-200 transition-all duration-200 ease-in-out`
            }
            onClick={() => handleChangeTab("details")}
          >
            {t("job_details")}
          </button>
          <button 
            className={
              `${tabActive === "applicants" ? "bg-white" : "bg-neutrals-10 cursor-pointer"}
              px-5 py-2 rounded-t-lg border-t-2 border-x-2 border-gray-200 transition-all duration-200 ease-in-out`
            }
            onClick={() => handleChangeTab("applicants")}
          >
            {t("applicants")}
          </button>
        </div>
      </div>

      {tabActive === "details" ? (
        <TabDetails job={job} />
      ) : (
        <TabApplicants />
      )}

      <UpdateJobStatusModal
        job={job}
        open={isStatusModalOpen}
        onOpenChange={setIsStatusModalOpen}
      />
    </div>
  );
}
