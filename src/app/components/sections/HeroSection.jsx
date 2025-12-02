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
import { useTranslation } from 'react-i18next';

export default function HeroSection({ onSearch, initialKeyword = '', initialLocation = '' }) {
    const { t } = useTranslation();

    return (
        <Box
            className="bg-linear-to-br from-gray-50 to-blue-400 py-2 md:py-3 relative overflow-hidden w-full"
        >

            <Container
                maxWidth="lg"
                className="relative z-10 px-4 sm:px-6 md:px-8 w-full space-y-2 md:space-y-3 flex flex-col items-center"
            >
                <Box
                    className="text-center w-full"
                >
                    <h2
                        className="font-bold text-gray-900"
                    >
                        Find your <span className="text-blue-500 underline decoration-blue-500 decoration-2 underline-offset-4">dream job</span>
                    </h2>
                    <h5
                        className="text-gray-600"
                    >
                        Tìm cơ hội thực tập và việc làm đúng với đam mê của bạn.
                    </h5>
                </Box>

                {/* Search Bar */}
                <Box
                    className="w-full mx-auto justify-center flex"
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
                <div
                    className="text-center flex flex-col lg:flex-row items-center gap-2 md:gap-4"
                >
                    <span className="body-small text-black font-semibold">
                        Popular:
                    </span>
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
                </div>
            </Container>
        </Box>
    );
}
