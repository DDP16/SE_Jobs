import React from 'react';
import {
    Box,
    Container,
    Typography,
    Stack,
    Button,
    IconButton
} from '@mui/material';
import { ArrowForward, ChevronLeft, ChevronRight } from '@mui/icons-material';
import CompanyCard from '../features/CompanyCard';
import { mockCompanies } from '../../../mocks/mockData';

export default function CompanySection() {
    const featuredCompanies = mockCompanies.slice(0, 6);
    const scrollContainerRef = React.useRef(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -320,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 320,
                behavior: 'smooth'
            });
        }
    };

    return (
        <Box sx={{ py: 8, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="h2" sx={{ mb: 2 }}>
                        Top Companies
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '900px', mx: 'auto' }}>
                        Discover opportunities at leading companies that are actively hiring
                    </Typography>
                </Box>

                <Box sx={{ position: 'relative', mb: 4 }}>
                    {/* Scroll Buttons */}
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

                    {/* Scroll Container */}
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
                        {featuredCompanies.map((company) => (
                            <Box
                                key={company.id}
                                sx={{
                                    flex: '0 0 auto',
                                    width: { xs: '280px', sm: '320px', md: '350px' },
                                    minWidth: '280px',
                                }}
                            >
                                <CompanyCard
                                    company={company}
                                    onClick={(company) => console.log('Company clicked:', company)}
                                />
                            </Box>
                        ))}
                    </Box>

                    {/* Scroll Indicators */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 1,
                        mt: 2,
                        opacity: 0.7
                    }}>
                        <Box sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: 'primary.main'
                        }} />
                        <Box sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: 'grey.300'
                        }} />
                        <Box sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: 'grey.300'
                        }} />
                    </Box>
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                    <Button
                        variant="outlined"
                        size="large"
                        endIcon={<ArrowForward />}
                        sx={{ minWidth: 200 }}
                    >
                        View All Companies
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}
