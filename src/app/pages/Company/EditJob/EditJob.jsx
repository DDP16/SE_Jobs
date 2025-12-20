// src/app/pages/Company/EditJob/EditJob.jsx
import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJobById } from "../../../modules/services/jobsService";
import PostJob from "../PostJob/PostJob";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function EditJob() {
  const { jobId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get job data from location state if available (when navigating from JobTable)
  const locationState = location.state || {};
  const jobFromState = locationState.job || null;
  const jobIdFromState = locationState.jobId || null;

  // Use jobId from URL params first, then from location state
  const finalJobId = jobId || jobIdFromState;

  // Get job from Redux store
  const jobFromRedux = useSelector((state) => state.jobs?.job);
  const jobStatus = useSelector((state) => state.jobs?.status);

  // Local state for processed job data
  const [processedJob, setProcessedJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Validate and fetch job data
  useEffect(() => {
    // Validate jobId
    if (!finalJobId) {
      console.error("No job ID provided");
      navigate("/job-listing");
      return;
    }

    const loadJobData = async () => {
      setIsLoading(true);

      try {
        const result = await dispatch(getJobById({ jobId: finalJobId, formatTopCv: false })).unwrap();
        const jobData = result.data || result.formattedJob || result;
        setProcessedJob(processJobData(jobData));
      } catch (error) {
        console.error("Error fetching job:", error);
        alert("Không thể tải thông tin công việc. Vui lòng thử lại.");
        navigate("/job-listing");
      } finally {
        setIsLoading(false);
      }
    };

    loadJobData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalJobId, dispatch, navigate]);

  const processJobData = (rawJob) => {
    if (!rawJob) return null;

    return {
      ...rawJob,
      job_id: rawJob.job_id || rawJob.id,
      id: rawJob.id || rawJob.job_id,
      salary_from: rawJob.salary_from ?? rawJob.salary?.from,
      salary_to: rawJob.salary_to ?? rawJob.salary?.to,
      salary_currency: rawJob.salary_currency || rawJob.salary?.currency || 'USD',
      deadline: rawJob.job_deadline || rawJob.deadline,
      job_deadline: rawJob.job_deadline || rawJob.deadline,
      employment_types: rawJob.employment_types || rawJob.workingTime || [],
      company_branches_id: rawJob.company_branches_id ||
        (Array.isArray(rawJob.company_branches) && rawJob.company_branches.length > 0
          ? rawJob.company_branches[0]?.id
          : null),
      categories: Array.isArray(rawJob.categories) ? rawJob.categories : [],
      skills: Array.isArray(rawJob.skills) ? rawJob.skills : (Array.isArray(rawJob.required_skills) ? rawJob.required_skills : []),
      levels: Array.isArray(rawJob.levels) ? rawJob.levels : [],
      benefit: Array.isArray(rawJob.benefit) ? rawJob.benefit : [],
      responsibilities: rawJob.responsibilities,
      requirement: rawJob.requirement,
      nice_to_haves: rawJob.nice_to_haves,
    };
  };

  // Show loading state
  if (isLoading || jobStatus === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </div>
    );
  }

  // Show error if no job data
  if (!processedJob) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy công việc</h2>
          <button
            onClick={() => navigate("/job-listing")}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <PostJob
      isEditing={true}
      job={processedJob}
      jobId={finalJobId}
    />
  );
}
