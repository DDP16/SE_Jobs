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
    // Extract data from company object
    const id = company.id;
    const name = company.name || "Company Name";
    const logo = company.logo || (name ? name.charAt(0).toUpperCase() : "C");

    // Get location from first branch if available
    const firstBranch = company.company_branches?.[0];
    const location = firstBranch
        ? `${firstBranch.address || ""}, ${firstBranch.provinces?.name || ""}, ${firstBranch.countries?.name || ""}`.trim() || "Location"
        : "Location";

    // Get industry from company_types array
    const industry = company.company_types?.length > 0
        ? company.company_types.map(type => type.name).join(", ")
        : "Industry";

    // Get employee count and format as size
    const employeeCount = company.employee_count || 0;
    const getSizeLabel = (count) => {
        if (count === 0) return "10-50 employees";
        if (count < 50) return "1-50 employees";
        if (count < 200) return "50-200 employees";
        if (count < 500) return "200-500 employees";
        if (count < 1000) return "500-1000 employees";
        return "1000+ employees";
    };
    const size = getSizeLabel(employeeCount);

    const description = company.description || "Company description...";
    const jobsCount = company.jobsCount || company.jobs?.length || 0;
    const isHiring = jobsCount > 0;

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
                    <Box
                        sx={{
                            width: 56,
                            height: 56,
                            mr: 2,
                            bgcolor: 'white',
                            // border: '1px solid',
                            // borderColor: 'divider',
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            flexShrink: 0
                        }}
                    >
                        {company.logo ? (
                            <img
                                src={company.logo}
                                alt={name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    padding: '4px'
                                }}
                            />
                        ) : (
                            <Typography
                                sx={{
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    color: 'primary.main'
                                }}
                            >
                                {logo}
                            </Typography>
                        )}
                    </Box>

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
