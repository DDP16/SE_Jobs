import React, { useState, useRef, useEffect, use } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Stack,
    Button,
    PaginationItem,
    CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import JobCard from '../features/JobCard';
import { mockJobs } from '../../../mocks/mockData';
import { getJobs, getTopCVJobs } from '../../modules';
import { getSavedJobs, addSavedJob, removeSavedJob } from '../../modules/services/savedJobsService';
import { Pagination, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import useSearch from '../../hooks/useSearch';

export default function JobListSection({ onJobSelect, selectedJob }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(9);
    const [currentTopCVPage, setCurrentTopCVPage] = useState(1);
    const [pageTopCVSize, setPageTopCVSize] = useState(6);
    const itemRefs = useRef({});
    const { queryParams } = useSearch();

    const status = useSelector(state => state.jobs?.status ?? 'idle');
    const jobsList = useSelector(state => state.jobs?.jobs ?? mockJobs);
    const pagination = useSelector(state => state.jobs?.pagination ?? {});
    const savedJobs = useSelector(state => state.savedJobs.savedJobs);
    const currentUser = useSelector(state => state.auth.user);

    // Debug: Log Redux state
    // useEffect(() => {
    //     console.log('[JobListSection] Redux jobs state:', {
    //         status,
    //         jobsLength: jobsList?.length,
    //         isUsingMockData: jobsList === mockJobs,
    //         pagination,
    //         queryParams
    //     });
    // }, [status, jobsList, pagination, queryParams]);

    const jobsTopCV = useSelector(state => state.topCVJobs?.jobs || []);
    const paginationTopCV = useSelector(state => state.topCVJobs?.pagination || {});
    const statusTopCV = useSelector(state => state.topCVJobs?.status);

    const handleJobAction = (action, job) => {
        switch (action) {
            case 'bookmark':
                if (!currentUser) {
                    navigate('/login');
                    return;
                }
                if (currentUser.role !== 'Student') {
                    console.warn('Only students can bookmark jobs');
                    return;
                }
                const jobId = job.id || job.job_id;
                const isBookmarked = savedJobs.some(savedJob => 
                    (savedJob.id || savedJob.job_id) === jobId
                );
                if (isBookmarked) {
                    dispatch(removeSavedJob(jobId));
                } else {
                    dispatch(addSavedJob(jobId));
                }
                break;
            default:
                console.log('Job action:', action, job);
        }
    };

    useEffect(() => {
        dispatch(getJobs({ ...queryParams, page: currentPage, limit: pageSize }));
    }, [currentPage, pageSize, queryParams]);

    useEffect(() => {
        dispatch(getTopCVJobs({ ...queryParams, page: currentTopCVPage, limit: pageTopCVSize }));
    }, [currentTopCVPage, pageTopCVSize, queryParams]);

    // Fetch saved jobs on mount if user is logged in
    useEffect(() => {
        if (currentUser?.id) {
            dispatch(getSavedJobs());
        }
    }, [dispatch, currentUser?.id]);

    useEffect(() => {
        setCurrentPage(1);
        setCurrentTopCVPage(1);
    }, [queryParams]);

    useEffect(() => {
        itemRefs.current = {};
    }, [jobsList]);

    // const handlePageChange = (event, page) => {
    //     setCurrentPage(page);

    //     const firstIndex = (page - 1) * pageSize;
    //     const firstJob = jobsList[firstIndex];
    //     const firstId = firstJob ? (firstJob.id ?? firstJob.job_id ?? firstJob.jobId ?? firstJob._id) : null;

    //     setTimeout(() => {
    //         const el = firstId ? itemRefs.current[firstId] : null;
    //         if (el && typeof el.scrollIntoView === 'function') {
    //             el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    //         } else {
    //             const container = document.querySelector('[data-job-list-scroll]');
    //             if (container && typeof container.scrollTo === 'function') {
    //                 container.scrollTo({ top: 0, behavior: 'smooth' });
    //             } else {
    //                 window.scrollTo({ top: 0, behavior: 'smooth' });
    //             }
    //         }
    //     }, 120);
    // };

    // useEffect(() => {
    //     if (!selectedJob) return;

    //     const selectedId = selectedJob?.id ?? selectedJob?.job_id ?? selectedJob?.jobId ?? selectedJob?._id;
    //     const idx = jobsList.findIndex(
    //         (j) => (j.id === selectedId) || (j.job_id === selectedId) || (j.jobId === selectedId) || (j._id === selectedId)
    //     );

    //     if (idx === -1) return;

    //     const targetPage = Math.floor(idx / pageSize) + 1;
    //     setCurrentPage(targetPage);

    //     const t = setTimeout(() => {
    //         const el = itemRefs.current[selectedId];
    //         if (el && typeof el.scrollIntoView === 'function') {
    //             el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    //         }
    //     }, 120);

    //     return () => clearTimeout(t);
    // }, [selectedJob, jobsList, pageSize]);

    return (
        <>
            {status === 'loading' ? (
                <Box className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 8 }}>
                        <CircularProgress size={48} />
                        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                            Đang tìm kiếm công việc...
                        </Typography>
                    </Box>
                </Box>
            ) : (
                <Box sx={{ flexGrow: 1, minWidth: 0 }} className="space-y-3 md:space-y-5">
                    <Box className="bg-white rounded-xl p-2 md:p-3 shadow-sm border border-gray-100">
                        <div className='body-large font-semibold ml-2'>
                            {pagination.total} {pagination.total <= 1 ? 'job' : 'jobs'} found
                        </div>
                    </Box>

                    {status === 'loading' ? (
                        <div className="flex items-center justify-center">
                            <Spin indicator={<LoadingOutlined spin />} size="large" />
                        </div>
                    ) : (jobsList.length > 0 ? (
                        <div className={`grid ${selectedJob ? 'grid-cols-1' : 'grid-cols-3 2xl:grid-cols-4'} gap-4`}>
                            {jobsList.map((job) => {
                                const keyId = job.id ?? job.job_id ?? job.jobId ?? job._id;
                                const isSelected = selectedJob && ((selectedJob?.id ?? selectedJob?.job_id ?? selectedJob?.jobId ?? selectedJob?._id) === keyId);
                                const isBookmarked = savedJobs.some(savedJob => 
                                    (savedJob.id || savedJob.job_id) === keyId
                                );

                                return (
                                    <Box
                                        key={keyId}
                                        ref={(el) => { if (keyId) itemRefs.current[keyId] = el; }}
                                        sx={{
                                            border: isSelected ? '2px solid' : '1px solid',
                                            borderColor: isSelected ? 'primary.main' : 'transparent',
                                            borderRadius: 2,
                                            transition: 'all 0.2s ease-in-out',
                                            '&:hover': {
                                                borderColor: 'primary.light',
                                                transform: 'translateY(-1px)',
                                                boxShadow: 2,
                                            },
                                        }}
                                    >
                                        <JobCard
                                            job={job}
                                            variant="list"
                                            showPopup={false}
                                            isBookmarked={isBookmarked}
                                            onBookmark={(job) => handleJobAction('bookmark', job)}
                                            onClick={() => onJobSelect?.(job)}
                                        />
                                    </Box>
                                );
                            })}
                        </div>
                    ) : (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                                No jobs found
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                                Try adjusting your search criteria or filters
                            </Typography>
                            <Button variant="outlined" onClick={() => window.location.reload()}>
                                Clear Filters
                            </Button>
                        </Box>
                    )
                    )}

                    <div>
                        <Pagination align="center"
                            current={currentPage}
                            total={pagination?.total ?? 0}
                            pageSize={pageSize}
                            onChange={
                                (newPage, newPageSize) => {
                                    setCurrentPage(newPage)
                                    setPageSize(newPageSize)
                                }
                            }
                        />
                    </div>

                    {/* TOPCV */}
                    {statusTopCV === 'loading' ? (
                        <div className="flex items-center justify-center">
                            <Spin indicator={<LoadingOutlined spin />} size="large" />
                        </div>
                    ) : (jobsTopCV.length > 0 ? (
                        <div className={`grid ${selectedJob ? 'grid-cols-1' : 'grid-cols-3 2xl:grid-cols-4'} gap-4`}>
                            {jobsTopCV.map((job) => {
                                const keyId = job.id ?? job.job_id ?? job.jobId ?? job._id;
                                const isSelected = selectedJob && ((selectedJob?.id ?? selectedJob?.job_id ?? selectedJob?.jobId ?? selectedJob?._id) === keyId);

                                return (
                                    <Box
                                        key={keyId}
                                        ref={(el) => { if (keyId) itemRefs.current[keyId] = el; }}
                                        sx={{
                                            border: isSelected ? '2px solid' : '1px solid',
                                            borderColor: isSelected ? 'primary.main' : 'transparent',
                                            borderRadius: 2,
                                            transition: 'all 0.2s ease-in-out',
                                            '&:hover': {
                                                borderColor: 'primary.light',
                                                transform: 'translateY(-1px)',
                                                boxShadow: 2,
                                            },
                                        }}
                                    >
                                        <JobCard
                                            job={job}
                                            variant="list"
                                            showPopup={false}
                                            onBookmark={(job) => handleJobAction('bookmark', job)}
                                            onClick={() => onJobSelect?.(job)}
                                        />
                                    </Box>
                                );
                            })}
                        </div>
                    ) : (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                                No jobs found
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                                Try adjusting your search criteria or filters
                            </Typography>
                            <Button variant="outlined" onClick={() => window.location.reload()}>
                                Clear Filters
                            </Button>
                        </Box>
                    )
                    )}

                    <div>
                        <Pagination align="center"
                            current={currentTopCVPage}
                            total={paginationTopCV?.totalItems ?? 0}
                            pageSize={pageTopCVSize}
                            onChange={
                                (newPage, newPageSize) => {
                                    setCurrentTopCVPage(newPage)
                                    setPageTopCVSize(newPageSize)
                                }
                            }
                        />
                    </div>
                </Box>
            )}
        </>
    );
}
