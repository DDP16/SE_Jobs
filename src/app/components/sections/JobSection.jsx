import React, { useEffect, useRef } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    IconButton
} from '@mui/material';
import { ArrowForward, ChevronLeft, ChevronRight } from '@mui/icons-material';
import JobCard from '../features/JobCard';
import { useSelector, useDispatch } from 'react-redux';
import { getJobs, getJobById } from '../../modules/services/jobsService';
import { useNavigate } from 'react-router-dom';

export default function JobSection() {
    const latestJobs = useSelector(state => state.jobs.jobs);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        dispatch(getJobs({ page: 1, limit: 10, sort_by: "job_posted_at", order: "desc" }));
    }, [dispatch]);

    const getScrollAmount = () => {
        if (!scrollContainerRef.current) return 0;

        const container = scrollContainerRef.current;
        const firstGroup = container.firstElementChild;

        if (!firstGroup) return 0;

        const groupWidth = firstGroup.offsetWidth;
        const gap = 16;

        return groupWidth + gap;
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            const scrollAmount = getScrollAmount();
            scrollContainerRef.current.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            const scrollAmount = getScrollAmount();
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

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

    // Group jobs into groups of 6 (2 rows x 3 columns)
    const groupedJobs = [];
    for (let i = 0; i < transformedJobs.length; i += 6) {
        groupedJobs.push(transformedJobs.slice(i, i + 6));
    }

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
        <Box
            className="py-16 bg-gray-50"
            sx={{ py: 4, bgcolor: 'background.default' }}
        >
            <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                <Box
                    className="flex justify-between items-center mb-8"
                    sx={{ mb: 3 }}
                >
                    <Box>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '2rem', md: '2.5rem' },
                                fontWeight: 700,
                                color: 'text.primary'
                            }}
                        >
                            Latest <span style={{ color: '#0041D9' }}>jobs open</span>
                        </Typography>
                    </Box>
                    <Button
                        variant="text"
                        endIcon={<ArrowForward />}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                        sx={{
                            textTransform: 'none',
                            fontSize: '1rem',
                            fontWeight: 500
                        }}
                    >
                        Show all jobs
                    </Button>
                </Box>

                {/* Job Cards - 2 Rows with Horizontal Scroll */}
                <Box
                    className="relative mb-8"
                    sx={{ position: 'relative', mb: 0, mx: { xs: -2, sm: -3, md: -4 } }}
                >
                    {/* Scroll Buttons - Only show if there are more than 6 jobs */}
                    {transformedJobs.length > 6 && (
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                justifyContent: 'space-between',
                                position: 'absolute',
                                top: '50%',
                                left: { md: 16, lg: 24 },
                                right: { md: 16, lg: 24 },
                                transform: 'translateY(-50%)',
                                zIndex: 2,
                                pointerEvents: 'none'
                            }}
                        >
                            <IconButton
                                onClick={scrollLeft}
                                sx={{
                                    bgcolor: 'white',
                                    boxShadow: 2,
                                    pointerEvents: 'auto',
                                    '&:hover': {
                                        bgcolor: 'grey.50',
                                        transform: 'scale(1.1)'
                                    }
                                }}
                            >
                                <ChevronLeft />
                            </IconButton>
                            <IconButton
                                onClick={scrollRight}
                                sx={{
                                    bgcolor: 'white',
                                    boxShadow: 2,
                                    pointerEvents: 'auto',
                                    '&:hover': {
                                        bgcolor: 'grey.50',
                                        transform: 'scale(1.1)'
                                    }
                                }}
                            >
                                <ChevronRight />
                            </IconButton>
                        </Box>
                    )}

                    {/* Scroll Container with Grid Layout */}
                    <Box
                        ref={scrollContainerRef}
                        sx={{
                            display: 'flex',
                            gap: 2,
                            overflowX: 'auto',
                            scrollBehavior: 'smooth',
                            pb: 1,
                            px: { xs: 2, sm: 3, md: 4 },
                            '&::-webkit-scrollbar': {
                                height: '6px',
                            },
                            '&::-webkit-scrollbar-track': {
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                borderRadius: '3px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: 'rgba(0,0,0,0.3)',
                                borderRadius: '3px',
                                '&:hover': {
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                },
                            },
                        }}
                    >
                        {groupedJobs.map((group, groupIndex) => (
                            <Box
                                key={groupIndex}
                                sx={{
                                    flex: '0 0 auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                    width: 'calc(384px * 3 + 16px * 2)',
                                    minWidth: 'calc(384px * 3 + 16px * 2)'
                                }}
                            >
                                {/* Upper Row - First 3 jobs */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 2
                                    }}
                                >
                                    {group.slice(0, 3).map((job) => (
                                        <Box
                                            key={job.id}
                                            sx={{
                                                flex: '0 0 auto',
                                                width: '384px',
                                                minWidth: '384px'
                                            }}
                                        >
                                            <JobCard
                                                job={job}
                                                onBookmark={(job) => handleJobAction('bookmark', job)}
                                                onClick={() => handleJobAction('click', job)}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                                {/* Lower Row - Next 3 jobs */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 2
                                    }}
                                >
                                    {group.slice(3, 6).map((job) => (
                                        <Box
                                            key={job.id}
                                            sx={{
                                                flex: '0 0 auto',
                                                width: '384px',
                                                minWidth: '384px'
                                            }}
                                        >
                                            <JobCard
                                                job={job}
                                                onBookmark={(job) => handleJobAction('bookmark', job)}
                                                onClick={() => handleJobAction('click', job)}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>

            </Container>
        </Box>
    );
}
