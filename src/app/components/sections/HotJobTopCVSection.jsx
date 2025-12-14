import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowForward } from '@mui/icons-material';
import JobCard from '../features/JobCard';
import { useSelector, useDispatch } from 'react-redux';
import { getTopCVJobs } from '../../modules/services/topCVService';

export default function HotJobTopCVSection() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const jobs = useSelector(state => state.topCVJobs?.jobs || []);
    const pagination = useSelector(state => state.topCVJobs?.pagination || {});
    const status = useSelector(state => state.topCVJobs?.status);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 9; // 3x3 grid

    // Fetch jobs with server-side pagination
    useEffect(() => {
        dispatch(getTopCVJobs({ page: currentPage, limit: jobsPerPage }));
    }, [dispatch, currentPage, jobsPerPage]);

    // Get pagination info from API
    const totalPages = pagination.totalPages || 1;
    const totalItems = pagination.totalItems || 0;

    const handlePageChange = (page) => {
        setCurrentPage(page);
        const section = document.getElementById('hotjob-topcv-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Generate smart pagination numbers
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5; // Show max 5 page numbers at a time

        if (totalPages <= maxVisible) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show smart pagination: 1 ... 4 5 6 ... 10
            if (currentPage <= 3) {
                // Near start: 1 2 3 4 ... 10
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Near end: 1 ... 7 8 9 10
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // Middle: 1 ... 4 5 6 ... 10
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
        // Handle job actions
    };

        return (
        <div id="hotjob-topcv-section" className="py-6 md:py-10 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {t("homeSections.hotJobSection.title")} <span className="text-green-600">{t("homeSections.hotJobSection.topCV")}</span>
                    </h3>
                    <button className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
                        {t("homeSections.hotJobSection.showAllJobs")}
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
                        {jobs.map((job) => (
                            <div key={job.id || job.external_id || job._id} className="h-full">
                                <JobCard
                                    job={job}
                                    onBookmark={(job) => handleJobAction('bookmark', job)}
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
                            {t("homeSections.hotJobSection.previous")}
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
                            {t("homeSections.hotJobSection.next")}
                        </button>
                    </div>
                )}

                {/* Show message if no jobs and not loading */}
                {status !== 'loading' && jobs.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-lg">{t("homeSections.hotJobSection.noJobsAvailable")}</p>
                    </div>
                )}

                {/* Pagination Info */}
                {totalPages > 1 && totalItems > 0 && (
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            {t("homeSections.hotJobSection.showingJobs", { showing: jobs.length, total: totalItems })}
                            <span className="mx-2">•</span>
                            {t("homeSections.hotJobSection.pageInfo", { current: currentPage, total: totalPages })}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}