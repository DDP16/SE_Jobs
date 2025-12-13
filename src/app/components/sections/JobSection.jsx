import React, { useEffect, useState, useMemo } from 'react';
import { ArrowForward } from '@mui/icons-material';
import JobCard from '../features/JobCard';
import { useSelector, useDispatch } from 'react-redux';
import { getJobs, getJobById } from '../../modules/services/jobsService';
import { useNavigate } from 'react-router-dom';

const EMPTY_PAGINATION = {};

const transformJobData = (job) => {
    if (!job) return null;

    let salary = "Negotiable";
    if (job.salary_text) {
        salary = job.salary_text;
    } else if (job.salary_from || job.salary_to) {
        const from = job.salary_from || 0;
        const to = job.salary_to || 0;
        const currency = job.salary_currency || "";
        if (from && to) {
            salary = `${from} - ${to} ${currency}`;
        } else if (from) {
            salary = `From ${from} ${currency}`;
        } else if (to) {
            salary = `Up to ${to} ${currency}`;
        }
    }

    return {
        id: job.id || job.external_id,
        title: job.title || "Job Title",
        company: job.company?.name || "Company Name", 
        location: job.location || job.company_branches?.location || "Location",
        type: job.working_time || job.type || "Full-time",
        salary: salary,
        description: job.description || "",
        categories: job.categories || [],
        logo: job.company?.logo || job.logo || (job.title ? job.title.charAt(0).toUpperCase() : "J"),
        isFeatured: job.is_hot || job.is_diamond || false,
        applied: job.applied || 0,
        capacity: job.capacity || 10,
        // Keep original data for reference
        ...job
    };
};

export default function JobSection() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const latestJobs = useSelector(state => state.jobs.jobs);
    const paginationState = useSelector(state => state.jobs.pagination);
    const status = useSelector(state => state.jobs.status);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 9; // 3x3 grid

    // Memoize pagination to avoid creating new object reference
    const pagination = useMemo(() => {
        return paginationState || EMPTY_PAGINATION;
    }, [paginationState]);

    useEffect(() => {
        dispatch(getJobs({ page: currentPage, limit: jobsPerPage, sort_by: "job_posted_at", order: "desc" }));
    }, [dispatch, currentPage]);

    // Get pagination info from API - memoized
    const totalPages = useMemo(() => {
        return pagination.totalPages || Math.ceil((latestJobs?.length || 0) / jobsPerPage) || 1;
    }, [pagination.totalPages, latestJobs?.length, jobsPerPage]);

    const totalItems = useMemo(() => {
        return pagination.totalItems || latestJobs?.length || 0;
    }, [pagination.totalItems, latestJobs?.length]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Generate smart pagination numbers - memoized
    const pageNumbers = useMemo(() => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    }, [totalPages, currentPage]);

    // Memoize transformed jobs to avoid recreating on every render
    const transformedJobs = useMemo(() => {
        if (!latestJobs || !Array.isArray(latestJobs)) return [];
        return latestJobs.map(transformJobData).filter(Boolean);
    }, [latestJobs]);

    const handleJobAction = (action, job) => {
        switch (action) {
            case 'bookmark':
                // TODO: Implement bookmark functionality
                console.log('Bookmark job:', job);
                break;
            case 'share':
                // TODO: Implement share functionality
                console.log('Share job:', job);
                break;
            case 'click':
                navigate(`/job?id=${job.id}`);
                dispatch(getJobById(job.id));
                break;
            default:
                break;
        }
    };

    return (
        <div className="py-6 md:py-10 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Latest <span className="text-blue-600">jobs open</span>
                    </h3>
                    <button className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
                        Show all jobs
                        <ArrowForward className="w-5 h-5" />
                    </button>
                </div>

                {/* Loading State */}
                {status === 'loading' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
                        {[...Array(9)].map((_, index) => (
                            <div key={index} className="h-40 bg-gray-200 rounded-lg animate-pulse"></div>
                        ))}
                    </div>
                )}

                {/* 3x3 Grid */}
                {status !== 'loading' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
                        {transformedJobs.map((job) => (
                            <div key={job.id} className="h-full">
                                <JobCard
                                    job={job}
                                    onBookmark={(job) => handleJobAction('bookmark', job)}
                                    onClick={() => handleJobAction('click', job)}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-6">
                        {/* Previous Button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`
                                px-4 py-2 rounded-lg font-medium transition-all
                                ${currentPage === 1
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                                }
                            `}
                        >
                            Previous
                        </button>

                        {/* Page Numbers */}
                        <div className="flex gap-2">
                            {pageNumbers.map((page, index) => {
                                if (page === '...') {
                                    return (
                                        <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-gray-500">
                                            ...
                                        </span>
                                    );
                                }
                                return (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`
                                            w-10 h-10 rounded-lg font-medium transition-all
                                            ${currentPage === page
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                                            }
                                        `}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`
                                px-4 py-2 rounded-lg font-medium transition-all
                                ${currentPage === totalPages
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                                }
                            `}
                        >
                            Next
                        </button>
                    </div>
                )}

                {/* Show message if no jobs and not loading */}
                {status !== 'loading' && transformedJobs.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-lg">No jobs available at the moment.</p>
                    </div>
                )}

                {/* Pagination Info */}
                {totalPages > 1 && totalItems > 0 && (
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Showing {transformedJobs.length} of {totalItems} jobs
                            <span className="mx-2">•</span>
                            Page {currentPage} of {totalPages}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
