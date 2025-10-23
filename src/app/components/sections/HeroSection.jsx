import React from 'react';
import {
    Box,
    Container,
    Typography,
    Stack,
    Chip
} from '@mui/material';
import SearchBar from '../features/SearchBar';
import { mockPopularSearches } from '../../data/mockData';

export default function HeroSection({ onSearch }) {
    return (
        <Box
            sx={{
                bgcolor: 'primary.main', // --brand-primary
                color: 'white',
                py: { xs: 3, md: 5 },
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Background Pattern */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)',
                    opacity: 0.1
                }}
            />

            <Container
                maxWidth="lg"
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    px: { xs: 2, sm: 3, md: 4 },
                    width: '100%'
                }}
            >
                <Box sx={{
                    textAlign: 'center',
                    mb: { xs: 2, md: 3 },
                    width: '100%'
                }}>
                    <Typography
                        variant="h1"
                        sx={{
                            mb: { xs: 1, md: 2 },
                            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' },
                            fontWeight: 700,
                            lineHeight: 1.2,
                            wordBreak: 'break-word'
                        }}
                    >
                        Find Your Dream Job
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            mb: { xs: 2, md: 3 },
                            opacity: 0.9,
                            maxWidth: { xs: '100%', md: '600px' },
                            mx: 'auto',
                            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                            px: { xs: 1, md: 0 }
                        }}
                    >
                        Discover thousands of job opportunities from top companies worldwide.
                        Start your career journey today.
                    </Typography>
                </Box>

                {/* Search Bar */}
                <Box sx={{
                    mb: { xs: 2, md: 3 },
                    width: '100%',
                    maxWidth: '100%'
                }}>
                    <SearchBar
                        onSearch={onSearch}
                        placeholder="Job title, keywords, or company"
                        locationPlaceholder="City, state, or remote"
                        fullWidth
                    />
                </Box>

                {/* Popular Searches */}
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
                        Popular searches:
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                        flexWrap="wrap"
                        gap={1}
                    >
                        {mockPopularSearches.map((search, index) => (
                            <Chip
                                key={index}
                                label={search}
                                variant="outlined"
                                sx={{
                                    color: 'white',
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                                        borderColor: 'rgba(255, 255, 255, 0.5)'
                                    }
                                }}
                                clickable
                                onClick={() => onSearch?.({ keyword: search })}
                            />
                        ))}
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}
