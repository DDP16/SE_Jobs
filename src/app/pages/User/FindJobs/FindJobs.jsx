import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Container, Box, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { JobListSection, HeroSection, FilterDialog, FilterToolbar } from "../../../components";
import JobDescription from "../JobDescription";
import { layoutType } from "../../../lib";
import { getJobs } from "../../../modules/services/jobsService";

const DEFAULT_QUERY = {
    page: 1,
    limit: 10,
    sort_by: "job_posted_at",
    order: "desc",
};

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
    const { jobs, pagination, status } = useSelector((state) => state.jobs);
    const isLoadingJobs = status === "loading";

    const queryParams = useMemo(() => {
        const searchParams = new URLSearchParams(location.search);
        const parsed = { ...DEFAULT_QUERY };

        const pageParam = parseInt(searchParams.get("page") || "", 10);
        if (!Number.isNaN(pageParam) && pageParam > 0) {
            parsed.page = pageParam;
        }

        const limitParam = parseInt(searchParams.get("limit") || "", 10);
        if (!Number.isNaN(limitParam) && limitParam > 0) {
            parsed.limit = limitParam;
        }

        const sortByParam = searchParams.get("sort_by");
        if (sortByParam) {
            parsed.sort_by = sortByParam;
        }

        const orderParam = searchParams.get("order");
        if (orderParam) {
            parsed.order = orderParam;
        }

        const titleParam = searchParams.get("title") || searchParams.get("keyword");
        if (titleParam) {
            parsed.title = titleParam;
        }

        const locationParam = searchParams.get("location");
        if (locationParam) {
            parsed.location = locationParam;
        }

        return parsed;
    }, [location.search]);

    const updateQueryParams = useCallback((nextParams) => {
        const merged = {
            ...DEFAULT_QUERY,
            ...nextParams,
        };

        const sanitizedEntries = Object.entries(merged).filter(
            ([, value]) => value !== undefined && value !== null && value !== ""
        );
        const searchString = new URLSearchParams(Object.fromEntries(sanitizedEntries)).toString();

        navigate({
            pathname: location.pathname,
            search: searchString ? `?${searchString}` : "",
        });
    }, [navigate, location.pathname]);

    useEffect(() => {
        dispatch(getJobs(queryParams));
    }, [dispatch, queryParams]);

    useEffect(() => {
        setSelectedJob(null);
    }, [queryParams]);

    const combinedPagination = pagination || {
        page: queryParams.page,
        limit: queryParams.limit,
        total: 0,
        total_pages: 0,
    };

    const handleSearch = useCallback(({ keyword, location: jobLocation }) => {
        updateQueryParams({
            ...queryParams,
            page: 1,
            title: keyword?.trim() || undefined,
            location: jobLocation?.trim() || undefined,
        });
    }, [queryParams, updateQueryParams]);

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
                >
                    {/* Middle - Job List */}
                    <Box className="flex-1 md:w-96 min-w-0">
                        <JobListSection
                            jobs={jobs}
                            pagination={combinedPagination}
                            total={combinedPagination.total}
                            isLoading={isLoadingJobs}
                            onPageChange={handlePageChange}
                            onJobSelect={handleJobSelect}
                            selectedJob={selectedJob}
                        />
                    </Box>

                    {/* Right - Job Description (hidden on small screens) */}
                    <Box className={`flex-1 min-w-0 hidden md:block`}>
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
