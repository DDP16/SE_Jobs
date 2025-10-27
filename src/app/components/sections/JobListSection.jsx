import React, { useState } from 'react';
import {
    Box,
    Typography,
    Stack,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Pagination,
    Container
} from '@mui/material';
import { Sort } from '@mui/icons-material';
import JobCard from '../features/JobCard';
import { mockJobs } from '../../../mocks/mockData';

export default function JobListSection({ onJobSelect, selectedJob }) {
    const [sortBy, setSortBy] = useState('relevance');
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 10;

    const handleJobAction = (action, job) => {
        console.log(`${action} job:`, job);
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    // Calculate pagination
    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const currentJobs = mockJobs.slice(startIndex, endIndex);
    const totalPages = Math.ceil(mockJobs.length / jobsPerPage);

    return (
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            {/* Header */}
            <Box sx={{ mb: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" sx={{ fontWeight: 600, fontSize: '20px' }}>
                        {mockJobs.length} jobs found
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '14px' }}>
                            Sort by:
                        </Typography>
                        <FormControl size="small" sx={{ minWidth: 160 }}>
                            <InputLabel>Sort</InputLabel>
                            <Select
                                value={sortBy}
                                label="Sort"
                                onChange={handleSortChange}
                                startAdornment={<Sort sx={{ mr: 1, fontSize: '18px' }} />}
                                sx={{ fontSize: '14px' }}
                            >
                                <MenuItem value="relevance">Relevance</MenuItem>
                                <MenuItem value="date">Date Posted</MenuItem>
                                <MenuItem value="salary">Salary</MenuItem>
                                <MenuItem value="company">Company</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Stack>
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
                            onBookmark={(job) => handleJobAction('bookmark', job)}
                            onShare={(job) => handleJobAction('share', job)}
                            onApply={(job) => handleJobAction('apply', job)}
                            variant="list"
                        />
                    </Box>
                ))}
            </Stack>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                    sx={{
                        '& .MuiPaginationItem-root': {
                            fontSize: '14px',
                            fontWeight: 500
                        }
                    }}
                />
            </Box>

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
