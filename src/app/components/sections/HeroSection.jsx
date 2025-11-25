import React from 'react';
import {
    Box,
    Container,
    Typography,
    Stack,
    Chip
} from '@mui/material';
import SearchBar from '../features/SearchBar';
import { mockPopularSearches } from '../../../mocks/mockData';

export default function HeroSection({ onSearch, initialKeyword = '', initialLocation = '' }) {
    return (
        <Box
            className="bg-linear-to-br from-gray-50 to-blue-400 py-12 md:py-20 relative overflow-hidden w-full"
            sx={{
                bgcolor: 'colors.primary',
                color: 'text.primary',
                py: { xs: 2, md: 3 },
                position: 'relative',
                overflow: 'hidden',
                width: '100%'
            }}
        >

            <Container
                maxWidth="lg"
                className="relative z-10 px-4 sm:px-6 md:px-8 w-full"
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    px: { xs: 2, sm: 3, md: 4 },
                    width: '100%'
                }}
            >
                <Box
                    className="text-center mb-8 md:mb-12 w-full"
                    sx={{
                        textAlign: 'center',
                        mb: { xs: 1.5, md: 2 },
                        width: '100%'
                    }}
                >
                    <Typography
                        variant="h1"
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight text-gray-900"
                        sx={{
                            mb: { xs: 0.75, md: 1 },
                            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' },
                            fontWeight: 700,
                            lineHeight: 1.2,
                            wordBreak: 'break-word'
                        }}
                    >
                        Find your <span className="text-blue-500 underline decoration-blue-500 decoration-2 underline-offset-4">dream job</span>
                    </Typography>
                    <Typography
                        variant="h5"
                        className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed"
                        sx={{
                            mb: { xs: 1.5, md: 2 },
                            opacity: 0.9,
                            maxWidth: { xs: '100%', md: '600px' },
                            mx: 'auto',
                            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                            px: { xs: 1, md: 0 }
                        }}
                    >
                        Tìm cơ hội thực tập và việc làm đúng với đam mê của bạn.
                    </Typography>
                </Box>

                {/* Search Bar */}
                <Box
                    className="mb-6 md:mb-8 w-full max-w-4xl mx-auto"
                    sx={{
                        mb: { xs: 1.5, md: 2 },
                        width: '100%',
                        maxWidth: '100%'
                    }}
                >
                    <SearchBar
                        onSearch={onSearch}
                        placeholder="Job title, keywords, or company"
                        locationPlaceholder="City, state, or remote"
                        fullWidth
                        initialKeyword={initialKeyword}
                        initialLocation={initialLocation}
                    />
                </Box>

                {/* Popular Searches */}
                <Box
                    className="text-center"
                    sx={{ textAlign: 'center' }}
                >
                    <Typography
                        variant="body2"
                        className="text-white mb-3 text-sm font-bold"
                        sx={{ mb: 1.5, opacity: 1, color: 'black', fontWeight: 600 }}
                    >
                        Popular:
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                        flexWrap="wrap"
                        gap={1}
                        className="justify-center flex-wrap gap-2"
                    >
                        {mockPopularSearches.map((search, index) => (
                            <Chip
                                key={index}
                                label={search}
                                variant="filled"
                                className="transition-all duration-300 hover:scale-105 cursor-pointer"
                                sx={{
                                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                                    color: '#0041D9',
                                    fontWeight: 600,
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                    '&:hover': {
                                        bgcolor: 'white',
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                                        color: '#0041D9',
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
