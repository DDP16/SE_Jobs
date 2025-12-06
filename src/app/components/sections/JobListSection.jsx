import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    Box,
    Typography,
    Stack,
    Button,
    Pagination,
    PaginationItem,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import JobCard from '../features/JobCard';
import { mockJobs } from '../../../mocks/mockData';

export default function JobListSection({ onJobSelect, selectedJob }) {
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 10;
    const itemRefs = useRef({});

    const jobsState = useSelector(state => state.jobs?.jobs ?? state.jobs?.data ?? state.jobs);
    const jobsList = React.useMemo(() => {
        if (!jobsState) return mockJobs;
        if (Array.isArray(jobsState)) return jobsState;
        if (Array.isArray(jobsState.data)) return jobsState.data;
        return mockJobs;
    }, [jobsState]);

    const handleJobAction = (action, job) => {
        console.log('Job action:', action, job);
    };

    useEffect(() => {
        itemRefs.current = {};
    }, [jobsList]);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
        
        const firstIndex = (page - 1) * jobsPerPage;
        const firstJob = jobsList[firstIndex];
        const firstId = firstJob ? (firstJob.id ?? firstJob.job_id ?? firstJob.jobId ?? firstJob._id) : null;

        setTimeout(() => {
            const el = firstId ? itemRefs.current[firstId] : null;
            if (el && typeof el.scrollIntoView === 'function') {
                el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            } else {
                const container = document.querySelector('[data-job-list-scroll]');
                if (container && typeof container.scrollTo === 'function') {
                    container.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        }, 120);
    };

    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const currentJobs = jobsList.slice(startIndex, endIndex);
    const totalPages = Math.ceil(jobsList.length / jobsPerPage);

    useEffect(() => {
        if (!selectedJob) return;
        
        const selectedId = selectedJob?.id ?? selectedJob?.job_id ?? selectedJob?.jobId ?? selectedJob?._id;
        const idx = jobsList.findIndex(
            (j) => (j.id === selectedId) || (j.job_id === selectedId) || (j.jobId === selectedId) || (j._id === selectedId)
        );
        
        if (idx === -1) return;
        
        const targetPage = Math.floor(idx / jobsPerPage) + 1;
        setCurrentPage(targetPage);

        const t = setTimeout(() => {
            const el = itemRefs.current[selectedId];
            if (el && typeof el.scrollIntoView === 'function') {
                el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 120);
        
        return () => clearTimeout(t);
    }, [selectedJob, jobsList, jobsPerPage]);

    return (
        <Box sx={{ flexGrow: 1, minWidth: 0 }} className="space-y-3 md:space-y-5">
            <Box className="bg-white rounded-xl p-2 md:p-3 shadow-sm border border-gray-100">
                <div className='body-large font-semibold ml-2'>
                    {jobsList.length} {jobsList.length <= 1 ? 'job' : 'jobs'} found
                </div>
            </Box>

            {jobsList.length > 0 ? (
                <Stack spacing={2}>
                    {currentJobs.map((job) => {
                        const keyId = job.id ?? job.job_id ?? job.jobId ?? job._id;
                        const isSelected = selectedJob && ((selectedJob?.id ?? selectedJob?.job_id ?? selectedJob?.jobId ?? selectedJob?._id) === keyId);

                        return (
                            <Box
                                key={keyId}
                                ref={(el) => { if (keyId) itemRefs.current[keyId] = el; }}
                                onClick={() => onJobSelect?.(job)}
                                sx={{
                                    cursor: 'pointer',
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
                                    showDescription={false}
                                    showActions={false}
                                    onBookmark={(job) => handleJobAction('bookmark', job)}
                                    variant="list"
                                    showPopup={false}
                                    onClick={() => { }}
                                />
                            </Box>
                        );
                    })}
                </Stack>
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
            )}

            {totalPages > 1 && (
                <Box className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100" sx={{ mt: 4 }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '14px' }}>
                            Showing <strong>{startIndex + 1}-{Math.min(endIndex, jobsList.length)}</strong> of <strong>{jobsList.length}</strong> jobs
                        </Typography>

                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            variant="outlined"
                            shape="rounded"
                            color="primary"
                            showFirstButton
                            showLastButton
                            renderItem={(item) => (
                                <PaginationItem
                                    slots={{
                                        previous: ArrowBackIcon,
                                        next: ArrowForwardIcon
                                    }}
                                    {...item}
                                />
                            )}
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    minWidth: '36px',
                                    height: '36px',
                                    margin: '0 2px',
                                    '&.Mui-selected': {
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                        fontWeight: 600,
                                        '&:hover': {
                                            backgroundColor: 'primary.dark',
                                        }
                                    },
                                    '&:hover': {
                                        backgroundColor: 'primary.50',
                                        borderColor: 'primary.main',
                                    }
                                },
                                '& .MuiPaginationItem-icon': {
                                    fontSize: '20px'
                                }
                            }}
                        />
                    </Stack>
                </Box>
            )}
        </Box>
    );
}
