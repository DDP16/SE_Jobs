import React from 'react';
import {
    Box,
    Typography,
    Avatar,
    Card,
    CardContent,
    Stack,
    Chip
} from '@mui/material';
import {
    LocationOn,
    Business,
    People
} from '@mui/icons-material';
import Badge from '../common/Badge';

export default function CompanyCard({
    company = {},
    onClick,
    showStats = true
}) {
    const {
        id,
        name = "Company Name",
        logo = "C",
        location = "Location",
        industry = "Industry",
        size = "10-50 employees",
        description = "Company description...",
        jobsCount = 0,
        isHiring = false
    } = company;

    return (
        <Card
            sx={{
                height: '100%',
                cursor: 'pointer',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    transition: 'transform 0.2s ease-in-out'
                }
            }}
            onClick={() => onClick?.(company)}
        >
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                        sx={{
                            bgcolor: 'primary.main',
                            width: 56,
                            height: 56,
                            mr: 2,
                            fontSize: '1.5rem',
                            fontWeight: 'bold'
                        }}
                    >
                        {logo}
                    </Avatar>

                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {name}
                        </Typography>
                    </Box>

                    {isHiring && (
                        <Chip
                            label={jobsCount > 0 ? `${jobsCount} positions` : "No Hiring"}
                            color="success"
                            size="small"
                            sx={{ ml: 1 }}
                        />
                    )}
                </Box>

                <Box sx={{ mb: 2 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocationOn sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                    {location}
                                </Typography>
                            </Box>
                        </Stack>
                </Box>

                {/* <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    {description}
                </Typography> */}

                {showStats && (
                    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Business sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                                {industry}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <People sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                                {size}
                            </Typography>
                        </Box>
                    </Stack>
                )}
            </CardContent>
        </Card>
    );
}
