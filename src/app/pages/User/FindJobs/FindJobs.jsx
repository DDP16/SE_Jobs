import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Container, Box, Stack, useMediaQuery, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { JobListSection, HeroSection, FilterDialog, FilterToolbar } from "../../../components";
import JobDescription from "../JobDescription";
import { layoutType } from "../../../lib";
import { getJobs } from "../../../modules/services/jobsService";

export default function FindJobs() {
    const [selectedJob, setSelectedJob] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState({});
    const [focusSection, setFocusSection] = useState(null);
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const jobDescRef = useRef(null);
    const { jobs = [], pagination, status } = useSelector((state) => state.jobs || {});

    const queryParams = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return {
            page: Number(params.get('page')) || 1,
            title: params.get('title') || '',
            location: params.get('location') || '',
        };
    }, [location.search]);

    const updateQueryParams = useCallback(
        (nextParams) => {
            const params = new URLSearchParams();
            Object.entries(nextParams).forEach(([key, value]) => {
                if (value === undefined || value === null || value === '') return;
                if (key === 'page' && Number(value) <= 1) return;
                params.set(key, value);
            });

            const searchString = params.toString();
            navigate({
                pathname: location.pathname,
                search: searchString ? `?${searchString}` : '',
            });
        },
        [navigate, location.pathname]
    );

    const { page: currentPage = 1, title: currentTitle = '', location: currentLocation = '' } = queryParams;

    useEffect(() => {
        dispatch(
            getJobs({
                page: currentPage,
                title: currentTitle || undefined,
                location: currentLocation || undefined,
            })
        );
    }, [dispatch, currentPage, currentTitle, currentLocation]);

    const handleSearch = useCallback(
        ({ keyword, location }) => {
            updateQueryParams({
                ...queryParams,
                page: 1,
                title: keyword?.trim(),
                location: location?.trim(),
            });
        },
        [queryParams, updateQueryParams]
    );

    const handleFilter = (filterParams) => {
        console.log('Filter params:', filterParams);
        // TODO: Implement filter functionality
    };

    const handlePageChange = useCallback((page) => {
        updateQueryParams({
            ...queryParams,
            page,
        });
    }, [queryParams, updateQueryParams]);

    const handleJobSelect = (job) => {
        if (isSmall) {
            navigate(`/job/${job?.id ?? ''}`);
            return;
        }
        setSelectedJob(job);
    };

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

    const openFilter = () => {
        setFocusSection(null);
        setIsFilterOpen(true);
    };

    const closeFilter = () => {
        setIsFilterOpen(false);
        setFocusSection(null);
    };

    const handleApplyFilters = (filters) => {
        setAppliedFilters(filters);
        handleFilter(filters);
        closeFilter();
    };

    const handleQuickFilter = (filterId) => {
        // Open FilterDialog with focus on specific section (for Salary and Job Domain)
        setFocusSection(filterId);
        setIsFilterOpen(true);
    };

    const handleQuickFilterChange = (filterId, value) => {
        // Toggle the filter value in appliedFilters
        const newFilters = { ...appliedFilters };

        if (filterId === 'level') {
            const levels = newFilters.levels || [];
            if (levels.includes(value)) {
                newFilters.levels = levels.filter(v => v !== value);
            } else {
                newFilters.levels = [...levels, value];
            }
        } else if (filterId === 'workingModel') {
            const workingModels = newFilters.workingModels || [];
            if (workingModels.includes(value)) {
                newFilters.workingModels = workingModels.filter(v => v !== value);
            } else {
                newFilters.workingModels = [...workingModels, value];
            }
        }

        setAppliedFilters(newFilters);
        handleFilter(newFilters);
    };

    const activeFilterCount = (() => {
        if (!appliedFilters) return 0;
        const { levels = [], workingModels = [], salary, jobDomains = [], companyIndustries = [] } = appliedFilters || {};
        const countChips = levels.length + workingModels.length + jobDomains.length + companyIndustries.length;
        const salaryActive = salary && (salary.min !== 500 || salary.max !== 10000) ? 1 : 0;
        return countChips + salaryActive;
    })();

    return (
        <>
            <HeroSection onSearch={handleSearch} />
            <Container maxWidth="xl" className="py-4 md:py-6">
                {/* Top filter toolbar */}
                <FilterToolbar
                    onFilterClick={openFilter}
                    onQuickFilterClick={handleQuickFilter}
                    onQuickFilterChange={handleQuickFilterChange}
                    activeFilterCount={activeFilterCount}
                    appliedFilters={appliedFilters}
                    className="mb-4 md:mb-6"
                />

                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={{ xs: 3, md: 4 }}
                    className="pb-6 md:pb-8 items-start"
                    sx={{
                        // keep the two columns aligned and allow independent scrolling
                        alignItems: 'stretch'
                    }}
                >
                    {/* Middle - Job List */}
                    <Box className="flex-1 md:w-96 min-w-0">
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
                        className={`flex-1 min-w-0 hidden md:block`}
                        sx={{
                            overflow: 'auto',
                            maxHeight: { xs: '50vh', md: '72vh' },
                            // hide native scrollbars but keep scrolling functional
                            scrollbarWidth: 'none', // Firefox
                            '&::-webkit-scrollbar': { width: 0, height: 0 }, // WebKit
                        }}
                    >
                        {selectedJob ? (
                            <JobDescription
                                job={selectedJob}
                                layout={layoutType.half_width}
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
                </Stack>
            </Container>

            {/* Filter popup component */}
            <FilterDialog
                open={isFilterOpen}
                onClose={closeFilter}
                onApply={handleApplyFilters}
                title="Filter Jobs"
                focusSection={focusSection}
            />
        </>
    );
}
