import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    IconButton
} from '@mui/material';
import { ArrowForward, ChevronLeft, ChevronRight } from '@mui/icons-material';
import CompanyCard from '../features/CompanyCard';
import { mockCompanies } from '../../../mocks/mockData';

export default function CompanySection() {
    const featuredCompanies = mockCompanies;
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

    const groupedCompanies = [];
    for (let i = 0; i < featuredCompanies.length; i += 6) {
        groupedCompanies.push(featuredCompanies.slice(i, i + 6));
    }

    return (
        <Box sx={{ py: 4, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
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
                            Top <span style={{ color: '#0041D9' }}>Companies</span>
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
                        View All Companies
                    </Button>
                </Box>

                <Box sx={{ position: 'relative', mb: 0 }}>
                    {/* Scroll Buttons - Only show if there are more than 6 companies */}
                    {featuredCompanies.length > 6 && (
                        <Box sx={{
                            display: { xs: 'none', md: 'flex' },
                            justifyContent: 'space-between',
                            position: 'absolute',
                            top: '50%',
                            left: -20,
                            right: -20,
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                            pointerEvents: 'none'
                        }}>
                            <IconButton
                                onClick={scrollLeft}
                                sx={{
                                    bgcolor: 'white',
                                    boxShadow: 2,
                                    pointerEvents: 'auto',
                                    '&:hover': { bgcolor: 'grey.50' }
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
                                    '&:hover': { bgcolor: 'grey.50' }
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
                        {groupedCompanies.map((group, groupIndex) => (
                            <Box
                                key={groupIndex}
                                sx={{
                                    flex: '0 0 auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                    width: {
                                        xs: 'calc(280px * 3 + 16px * 2)',
                                        sm: 'calc(320px * 3 + 16px * 2)',
                                        md: 'calc(350px * 3 + 16px * 2)'
                                    },
                                    minWidth: {
                                        xs: 'calc(280px * 3 + 16px * 2)',
                                        sm: 'calc(320px * 3 + 16px * 2)',
                                        md: 'calc(350px * 3 + 16px * 2)'
                                    }
                                }}
                            >
                                {/* Upper Row - First 3 cards */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 2
                                    }}
                                >
                                    {group.slice(0, 3).map((company) => (
                                        <Box
                                            key={company.id}
                                            sx={{
                                                flex: '0 0 auto',
                                                width: { xs: '280px', sm: '320px', md: '350px' },
                                                minWidth: { xs: '280px', sm: '320px', md: '350px' }
                                            }}
                                        >
                                            <CompanyCard
                                                company={company}
                                                onClick={(company) => console.log('Company clicked:', company)}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                                {/* Lower Row - Next 3 cards */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 2
                                    }}
                                >
                                    {group.slice(3, 6).map((company) => (
                                        <Box
                                            key={company.id}
                                            sx={{
                                                flex: '0 0 auto',
                                                width: { xs: '280px', sm: '320px', md: '350px' },
                                                minWidth: { xs: '280px', sm: '320px', md: '350px' }
                                            }}
                                        >
                                            <CompanyCard
                                                company={company}
                                                onClick={(company) => console.log('Company clicked:', company)}
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
