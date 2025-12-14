import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Container,
    Typography,
    Paper,
    InputAdornment,
    InputBase,
    IconButton
} from '@mui/material';
import { Search, BusinessCenter } from '@mui/icons-material';

export default function CompanyListHero({ onSearch, searchKeyword = '' }) {
    const { t } = useTranslation();
    const [keyword, setKeyword] = useState(searchKeyword);

    const handleSearch = () => {
        onSearch(keyword);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <Box
            sx={{
                bgcolor: 'primary.main',
                color: 'white',
                py: { xs: 6, md: 8 },
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%)',
                    zIndex: 0
                }
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <BusinessCenter sx={{ fontSize: 48, opacity: 0.9 }} />
                    </Box>
                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                            fontSize: { xs: '1.75rem', md: '2.5rem' }
                        }}
                    >
                        {t("companyList.hero.title")}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            opacity: 0.9,
                            maxWidth: 600,
                            mx: 'auto',
                            fontSize: { xs: '1rem', md: '1.25rem' }
                        }}
                    >
                        {t("companyList.hero.subtitle")}
                    </Typography>
                </Box>

                {/* Search Bar */}
                <Paper
                    elevation={3}
                    sx={{
                        p: 1,
                        borderRadius: 3,
                        display: 'flex',
                        alignItems: 'center',
                        maxWidth: 700,
                        mx: 'auto',
                        bgcolor: 'white'
                    }}
                >
                    <InputBase
                        placeholder={t("companyList.hero.searchPlaceholder")}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        sx={{
                            ml: 2,
                            flex: 1,
                            fontSize: { xs: '0.875rem', md: '1rem' }
                        }}
                        startAdornment={
                            <InputAdornment position="start">
                                <Search sx={{ color: 'text.secondary' }} />
                            </InputAdornment>
                        }
                    />
                    <IconButton
                        onClick={handleSearch}
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            px: 4,
                            borderRadius: 2,
                            '&:hover': {
                                bgcolor: 'primary.dark'
                            }
                        }}
                    >
                        <Typography sx={{ fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>
                            {t("companyList.hero.searchButton")}
                        </Typography>
                        <Search sx={{ display: { xs: 'block', sm: 'none' } }} />
                    </IconButton>
                </Paper>
            </Container>
        </Box>
    );
}

