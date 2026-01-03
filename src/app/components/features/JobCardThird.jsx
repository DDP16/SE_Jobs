import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
    Box,
    Typography,
    Avatar,
    Chip,
    Card,
    CardContent,
    IconButton,
    Stack,
    useTheme
} from '@mui/material';
import { BookmarkBorder, Bookmark } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Helper functions
const isValidUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    const trimmed = url.trim();
    if (trimmed === '' || trimmed === 'string') return false;
    return trimmed.startsWith('http://') || trimmed.startsWith('https://');
};

const normalizeUrl = (url, website_url) => {
    const rawUrl = url || website_url;
    if (!rawUrl || typeof rawUrl !== 'string') return null;
    const trimmed = rawUrl.trim();
    if (trimmed === '' || trimmed === 'string' || (!trimmed.startsWith('http://') && !trimmed.startsWith('https://'))) {
        return null;
    }
    return trimmed;
};

const getJobId = (job) => job.id || job.job_id || job.jobId || job._id;

// Helper function to check if value is a placeholder "string"
const isValidValue = (value) => {
    if (!value) return false;
    if (typeof value === 'string') {
        const trimmed = value.trim();
        return trimmed !== '' && trimmed !== 'string' && trimmed !== 'null' && trimmed !== 'undefined';
    }
    return true;
};

// Removed openExternalUrl - TopCV jobs now navigate to internal TopCVDescription page

const getTimeAgo = (dateString) => {
    if (!dateString) return null;
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffHours < 1) return 'Vừa đăng';
        if (diffHours < 24) return `${diffHours} giờ trước`;
        if (diffDays < 7) return `${diffDays} ngày trước`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
        return `${Math.floor(diffDays / 30)} tháng trước`;
    } catch {
        return null;
    }
};

const normalizeNumber = (value) => {
    if (value === null || value === undefined) return null;
    const cleaned = String(value).replace(/[^\d]/g, '');
    if (!cleaned) return null;
    return parseInt(cleaned, 10);
};

const tryParseSalaryText = (text) => {
    if (!text || typeof text !== 'string') return null;
    const numberGroups = text.match(/[\d.,]+/g);
    if (!numberGroups || numberGroups.length === 0) return null;

    const [fromRaw, toRaw] = numberGroups;
    const from = normalizeNumber(fromRaw);
    const to = normalizeNumber(toRaw);

    if ((from === null || Number.isNaN(from)) && (to === null || Number.isNaN(to))) return null;

    const currencyHint = /vnd|₫/i.test(text) ? 'VND' : null;
    return { from, to, currencyHint };
};

// ============================================================================
// Bookmark Button Component
// ============================================================================

const BookmarkButton = ({ isBookmarked, onClick, size = 'small' }) => (
    <IconButton
        size={size}
        onClick={onClick}
        sx={{
            color: isBookmarked ? 'error.main' : 'text.disabled',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
                color: isBookmarked ? 'error.dark' : 'text.secondary',
                transform: 'scale(1.1)',
            }
        }}
    >
        {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
    </IconButton>
);

