import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    IconButton
} from '@mui/material';
import { ArrowForward, ChevronLeft, ChevronRight } from '@mui/icons-material';
import JobCard from '../features/JobCard';
import { mockJobs } from '../../../mocks/mockData';

export default function JobSection() {
    const latestJobs = mockJobs.slice(0, 12);
    const scrollContainerRef = React.useRef(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -480,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 480,
                behavior: 'smooth'
            });
        }
    };

    const handleJobAction = (action, job) => {
        console.log(`${action} job:`, job);
    };

    return (
        <Box
            className="py-16 bg-gray-50"
            sx={{ py: 8, bgcolor: 'background.default' }}
        >
            <Container maxWidth="lg" className="px-4">
                <Box
                    className="flex justify-between items-center mb-8"
                    sx={{ mb: 4 }}
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
                    sx={{ position: 'relative', mb: 4 }}
                >
                    {/* Scroll Buttons */}
                    <Box
                        className="hidden md:flex justify-between absolute top-1/2 -left-5 -right-5 transform -translate-y-1/2 z-10 pointer-events-none"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            justifyContent: 'space-between',
                            position: 'absolute',
                            top: '50%',
                            left: -20,
                            right: -20,
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                            pointerEvents: 'none'
                        }}
                    >
                        <IconButton
                            onClick={scrollLeft}
                            className="bg-white shadow-lg pointer-events-auto hover:bg-gray-50 rounded-full transition-all duration-300 hover:scale-110"
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
                            className="bg-white shadow-lg pointer-events-auto hover:bg-gray-50 rounded-full transition-all duration-300 hover:scale-110"
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

                    {/* Scroll Container - 2 Rows Layout */}
                    <Box
                        ref={scrollContainerRef}
                        className="overflow-x-auto scroll-smooth pb-1 scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500"
                        sx={{
                            overflowX: 'auto',
                            scrollBehavior: 'smooth',
                            pb: 1,
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
                        {/* Container for 2 rows */}
                        <Box className="flex flex-col gap-4 min-w-max">
                            {/* First Row */}
                            <Box className="flex gap-4">
                                {latestJobs.slice(0, 6).map((job) => (
                                    <Box
                                        key={job.id}
                                        className="flex-none w-96"
                                        sx={{
                                            flex: '0 0 auto',
                                            width: '384px',
                                            minWidth: '384px',
                                        }}
                                    >
                                        <JobCard
                                            job={job}
                                            onBookmark={(job) => handleJobAction('bookmark', job)}
                                            onShare={(job) => handleJobAction('share', job)}
                                            onApply={(job) => handleJobAction('apply', job)}
                                        />
                                    </Box>
                                ))}
                            </Box>

                            {/* Second Row */}
                            <Box className="flex gap-4">
                                {latestJobs.slice(6, 12).map((job) => (
                                    <Box
                                        key={job.id}
                                        className="flex-none w-96"
                                        sx={{
                                            flex: '0 0 auto',
                                            width: '384px',
                                            minWidth: '384px',
                                        }}
                                    >
                                        <JobCard
                                            job={job}
                                            onBookmark={(job) => handleJobAction('bookmark', job)}
                                            onShare={(job) => handleJobAction('share', job)}
                                            onApply={(job) => handleJobAction('apply', job)}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>

                    {/* Scroll Indicators */}
                    <Box
                        className="flex justify-center gap-2 mt-4 opacity-70"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 1,
                            mt: 2,
                            opacity: 0.7
                        }}
                    >
                        <Box
                            className="w-2 h-2 rounded-full bg-blue-600"
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: 'primary.main'
                            }}
                        />
                        <Box
                            className="w-2 h-2 rounded-full bg-gray-300"
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: 'grey.300'
                            }}
                        />
                        <Box
                            className="w-2 h-2 rounded-full bg-gray-300"
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: 'grey.300'
                            }}
                        />
                    </Box>
                </Box>

            </Container>
        </Box>
    );
}
