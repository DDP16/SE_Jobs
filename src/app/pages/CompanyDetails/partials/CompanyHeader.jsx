import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Avatar,
    Chip
} from '@mui/material';
import {
    Favorite,
    FavoriteBorder,
    LocationOn
} from '@mui/icons-material';

export default function CompanyHeader({ company = {} }) {
    const [isFollowing, setIsFollowing] = useState(false);
    const {
        name = 'Company Name',
        logo = 'C',
        location = 'Location',
        industry = 'Industry',
        jobsCount = 0
    } = company;

    const handleFollowToggle = () => {
        setIsFollowing(!isFollowing);
    };

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 2, md: 3 } }}>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: 2
            }}>
                {/* Left Side - Company Info */}
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flex: 1 }}>
                    <Avatar
                        sx={{
                            width: { xs: 56, md: 64 },
                            height: { xs: 56, md: 64 },
                            bgcolor: 'primary.main',
                            fontSize: { xs: '1.25rem', md: '1.5rem' },
                            fontWeight: 700
                        }}
                    >
                        {logo}
                    </Avatar>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                mb: 0.5,
                                fontSize: { xs: '1.25rem', md: '1.5rem' }
                            }}
                        >
                            {name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                    {location}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                •
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {industry}
                            </Typography>
                            {jobsCount > 0 && (
                                <>
                                    <Typography variant="body2" color="text.secondary">
                                        •
                                    </Typography>
                                    <Chip
                                        label={`${jobsCount} việc làm`}
                                        size="small"
                                        color="primary"
                                        sx={{ fontWeight: 600, height: 24 }}
                                    />
                                </>
                            )}
                        </Box>
                    </Box>
                </Box>

                {/* Right Side - Follow Button */}
                <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
                    <Button
                        variant={isFollowing ? 'outlined' : 'contained'}
                        startIcon={isFollowing ? <Favorite /> : <FavoriteBorder />}
                        onClick={handleFollowToggle}
                        fullWidth={false}
                        sx={{
                            px: 3,
                            textTransform: 'none',
                            fontWeight: 600,
                            width: { xs: '100%', sm: 'auto' }
                        }}
                    >
                        {isFollowing ? 'Đang theo dõi' : 'Theo dõi công ty'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

