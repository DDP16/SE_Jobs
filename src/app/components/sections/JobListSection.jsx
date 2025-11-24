import React, { useState } from 'react';
import {
    Box,
    Typography,
    Stack,
    Button,
    Pagination,
    PaginationItem
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import JobCard from '../features/JobCard';
import { mockJobs } from '../../../mocks/mockData';

export default function JobListSection({ onJobSelect, selectedJob }) {
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 10;

    const handleJobAction = (action, job) => {
        // debug handler removed
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
        // Scroll to top of job list
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Calculate pagination
    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const currentJobs = mockJobs.slice(startIndex, endIndex);
    const totalPages = Math.ceil(mockJobs.length / jobsPerPage);

    return (
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            {/* Header */}
            <Box className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100" sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '18px', color: 'text.primary' }}>
                    {mockJobs.length} {mockJobs.length === 1 ? 'job' : 'jobs'} found
                </Typography>
            </Box>

            {/* Job List */}
            <Stack spacing={2} sx={{ mb: 5 }}>
                {currentJobs.map((job) => (
                    <Box
                        key={job.id}
                        onClick={() => onJobSelect?.(job)}
                        sx={{
                            cursor: 'pointer',
                            border: selectedJob?.id === job.id ? '2px solid' : '1px solid',
                            borderColor: selectedJob?.id === job.id ? 'primary.main' : 'transparent',
                            borderRadius: 2,
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                borderColor: 'primary.light',
                                transform: 'translateY(-1px)',
                                boxShadow: 2
                            }
                        }}
                    >
                        <JobCard
                            job={job}
                            showDescription={false}
                            showActions={false}
                            onBookmark={(job) => handleJobAction('bookmark', job)}
                            variant="list"
                            showPopup={false}
                        />
                    </Box>
                ))}
            </Stack>

            {/* Pagination */}
            {totalPages > 1 && (
                <Box className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100" sx={{ mt: 4 }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
                        {/* Page info */}
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '14px' }}>
                            Showing <strong>{startIndex + 1}-{Math.min(endIndex, mockJobs.length)}</strong> of <strong>{mockJobs.length}</strong> jobs
                        </Typography>

                        {/* Pagination */}
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

            {/* No Results */}
            {mockJobs.length === 0 && (
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
        </Box>
    );
}
