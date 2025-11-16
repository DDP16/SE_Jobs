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
    const latestJobs = mockJobs;
    const scrollContainerRef = React.useRef(null);

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

    const groupedJobs = [];
    for (let i = 0; i < latestJobs.length; i += 6) {
        groupedJobs.push(latestJobs.slice(i, i + 6));
    }

    const handleJobAction = (action, job) => {
        console.log(`${action} job:`, job);
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
                            Hot jobs from <span style={{ color: 'green' }}>TopCV</span>
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
                    {latestJobs.length > 6 && (
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
                                                onShare={(job) => handleJobAction('share', job)}
                                                onApply={(job) => handleJobAction('apply', job)}
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
                                                showDescription={false}
                                                job={job}
                                                onBookmark={(job) => handleJobAction('bookmark', job)}
                                                onShare={(job) => handleJobAction('share', job)}
                                                onApply={(job) => handleJobAction('apply', job)}
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
