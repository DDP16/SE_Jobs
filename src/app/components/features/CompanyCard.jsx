import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActionArea,
    Stack
} from '@mui/material';
import {
    LocationOn,
    Business,
    People,
    WorkOutline
} from '@mui/icons-material';
import { CheckCircle } from 'lucide-react';

export default function CompanyCard({
    company = {},
    onClick,
    showStats = true
}) {
    const { t } = useTranslation();
    // Extract data from company object
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
        const suffix = t('company.header.employees');
        if (count === 0) return `10-50 ${suffix}`;
        if (count < 50) return `1-50 ${suffix}`;
        if (count < 200) return `50-200 ${suffix}`;
        if (count < 500) return `200-500 ${suffix}`;
        if (count < 1000) return `500-1000 ${suffix}`;
        return `1000+ ${suffix}`;
    };
    const size = getSizeLabel(employeeCount);

    const jobsCount = company.jobsCount || company.jobs?.length || 0;
    const isHiring = jobsCount > 0;
    const jobsLabel = t('company.header.jobs_count', { count: jobsCount });

    return (
        <Card
            sx={{
                height: '100%',
                cursor: 'pointer',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.08)'
                },
                position: 'relative'
            }}
            onClick={() => onClick?.(company)}
        >
            <CardActionArea sx={{ height: '100%', position: 'relative' }}>
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: { xs: 1.5, sm: 2 },
                            mb: 1.5,
                            flexWrap: 'nowrap'
                        }}
                    >
                        <Box
                            sx={{
                                width: { xs: 48, sm: 56 },
                                height: { xs: 48, sm: 56 },
                                bgcolor: 'white',
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                flexShrink: 0,
                                border: '1px solid',
                                borderColor: 'divider'
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
                                        fontSize: { xs: '1.25rem', sm: '1.5rem' },
                                        fontWeight: 'bold',
                                        color: 'primary.main'
                                    }}
                                >
                                    {logo}
                                </Typography>
                            )}
                        </Box>

                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                            <Stack spacing={0.5} sx={{ minWidth: 0 }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: { xs: '1rem', sm: '1.125rem' },
                                        lineHeight: 1.3,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.75
                                    }}
                                >
                                    {name}
                                    {company.is_verified && (
                                        <CheckCircle className="w-5 h-5 text-green-600" style={{ flexShrink: 0 }} />
                                    )}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {location}
                                </Typography>
                            </Stack>
                        </Box>

                    </Box>

                    {showStats && (
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                                mt: 1,
                                mb: 1,
                                alignItems: 'center',
                                minWidth: 0,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
                                <Business sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary', flexShrink: 0 }} />
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        maxWidth: 180
                                    }}
                                >
                                    {industry}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
                                <People sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary', flexShrink: 0 }} />
                                <Typography variant="caption" color="text.secondary">
                                    {size}
                                </Typography>
                            </Box>
                        </Stack>
                    )}

                    {isHiring && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 2, minWidth: 0 }}>
                            <WorkOutline sx={{ fontSize: 18, color: 'text.secondary', flexShrink: 0 }} />
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    fontSize: 14,
                                    lineHeight: 1.5,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {jobsLabel}
                            </Typography>
                        </Box>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
