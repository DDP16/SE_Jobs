import JobHeader from "../JobDescription/partials/JobHeader";
import TopCVJobDetails from "./TopCVJobDetails";
import TopCVJobInfo from "./partials/TopCVJobInfo";
import TopCVJobSidebar from "./partials/TopCVJobSidebar";
import SimilarJobs from "../JobDescription/partials/SimilarJobs";
import { layoutType } from "../../../lib";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { CircularProgress, Box, Skeleton, Container } from "@mui/material";
import { getTopCVJobById } from "../../../modules/services/topCVService";

export default function TopCVDescription({
    job: jobProp,
    jobId: jobIdProp,
    layout = layoutType.full,
    showSimilarJobs = true,
}) {
    const [searchParams] = useSearchParams();
    const jobIdFromUrl = searchParams.get("id");
    const jobId = jobIdProp || jobIdFromUrl;
    const dispatch = useDispatch();

    const jobFromStore = useSelector(state => state.topCVJobs.job);
    const jobStatus = useSelector(state => state.topCVJobs.status);
    const jobError = useSelector(state => state.topCVJobs.error);

    // Layout configurations
    const layoutConfig = {
        [layoutType.full]: {
            showSimilarJobs: true,
        },
        [layoutType.preview]: {
            showSimilarJobs: false,
        },
        [layoutType.compact]: {
            showSimilarJobs: false,
        },
        [layoutType.minimal]: {
            showSimilarJobs: false,
        },
    };

    // Use layout config if layout prop is provided
    const config = layoutConfig[layout] || {};
    const finalConfig = {
        showSimilarJobs: showSimilarJobs && config.showSimilarJobs,
    };

    useEffect(() => {
        // Only fetch if no job prop provided and jobId exists
        if (jobProp || !jobId) return;

        if (jobFromStore && jobFromStore?.id?.toString() === jobId.toString()) {
            return;
        }

        dispatch(getTopCVJobById(jobId));
    }, [jobId, dispatch, jobFromStore, jobProp]);

    // Use job prop if provided, otherwise use job from Redux store
    let job = jobProp || jobFromStore;

    // Loading state - mimic JobDescription style (only show if fetching from API)
    if (!jobProp && jobStatus === "loading" && !job) {
        return (
            <div className={`min-h-screen bg-white mx-auto ${layout !== layoutType.preview ? "space-y-12 pb-12" : "space-y-6 pb-6"}`}>
                <div className={`${layout !== layoutType.preview ? "pt-10 pb-5 px-10 lg:px-25" : "sticky top-0 z-10"} bg-background-lightBlue`}>
                    {/* Header Skeleton */}
                    <Container maxWidth="lg">
                        <Skeleton variant="text" width="40%" height={40} sx={{ mb: 2 }} />
                        <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 2 }} />
                    </Container>
                </div>

                <div className={`${layout !== layoutType.preview ? "px-10 lg:px-25" : "px-10"}`}>
                    <div className={`grid grid-cols-1 ${layout !== layoutType.preview ? "lg:grid-cols-3 gap-8" : "lg:grid-cols-1 gap-y-8"}`}>
                        <div className={layout !== layoutType.preview ? "lg:col-span-2 space-y-4" : "space-y-4"}>
                            <Skeleton variant="text" width="60%" height={40} />
                            <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 2 }} />
                            <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 2 }} />
                        </div>
                        {layout !== layoutType.preview && (
                            <div className="space-y-4">
                                <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: 2 }} />
                            </div>
                        )}
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

    // Error state (only show if fetching from API)
    if (!jobProp && jobStatus === "failed" && jobError) {
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
                        Không thể tải thông tin công việc
                    </h2>
                    <p className="text-gray-600 mb-4">
                        {jobError || "Đã có lỗi xảy ra khi tải chi tiết công việc. Vui lòng thử lại sau."}
                    </p>
                    <button
                        onClick={() => dispatch(getTopCVJobById(jobId))}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Thử lại
                    </button>
                </Box>
            </div>
        );
    }

    // Not found
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
                        Không tìm thấy công việc
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Công việc bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ bỏ.
                    </p>
                    <a
                        href="/"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block"
                    >
                        Về trang chủ
                    </a>
                </Box>
            </div>
        );
    }

    const handleApplyFromHeader = () => {
        if (job.url) {
            window.open(job.url, '_blank', 'noopener,noreferrer');
        }
    };

    const isPreview = layout === layoutType.preview;

    return (
        <div className={`min-h-screen w-full bg-white mx-auto ${!isPreview ? "space-y-12 pb-12" : "space-y-6 pb-6"}`}>
            {/* Header section with light blue background */}
            <div className={`${!isPreview ? "px-10 xl:px-50 py-8" : "sticky top-0 z-10"} bg-background-lightBlue`}>
                <JobHeader
                    job={job}
                    layout={layout}
                    onClickButton={handleApplyFromHeader}
                />
            </div>

            {/* Main content area - responsive grid layout */}
            <div className={!isPreview ? "px-10 lg:px-25" : "px-10"}>
                <div className={`grid grid-cols-1 ${!isPreview ? "lg:grid-cols-3 gap-8" : "lg:grid-cols-1 gap-y-8"}`}>
                    {/* Left: Job Information */}
                    <div className={!isPreview ? "lg:col-span-2 space-y-8" : "space-y-8"}>
                        {/* Job Details (Mô tả + Yêu cầu) */}
                        <TopCVJobDetails job={job} />

                        {/* Job Info (Quyền lợi + Địa điểm + Thời gian + Cách ứng tuyển + Buttons + Report) */}
                        <TopCVJobInfo job={job} />
                    </div>

                    {/* Right: Company Information (hidden in preview mode) */}
                    {!isPreview && (
                        <div className="lg:col-span-1">
                            <div className="lg:sticky lg:top-4 h-fit">
                                <TopCVJobSidebar job={job} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Similar Jobs section (hidden in preview mode) */}
            {finalConfig.showSimilarJobs && (
                <div className="px-10 lg:px-25">
                    <SimilarJobs job={job} />
                </div>
            )}
        </div>
    );
}


