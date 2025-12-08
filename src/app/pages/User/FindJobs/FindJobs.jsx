import React, { useState, useRef, useEffect } from "react";
import { Container, Box, Stack, useMediaQuery, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { JobListSection, HeroSection, FilterDialog, FilterToolbar } from "../../../components";
import JobDescription from "../JobDescription";
import { layoutType } from "../../../lib";
import useSearch from "../../../hooks/useSearch";
import { useDispatch, useSelector } from 'react-redux';
import { getLevels } from '../../../modules/services/levelsService';
import { getEmploymentTypes } from '../../../modules/services/employmentTypeService';

export default function FindJobs() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    
    const [selectedJob, setSelectedJob] = useState(null);
    const isSmall = useMediaQuery(theme.breakpoints.down('md'));
    const jobDescRef = useRef(null);
    const { jobs = [], pagination, status } = useSelector((state) => state.jobs || {});

    const levels = useSelector(state => state.levels);
    const employmentTypes = useSelector(state => state.employmentTypes);
    useEffect(() => {
        dispatch(getLevels());
        dispatch(getEmploymentTypes());
    }, [dispatch]);

    useEffect(() => {
        if (selectedJob && jobDescRef.current) {
            try {
                jobDescRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (e) {
                // fallback for non-scrollable elements
                jobDescRef.current.scrollTop = 0;
            }
        }
    }, [selectedJob]);

    // Sử dụng custom hook để quản lý search và filter
    const {
        appliedFilters,
        isFilterOpen,
        focusSection,
        activeFilterCount,
        handleSearch,
        handlePageChange,
        handleApplyFilters,
        handleQuickFilter,
        handleQuickFilterChange,
        openFilter,
        closeFilter,
    } = useSearch();

    const handleJobSelect = (job) => {
        if (isSmall) {
            navigate(`/job/${job?.id ?? ''}`);
            return;
        }
        setSelectedJob(job);
    };

    return (
        <>
            <HeroSection onSearch={handleSearch} />
            <div className="w-full px-10 py-2 md:py-3 space-y-3 md:space-y-5">
                {/* Top filter toolbar */}
                <FilterToolbar
                    onFilterClick={openFilter}
                    onQuickFilterClick={handleQuickFilter}
                    onQuickFilterChange={handleQuickFilterChange}
                    activeFilterCount={activeFilterCount}
                    appliedFilters={appliedFilters}
                />

                <div
                    className="items-start space-x-3 md:space-x-5 flex flex-col md:flex-row"
                >
                    {/* LEFT - Job List */}
                    <Box className={`${selectedJob ? 'flex-2' : 'flex-3'} w-full min-w-0`}>
                        {status === 'loading' && jobs.length === 0 ? (
                            <Box className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 8 }}>
                                    <CircularProgress size={48} />
                                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                                        Đang tìm kiếm công việc...
                                    </Typography>
                                </Box>
                            </Box>
                        ) : (
                            <JobListSection
                                jobs={jobs}
                                pagination={pagination}
                                isLoading={status === 'loading'}
                                onPageChange={handlePageChange}
                                onJobSelect={handleJobSelect}
                                selectedJob={selectedJob}
                            />
                        )}
                    </Box>

                    {/* Right - Job Description (hidden on small screens) */}
                    <Box
                        ref={jobDescRef}
                        className={`${selectedJob ? 'flex-3' : 'flex-2'} min-w-0 hidden md:block sticky top-4 rounded-xl border border-gray-200 shadow-sm`}
                        sx={{
                            overflow: 'auto',
                            maxHeight: '96vh',
                            scrollbarWidth: 'none', // Firefox
                            '&::-webkit-scrollbar': { width: 0, height: 0 }, // WebKit
                        }}
                    >
                        {selectedJob ? (
                            <JobDescription
                                job={selectedJob}
                                layout={layoutType.preview}
                            />
                        ) : (
                            <Box className="p-12 md:p-16 text-center bg-white rounded-xl border border-gray-200 shadow-sm">
                                <div className="max-w-md mx-auto">
                                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Select a job to view details</h3>
                                    <p className="text-sm text-gray-600">Choose a job from the list to see the full description</p>
                                </div>
                            </Box>
                        )}
                    </Box>
                </div>
            </div>

            {/* Filter popup component */}
            <FilterDialog
                open={isFilterOpen}
                onClose={closeFilter}
                onApply={handleApplyFilters}
                title="Filter Jobs"
                focusSection={focusSection}
                initialFilters={appliedFilters}
                salaryMin={0}
                salaryMax={100000000}
            />
        </>
    );
}
