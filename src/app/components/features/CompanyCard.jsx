import React, { useState } from 'react';
import { Box, Typography, Avatar, Card, CardContent, Stack, Chip } from '@mui/material';
import { LocationOn, Business, People } from '@mui/icons-material';

const CompanyLogo = ({ logoUrl, logo, name }) => {
    const [imageError, setImageError] = useState(false);
    const hasValidLogo = logoUrl && !imageError;

    return (
        <Avatar
            src={hasValidLogo ? logoUrl : undefined}
            alt={name}
            onError={() => setImageError(true)}
            sx={{
                bgcolor: hasValidLogo ? 'transparent' : 'primary.main',
                width: 56,
                height: 56,
                mr: 2,
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: hasValidLogo ? 'inherit' : 'white'
            }}
        >
            {logo}
        </Avatar>
    );
};

const HiringBadge = ({ isHiring, jobsCount }) => {
    if (!isHiring) return null;

    return (
        <Chip
            label={jobsCount > 0 ? `${jobsCount} positions` : "Hiring"}
            size="small"
            sx={{
                ml: 1,
                bgcolor: 'rgba(156, 39, 176, 0.1)',
                color: 'rgba(156, 39, 176, 0.9)',
                fontWeight: 500,
                '&:hover': {
                    bgcolor: 'rgba(156, 39, 176, 0.15)'
                }
            }}
        />
    );
};

const LocationInfo = ({ location }) => {
    if (!location || location.trim() === '') return null;

    return (
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
    );
};

const CompanyDescription = ({ description }) => {
    if (!description || description.trim() === '') return null;

    return (
        <Typography
            variant="body2"
            color="text.secondary"
            sx={{
                mb: 2,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: 1.5
            }}
        >
            {description}
        </Typography>
    );
};

const CompanyStats = ({ techStack, size }) => {
    const hasTechStack = techStack && techStack.trim() !== '' && techStack !== "Technology";
    const hasSize = size && size !== "Size not specified";

    if (!hasTechStack && !hasSize) return null;

    return (
        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            {hasTechStack && (
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
                    <Business sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary', flexShrink: 0 }} />
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {techStack}
                    </Typography>
                </Box>
            )}
            {hasSize && (
                <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    <People sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                        {size}
                    </Typography>
                </Box>
            )}
        </Stack>
    );
};

export default function CompanyCard({ company = {}, onClick, showStats = true }) {
    const {
        name = "Company Name",
        logo,
        logoUrl,
        location,
        industry,
        size,
        tech_stack = [],
        description,
        jobsCount = 0,
        isHiring = false
    } = company;

    // Get first letter of company name as fallback logo
    const logoFallback = logo || name?.[0]?.toUpperCase() || "C";

    // Format tech stack for display - prioritize tech_stack array over industry string
    const techStackDisplay = Array.isArray(tech_stack) && tech_stack.length > 0
        ? tech_stack.join(', ')
        : (industry && industry !== "Technology" ? industry : null);

    return (
        <Card
            sx={{
                height: '100%',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3
                }
            }}
            onClick={() => onClick?.(company)}
        >
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Header: Logo, Name, Hiring Badge */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <CompanyLogo logoUrl={logoUrl} logo={logoFallback} name={name} />

                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                mb: 0.5,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: 'vertical'
                            }}
                        >
                            {name}
                        </Typography>
                    </Box>

                    <HiringBadge isHiring={isHiring} jobsCount={jobsCount} />
                </Box>

                {/* Location (only if available) */}
                <LocationInfo location={location} />

                {/* Description */}
                <CompanyDescription description={description} />

                {/* Stats: Tech Stack & Employee Count */}
                {showStats && (
                    <Box sx={{ mt: 'auto' }}>
                        <CompanyStats techStack={techStackDisplay} size={size} />
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}