export default function JobCard({
    job = {},
    onBookmark,
    onClick,
    isBookmarked,
    variant = 'grid'
}) {
    const navigate = useNavigate();
    const theme = useTheme();
    const currentUser = useSelector(state => state.auth?.user);
    const isAuthenticated = useSelector(state => state.auth?.isAuthenticated);

    // Extract unique provinces from company branches
    const getUniqueProvinces = useCallback(() => {
        if (!job.company_branches) return [];

        // Handle array of branches
        const branches = Array.isArray(job.company_branches)
            ? job.company_branches
            : [job.company_branches];

        if (branches.length === 0) return [];

        // Extract unique provinces
        const provinces = branches
            .map(branch => branch?.province?.name)
            .filter(Boolean);

        // Remove duplicates
        const uniqueProvinces = [...new Set(provinces)];
        return uniqueProvinces;
    }, [job.company_branches]);

    // Extract location from company branches (for single location display)
    const getLocationFromBranch = useCallback(() => {
        const uniqueProvinces = getUniqueProvinces();
        if (uniqueProvinces.length === 0) return null;

        // Join unique provinces with comma
        return uniqueProvinces.join(', ');
    }, [getUniqueProvinces]);

    // Extract locations array from all branches (grouped by unique provinces)
    const getLocationsFromBranches = useCallback(() => {
        const uniqueProvinces = getUniqueProvinces();
        if (uniqueProvinces.length === 0) return [];

        // Return array of unique provinces
        return uniqueProvinces;
    }, [getUniqueProvinces]);

    // Extract locations array
    const getLocationsArray = useCallback((locationFromBranch) => {
        // First, try to get locations from branches
        const branchLocations = getLocationsFromBranches();
        if (branchLocations.length > 0) return branchLocations;

        // Fallback to locationFromBranch (single location)
        if (locationFromBranch) return [locationFromBranch];

        // Fallback to other location fields
        if (Array.isArray(job.locations) && job.locations.length > 0) return job.locations;
        if (Array.isArray(job.workLocation) && job.workLocation.length > 0) return job.workLocation;
        if (job.location) return [job.location];
        if (job.shortCity) return [job.shortCity];
        return [];
    }, [job.locations, job.workLocation, job.location, job.shortCity, getLocationsFromBranches]);

    const normalizedJob = useMemo(() => {
        const locationFromBranch = getLocationFromBranch();

        return {
            title: job.title || "Job Title",
            company: job.company,
            location: locationFromBranch || (Array.isArray(job.locations) && job.locations[0]) || job.shortCity,
            type: job.type || (Array.isArray(job.employment_types)
                ? job.employment_types.map(et => et.name || et).join(', ')
                : null),
            salary_text: job.salary_text || job.salary?.text,
            salary_from: job.salary_from ?? job.salary?.from,
            salary_to: job.salary_to ?? job.salary?.to,
            salary_currency: job.salary_currency || job.salary?.currency,
            job_deadline: job.job_deadline || job.deadline,
            url: normalizeUrl(job.url, job.website_url),
            updatedAt: job.updatedAt || job.updated_at,
            publish: job.publish || job.created_at,
            experience: job.experience || (Array.isArray(job.levels)
                ? job.levels.map(l => l.name || l).join(', ')
                : null),
            locations: getLocationsArray(locationFromBranch),
            description: job.description,
            responsibilities: job.responsibilities || [],
            requirement: job.requirement || [],
            nice_to_haves: job.nice_to_haves || [],
            working_time: job.working_time || (Array.isArray(job.workingTime) ? job.workingTime.join(', ') : null),
            logo: job.logo,
            isFeatured: job.isFeatured,
            is_diamond: job.is_diamond || job.isDiamond,
            is_job_flash_active: job.is_job_flash_active || job.isJobFlashActive,
            is_hot: job.is_hot || job.isHot,
            created_at: job.created_at || job.createdAt,
            createdAt: job.createdAt || job.created_at,
            position: job.position,
            quantity: job.quantity
        };
    }, [job, getLocationFromBranch, getLocationsArray]);

    const {
        title,
        company: companyData,
        location,
        type,
        salary_text,
        salary_from,
        salary_to,
        salary_currency,
        description,
        responsibilities,
        requirements,
        requirement,
        nice_to_haves,
        niceToHaves,
        working_time,
        job_deadline,
        url: jobUrl,
        logo,
        isFeatured,
        is_diamond,
        is_job_flash_active,
        is_hot,
        created_at,
        createdAt,
        publish
    } = normalizedJob;

    // Company information
    const companyName = typeof companyData === 'string'
        ? companyData
        : companyData?.name || "Company Name";
    const companyLogoUrl = logo || companyData?.logo;
    const companyLogoInitial = "SE";

    // Bookmark state management (optimistic updates)
    const bookmarked = useMemo(() => {
        if (job?.isSaved !== undefined && job?.isSaved !== null) {
            return Boolean(job.isSaved);
        }
        return Boolean(isBookmarked);
    }, [job?.isSaved, isBookmarked]);

    const [localBookmarked, setLocalBookmarked] = useState(bookmarked);

    useEffect(() => {
        setLocalBookmarked(bookmarked);
    }, [bookmarked]);

    // Theme colors based on job source - calculate early since displaySalary depends on it
    const isTopCV = useMemo(() =>
        jobUrl && typeof jobUrl === 'string' && jobUrl.includes('topcv.vn'),
        [jobUrl]
    );

    const formatNumber = (num) => {
        return num.toLocaleString('en-US');
    };

    const formatVND = (amount) => {
        const num = Number(amount);
        if (isNaN(num) || num === 0) return null;

        if (num >= 1000000) {
            const millions = num / 1000000;
            return `${formatNumber(millions)} Triệu`;
        }
        return formatNumber(num);
    };

    const formatSalaryValue = (value, isVND) => {
        if (!isValidValue(value)) return null;
        const num = Number(value);
        if (isNaN(num) || num === 0) return null;
        return isVND ? formatVND(num) : formatNumber(num);
    };

    const displaySalary = useMemo(() => {
        // TopCV data - return as is
        if (isTopCV && isValidValue(salary_text)) {
            return salary_text;
        }

        const currency = (salary_currency || '').trim();
        const isVND = /vnd|₫/i.test(currency) || /vnd|₫/i.test(salary_text || '');
        const currencySuffix = isVND ? '' : ` ${currency || 'VND'}`;

        // Try parsing salary_text first
        if (isValidValue(salary_text)) {
            const parsed = tryParseSalaryText(salary_text);
            if (parsed) {
                const from = formatSalaryValue(parsed.from, isVND);
                const to = formatSalaryValue(parsed.to, isVND);

                // Both are 0 or invalid
                if (!from && !to) return "Thỏa thuận";

                if (from && to) return `${from} - ${to}${currencySuffix}`;
                if (from) return `Từ ${from}${currencySuffix}`;
                if (to) return `Lên đến ${to}${currencySuffix}`;
            }
            return salary_text;
        }

        // Use salary_from and salary_to
        const from = formatSalaryValue(salary_from, isVND);
        const to = formatSalaryValue(salary_to, isVND);

        // Both are 0 or invalid
        if (!from && !to) return "Thỏa thuận";

        if (from && to) return `${from} - ${to}${currencySuffix}`;
        if (from) return `Từ ${from}${currencySuffix}`;
        if (to) return `Lên đến ${to}${currencySuffix}`;

        return "Thỏa thuận";
    }, [salary_text, salary_from, salary_to, salary_currency, isTopCV]);

    const primaryColor = isTopCV ? '#00B14F' : '#1976d2';
    const primaryLightColor = isTopCV ? '#00B14F' : theme.palette.primary.light;


    const isJobFeatured = useMemo(() => {
        const jobCreatedAt = created_at || createdAt;
        if (jobCreatedAt) {
            const createdDate = new Date(jobCreatedAt);
            const now = new Date();
            const diffDays = Math.ceil(Math.abs(now - createdDate) / (1000 * 60 * 60 * 24));
            if (diffDays < 7) return true;
        }
        if (isFeatured !== undefined) return isFeatured;
        return is_diamond || is_job_flash_active || is_hot || false;
    }, [created_at, createdAt, isFeatured, is_diamond, is_job_flash_active, is_hot]);

    const handleNavigate = useCallback(() => {
        if (onClick && typeof onClick === 'function') {
            onClick(job);
        } else {
            const jobId = getJobId(job);
            if (jobId) {
                // Check if it's a TopCV job and navigate to TopCV description page
                if (isValidUrl(jobUrl) && jobUrl.includes('topcv.vn')) {
                    navigate(`/topcv-job?id=${jobId}`);
                } else {
                    navigate(`/job?id=${jobId}`);
                }
            }
        }
    }, [jobUrl, onClick, job, navigate]);

    const handleCardClick = useCallback((e) => {
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('[role="button"]')) return;
        handleNavigate();
    }, [handleNavigate]);

    const handleBookmarkClick = useCallback((e) => {
        e?.stopPropagation();

        // Check if user is authenticated
        if (!isAuthenticated || !currentUser) {
            alert('Vui lòng đăng nhập vào hệ thống để lưu công việc');
            return;
        }

        if (typeof onBookmark !== 'function') return;

        // Optimistic update
        const nextState = !localBookmarked;
        setLocalBookmarked(nextState);

        // Call backend
        const jobId = getJobId(job);
        const action = nextState ? 'save' : 'unsave';

        try {
            onBookmark(job, { action, jobId });
        } catch (err) {
            console.error('Bookmark toggle error:', err);
            // Revert on error
            setLocalBookmarked(!nextState);
        }
    }, [localBookmarked, job, onBookmark, isAuthenticated, currentUser]);

    return (
        <Box sx={{ position: 'relative' }} className="h-full">
            <Card
                onClick={handleCardClick}
                sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    minHeight: '120px',
                    minWidth: '280px',
                    maxWidth: '100%',
                    cursor: onClick ? 'pointer' : 'default',
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                        borderColor: primaryLightColor,
                        transition: 'all 0.2s ease-in-out',
                    }
                }}
            >
                <CardContent sx={{
                    flexGrow: 1,
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    '&:last-child': {
                        paddingBottom: 2
                    }
                }}>
                    {variant === 'list' && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.75rem' }}>
                                {getTimeAgo(created_at || createdAt) || publish || 'Đăng gần đây'}
                            </Typography>
                            <div className='space-x-2'>
                                {isTopCV && (
                                    <Chip
                                        label="TopCV"
                                        size="small"
                                        sx={{
                                            bgcolor: '#00B14F',
                                            color: 'white',
                                            fontWeight: 700,
                                            fontSize: '0.75rem',
                                            height: '24px',
                                            borderRadius: '6px',
                                            '& .MuiChip-label': {
                                                px: 1.5
                                            }
                                        }}
                                    />
                                )}
                                {isJobFeatured && (
                                    <Chip
                                        label="New"
                                        size="small"
                                        sx={{
                                            bgcolor: '#FF6B2C',
                                            color: 'white',
                                            fontWeight: 700,
                                            fontSize: '0.75rem',
                                            height: '24px',
                                            borderRadius: '6px',
                                            '& .MuiChip-label': {
                                                px: 1.5
                                            }
                                        }}
                                    />
                                )}
                                {!isTopCV && (
                                    <BookmarkButton
                                        isBookmarked={localBookmarked}
                                        onClick={handleBookmarkClick}
                                    />
                                )}

                            </div>
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.25 }}>
                        <Avatar
                            src={companyLogoUrl || undefined}
                            variant="square"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                            sx={{
                                bgcolor: isValidUrl(companyLogoUrl) ? '#ffffff' : primaryColor,
                                width: variant === 'list' ? 72 : 64,
                                height: variant === 'list' ? 72 : 64,
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                                borderRadius: 1.5,
                                flexShrink: 0,
                                border: '1px solid',
                                borderColor: 'divider',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                                '& img': {
                                    objectFit: 'contain',
                                }
                            }}
                        >
                            {companyLogoInitial}
                        </Avatar>

                        <Box sx={{ flexGrow: 1, minWidth: 0, flex: 1, pr: variant === 'list' ? 1 : 6 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: variant === 'list' ? '1.05rem' : '0.98rem',
                                    lineHeight: 1.32,
                                    cursor: 'pointer',
                                    color: 'text.primary',
                                    transition: 'color 0.2s ease-in-out',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    mb: 0.5,
                                    '&:hover': {
                                        color: primaryColor
                                    }
                                }}
                            >
                                {title}
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: '0.8rem',
                                    lineHeight: 1.35,
                                    color: 'text.secondary',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    fontWeight: 400,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    mb: 0
                                }}
                            >
                                {companyName}
                            </Typography>


                        </Box>
                        {!isTopCV && variant !== 'list' && (
                            <BookmarkButton
                                isBookmarked={localBookmarked}
                                onClick={handleBookmarkClick}
                            />
                        )}
                    </Box>



                    {variant === 'list' ? (
                        <Stack direction="row" sx={{ flexWrap: 'wrap', rowGap: 1, columnGap: 2 }} >
                            <Chip
                                label={displaySalary}
                                size="small"
                                sx={{
                                    bgcolor: primaryColor,
                                    color: 'white',
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    height: '32px',
                                    borderRadius: '4px',
                                    '& .MuiChip-label': {
                                        px: 2,
                                        py: 0.5
                                    }
                                }}
                            />

                            {normalizedJob.locations && Array.isArray(normalizedJob.locations) && normalizedJob.locations.length > 0 ? (
                                normalizedJob.locations
                                    .filter(loc => isValidValue(loc))
                                    .slice(0, 2)
                                    .map((loc, index) => {
                                        const truncatedLoc = loc.length > 35 ? loc.substring(0, 35) + '...' : loc;
                                        return (
                                            <Chip
                                                key={index}
                                                label={truncatedLoc}
                                                title={loc}
                                                size="small"
                                                sx={{
                                                    bgcolor: '#f5f5f5',
                                                    color: 'text.secondary',
                                                    fontSize: '0.8125rem',
                                                    fontWeight: 500,
                                                    height: '32px',
                                                    borderRadius: '20px',
                                                    border: 'none',
                                                    '& .MuiChip-label': {
                                                        px: 2
                                                    },
                                                    ml: 0
                                                }}
                                            />
                                        );
                                    })
                            ) : location && isValidValue(location) ? (
                                <Chip
                                    label={location.length > 35 ? location.substring(0, 35) + '...' : location}
                                    title={location}
                                    size="small"
                                    sx={{
                                        bgcolor: '#f5f5f5',
                                        color: 'text.secondary',
                                        fontSize: '0.8125rem',
                                        fontWeight: 500,
                                        height: '32px',
                                        borderRadius: '20px',
                                        border: 'none',
                                        '& .MuiChip-label': {
                                            px: 2
                                        }
                                    }}
                                />
                            ) : null}

                            {normalizedJob.experience && isValidValue(normalizedJob.experience) && (
                                <Chip
                                    label={normalizedJob.experience}
                                    size="small"
                                    sx={{
                                        bgcolor: '#f5f5f5',
                                        color: 'text.secondary',
                                        fontSize: '0.8125rem',
                                        fontWeight: 500,
                                        height: '32px',
                                        borderRadius: '20px',
                                        border: 'none',
                                        '& .MuiChip-label': {
                                            px: 2
                                        }
                                    }}
                                />
                            )}
                        </Stack>
                    ) : (
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                alignItems: 'center',
                                flexWrap: 'nowrap',
                                pl: 0
                            }}
                        >
                            <Chip
                                label={displaySalary}
                                size="small"
                                sx={{
                                    bgcolor: primaryColor,
                                    color: 'white',
                                    fontSize: '0.8rem',
                                    fontWeight: 500,
                                    height: '28px',
                                    borderRadius: '8px',
                                    flexShrink: 0,
                                    '& .MuiChip-label': {
                                        px: 1.5,
                                        py: 0.3
                                    }
                                }}
                            />
                            {location && isValidValue(location) && (
                                <Chip
                                    label={location.length > 25 ? location.substring(0, 25) + '...' : location}
                                    title={location}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                        fontSize: '0.8rem',
                                        height: '28px',
                                        borderRadius: '8px',
                                        borderColor: primaryColor,
                                        color: primaryColor,
                                        fontWeight: 500,
                                        flexShrink: 0,
                                        '& .MuiChip-label': {
                                            px: 1.5,
                                            py: 0.3
                                        }
                                    }}
                                />
                            )}
                        </Stack>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
