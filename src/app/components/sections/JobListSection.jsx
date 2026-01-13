import React, { useState, useRef, useEffect, use } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    CircularProgress,
} from '@mui/material';
import JobCard from '../features/JobCard';
import { mockJobs } from '../../../mocks/mockData';
import { getMergedJobs } from '../../modules';
// Note: getJobs and getTopCVJobs are commented out, only using getMergedJobs
import { getSavedJobs, addSavedJob, removeSavedJob } from '../../modules/services/savedJobsService';
import { Pagination, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import useSearch from '../../hooks/useSearch';

export default function JobListSection({ onJobSelect, selectedJob, onClearFilters }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const itemRefs = useRef({});
    const { queryParams } = useSearch();

    const status = useSelector(state => state.jobs?.status ?? 'idle');
    const jobsList = useSelector(state => state.jobs?.jobs ?? mockJobs);
    const pagination = useSelector(state => state.jobs?.pagination ?? {});
    const savedJobs = useSelector(state => state.savedJobs.savedJobs);
    const currentUser = useSelector(state => state.auth.user);

    // Filter out closed jobs
    const filteredJobs = jobsList.filter(job => job.status !== 'Closed');

    const handleJobAction = (action, job, meta) => {
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
                const jobId = meta?.jobId || job.id;
                const actionType = meta?.action;
                if (!jobId) return;
                if (actionType === 'unsave') {
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
        dispatch(getMergedJobs({ ...queryParams, page: currentPage, limit: pageSize }));
    }, [currentPage, pageSize, queryParams]);

    // Fetch saved jobs on mount if user is logged in
    useEffect(() => {
        if (currentUser?.id) {
            dispatch(getSavedJobs());
        }
    }, [dispatch, currentUser?.id]);

    useEffect(() => {
        setCurrentPage(1);
    }, [queryParams]);

    useEffect(() => {
        itemRefs.current = {};
    }, [jobsList]);

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
                    ) : (filteredJobs.length > 0 ? (
                        <div className={`grid grid-cols-1 ${selectedJob ? '' : 'md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'} gap-4`}>
                            {filteredJobs.map((job) => {
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
                                            onBookmark={(job, meta) => handleJobAction('bookmark', job, meta)}
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
                            <Button variant="outlined" onClick={onClearFilters}>
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
                            showSizeChanger={false}
                            onChange={(newPage) => {
                                setCurrentPage(newPage)
                            }}
                        />
                    </div>
                </Box>
            )}
        </>
    );
}
