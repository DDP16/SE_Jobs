import React, { useEffect, useState, useRef } from 'react';
import { ArrowForward } from '@mui/icons-material';
import JobCard from '../features/JobCard';
import { useSelector, useDispatch } from 'react-redux';
import { getJobs, getJobById } from '../../modules/services/jobsService';
import { useNavigate } from 'react-router-dom';

export default function JobSection() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sectionRef = useRef(null);

    const latestJobs = useSelector(state => state.jobs?.jobs || []);
    const status = useSelector(state => state.jobs?.status || 'idle');
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 9; // 3x3 grid

    // Fetch jobs with pagination
    useEffect(() => {
        dispatch(getJobs({
            page: currentPage,
            limit: jobsPerPage,
            sort_by: "job_posted_at",
            order: "desc"
        }));
    }, [dispatch, currentPage, jobsPerPage]);

    // Transform API data to JobCard format
    const transformJobData = (job) => {
        if (!job) return null;

        // Format salary
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
            company: job.company?.name || "Company Name", // If API includes company object
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

    const transformedJobs = latestJobs.map(transformJobData).filter(Boolean);

    // Calculate pagination (client-side since API might not return pagination info)
    const totalPages = Math.ceil(transformedJobs.length / jobsPerPage);
    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const currentJobs = transformedJobs.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);

        // Only scroll the section into view if it's not fully visible in the viewport
        try {
            const el = sectionRef.current;
            if (el && el.getBoundingClientRect) {
                const rect = el.getBoundingClientRect();
                const fullyVisible = rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
                if (!fullyVisible) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        } catch (err) {
            console.warn('Pagination scroll fallback', err);
        }
    };

    // Generate smart pagination numbers
    const getPageNumbers = () => {
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
    };

    const pageNumbers = getPageNumbers();

    const handleJobAction = (action, job) => {
        switch (action) {
            case 'bookmark':
                console.log('Bookmark job:', job);
                break;
            case 'share':
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
        <div className="py-8 md:py-16 bg-gray-50">
            <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Latest <span style={{ color: '#0041D9' }}>jobs open</span>
                    </h2>
                    <button className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
                        Show all jobs
                        <ArrowForward className="w-5 h-5" />
                    </button>
                </div>

                {/* Loading State */}
                {status === 'loading' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
                        {[...Array(9)].map((_, index) => (
                            <div key={index} className="h-40 bg-gray-200 rounded-lg animate-pulse"></div>
                        ))}
                    </div>
                )}

                {/* Grid Layout */}
                {status !== 'loading' && (
                    <>
                        {currentJobs.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
                                    {currentJobs.map((job) => (
                                        <div key={job.id || job.external_id || job._id} className="h-full">
                                            <JobCard
                                                job={job}
                                                onBookmark={(job) => handleJobAction('bookmark', job)}
                                                onClick={() => handleJobAction('click', job)}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center items-center gap-2 mt-8">
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

                                {/* Pagination Info */}
                                {totalPages > 1 && transformedJobs.length > 0 && (
                                    <div className="text-center mt-4">
                                        <p className="text-sm text-gray-600">
                                            Showing {startIndex + 1}-{Math.min(endIndex, transformedJobs.length)} of {transformedJobs.length} jobs
                                            <span className="mx-2">•</span>
                                            Page {currentPage} of {totalPages}
                                        </p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-gray-500 text-lg">No jobs available at the moment.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
