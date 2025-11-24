import React from 'react';
import {
    Box,
    Typography,
    Stack,
    Button,
    Pagination,
    PaginationItem,
    CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import JobCard from '../features/JobCard';

const transformJobData = (job) => {
    if (!job) return null;

    const salaryText = (() => {
        if (job.salary_text) return job.salary_text;
        if (job.salary_from || job.salary_to) {
            const from = job.salary_from || 0;
            const to = job.salary_to || 0;
            const currency = job.salary_currency || "";
            if (from && to) return `${from} - ${to} ${currency}`.trim();
            if (from) return `From ${from} ${currency}`.trim();
            if (to) return `Up to ${to} ${currency}`.trim();
        }
        return "Negotiable";
    })();

    return {
        id: job.id || job.job_id || job.external_id || job.slug || job.title,
        title: job.title || "Job Title",
        company: job.company?.name || job.company_name || job.company || "Company Name",
        location: job.location || job.company_branches?.location || job.company_branches?.address || job.address || "Location",
        type: job.working_time || job.type || "Full-time",
        salary: salaryText,
        description: job.description || "",
        categories: job.categories || [],
        logo: job.company?.logo || job.logo || (job.title ? job.title.charAt(0).toUpperCase() : "J"),
        isFeatured: job.is_hot || job.is_diamond || job.isFeatured || false,
        ...job,
    };
};

export default function JobListSection({
    jobs = [],
    pagination,
    total,
    isLoading = false,
    onPageChange,
    onJobSelect,
    selectedJob
}) {
    const currentPage = pagination?.page || 1;
    const jobsPerPage = pagination?.limit || 10;
    const totalJobs = total ?? pagination?.total ?? jobs.length;
    const totalPages = pagination?.total_pages || Math.max(1, Math.ceil((totalJobs || 1) / jobsPerPage));

    const handleJobAction = (action, job) => {
        // debug handler removed
    };

    const handlePageChange = (event, page) => {
        onPageChange?.(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const transformedJobs = jobs.map(transformJobData).filter(Boolean);

    const showPagination = totalPages > 1;
    const showNoResults = !isLoading && transformedJobs.length === 0;

    return (
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            {/* Header */}
            <Box className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100" sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '18px', color: 'text.primary' }}>
                    {totalJobs} {totalJobs === 1 ? 'job' : 'jobs'} found
                </Typography>
            </Box>

            {/* Job List */}
            <Stack spacing={2} sx={{ mb: 5 }}>
                {isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                    </Box>
                )}

                {!isLoading && transformedJobs.map((job) => (
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
                            onBookmark={(jobItem) => handleJobAction('bookmark', jobItem)}
                            variant="list"
                            showPopup={false}
                        />
                    </Box>
                ))}
            </Stack>

            {/* Pagination */}
            {showPagination && (
                <Box className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100" sx={{ mt: 4 }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
                        {/* Page info */}
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '14px' }}>
                            Showing <strong>{totalJobs === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, totalJobs)}</strong> of <strong>{totalJobs}</strong> jobs
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
            {showNoResults && (
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
