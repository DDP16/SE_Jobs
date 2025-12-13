import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
    Box,
    Typography,
    Avatar,
    Chip,
    Card,
    CardContent,
    IconButton,
    Stack,
    Paper,
    Divider,
    Portal,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { BookmarkBorder, Bookmark } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Badge from '../common/Badge';
import Button from '../common/Button';

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

const openExternalUrl = (url) => {
    if (url.includes('topcv.vn')) {
        try {
            window.open(url, '_blank', 'noopener');
        } catch (err) {
            const a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.click();
        }
    }
};

const getTimeAgo = (dateString) => {
    if (!dateString) return null;
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffHours < 1) return 'Vừa đăng';
        if (diffHours < 24) return `Đăng ${diffHours} giờ trước`;
        if (diffDays < 7) return `Đăng ${diffDays} ngày trước`;
        if (diffDays < 30) return `Đăng ${Math.floor(diffDays / 7)} tuần trước`;
        return `Đăng ${Math.floor(diffDays / 30)} tháng trước`;
    } catch {
        return null;
    }
};

export default function JobCard({
    job = {},
    onBookmark,
    onClick,
    isBookmarked = false,
    showPopup = true,
    variant = 'grid'
}) {
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('md'));

    const [isHovered, setIsHovered] = useState(false);
    const [hoverTimeout, setHoverTimeout] = useState(null);
    const [popupPosition, setPopupPosition] = useState({
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    });
    const cardRef = useRef(null);

    const openDelay = 300;
    const closeDelay = 300;

    const calculatePopupPosition = useCallback(() => {
        if (!cardRef.current) {
            return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
        }

        const cardRect = cardRef.current.getBoundingClientRect();
        const popupWidth = 420;
        const popupHeight = Math.min(window.innerHeight * 0.7, 600);
        const padding = 16;
        const gap = 8;

        const spaceOnRight = window.innerWidth - cardRect.right - padding;
        const spaceOnLeft = cardRect.left - padding;

        let left;
        if (spaceOnRight >= popupWidth + gap) {
            left = cardRect.right + gap;
        } else if (spaceOnLeft >= popupWidth + gap) {
            left = cardRect.left - popupWidth - gap;
        } else if (spaceOnRight > spaceOnLeft) {
            left = Math.min(cardRect.right + gap, window.innerWidth - popupWidth - padding);
        } else {
            left = Math.max(cardRect.left - popupWidth - gap, padding);
        }

        let top = cardRect.top;
        const maxTop = window.innerHeight - popupHeight - padding;
        top = Math.max(padding, Math.min(top, maxTop));

        return { top: `${top}px`, left: `${left}px`, transform: 'none' };
    }, []);

    const normalizedJob = useMemo(() => ({
        title: job.title || "Job Title",
        company: job.company,
        location: Array.isArray(job.locations) && job.locations.length > 0
            ? job.locations[0]
            : (Array.isArray(job.workLocation) && job.workLocation.length > 0
                ? job.workLocation[0]
                : (job.location || job.company_branches?.location || job.shortCity)),
        type: job.type || (Array.isArray(job.employment_types) && job.employment_types.length > 0
            ? job.employment_types.map(et => et.name || et).join(', ')
            : null),
        salary_text: job.salary_text || job.salary?.text,
        salary_from: job.salary_from ?? job.salary?.from,
        salary_to: job.salary_to ?? job.salary?.to,
        salary_currency: job.salary_currency || job.salary?.currency,
        job_deadline: job.job_deadline || job.deadline,
        url: normalizeUrl(job.url, job.website_url),
        updatedAt: job.updatedAt || job.updated_at,
        publish: job.publish || job.job_posted_at,
        experience: job.experience || (Array.isArray(job.levels) && job.levels.length > 0
            ? job.levels.map(l => l.name || l).join(', ')
            : null),
        locations: Array.isArray(job.locations)
            ? job.locations
            : (Array.isArray(job.workLocation)
                ? job.workLocation
                : (job.location ? [job.location] : (job.shortCity ? [job.shortCity] : []))),
        description: job.description,
        responsibilities: job.responsibilities || [],
        requirements: job.requirements || [],
        requirement: job.requirement || [],
        nice_to_haves: job.nice_to_haves || [],
        niceToHaves: job.niceToHaves || [],
        working_time: job.working_time || (Array.isArray(job.workingTime) && job.workingTime.length > 0 ? job.workingTime.join(', ') : null),
        logo: job.logo,
        isFeatured: job.isFeatured,
        is_diamond: job.is_diamond || job.isDiamond,
        is_job_flash_active: job.is_job_flash_active || job.isJobFlashActive,
        is_hot: job.is_hot || job.isHot,
        created_at: job.created_at || job.createdAt,
        createdAt: job.createdAt || job.created_at,
        position: job.position,
        quantity: job.quantity
    }), [job]);

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
        createdAt
    } = normalizedJob;

    const companyName = typeof companyData === 'string'
        ? companyData
        : companyData?.name || "Company Name";

    const companyLogoUrl = logo || companyData?.logo;
    const companyLogoInitial = "SE";

    const displaySalary = salary_text ||
        (salary_from && salary_to
            ? `${salary_from} - ${salary_to} ${salary_currency || ''}`.trim()
            : salary_from
                ? `${salary_from} ${salary_currency || ''}`.trim()
                : "Salary not specified");

    const isTopCV = useMemo(() => {
        return jobUrl && typeof jobUrl === 'string' && jobUrl.includes('topcv.vn');
    }, [jobUrl]);

    const primaryColor = useMemo(() => {
        return isTopCV ? '#00B14F' : '#1976d2';
    }, [isTopCV]);

    const primaryLightColor = useMemo(() => {
        return isTopCV ? '#00B14F' : theme.palette.primary.light;
    }, [isTopCV, theme.palette.primary.light]);

    const primaryDarkColor = useMemo(() => {
        return isTopCV ? '#008B3D' : theme.palette.primary.dark;
    }, [isTopCV, theme.palette.primary.dark]);

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
        if (isValidUrl(jobUrl) && jobUrl.includes('topcv.vn')) {
            openExternalUrl(jobUrl);
            return;
        }
        if (onClick && typeof onClick === 'function') {
            onClick(job);
        } else {
            const jobId = getJobId(job);
            if (jobId) {
                navigate(`/job?id=${jobId}`);
            }
        }
    }, [jobUrl, onClick, job, navigate]);

    const handleCardClick = useCallback((e) => {
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('[role="button"]')) return;
        handleNavigate();
    }, [handleNavigate]);

    const handleHoverStart = useCallback(() => {
        if (hoverTimeout) clearTimeout(hoverTimeout);
        const timeout = setTimeout(() => {
            try {
                if (!cardRef.current) return;
                const position = calculatePopupPosition();
                setPopupPosition(position);
                setIsHovered(true);
            } catch (err) {
                console.error('JobCard hover error:', err);
            }
        }, openDelay);
        setHoverTimeout(timeout);
    }, [hoverTimeout, calculatePopupPosition, openDelay]);

    const handleHoverEnd = useCallback(() => {
        if (hoverTimeout) clearTimeout(hoverTimeout);
        const timeout = setTimeout(() => setIsHovered(false), closeDelay);
        setHoverTimeout(timeout);
    }, [hoverTimeout, closeDelay]);

    const hoverProps = showPopup && !isSmall ? {
        onMouseEnter: handleHoverStart,
        onMouseLeave: handleHoverEnd,
        onFocus: handleHoverStart,
        onBlur: handleHoverEnd
    } : {};

    return (
        <Box sx={{ position: 'relative' }}>
            <Card
                ref={cardRef}
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
                    p: variant === 'list' ? 2.5 : 2,
                    display: 'flex',
                    flexDirection: 'column',
                    '&:last-child': {
                        paddingBottom: variant === 'list' ? 2.5 : 2
                    }
                }}>
                    {variant === 'list' && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.75rem' }}>
                                {getTimeAgo(created_at || createdAt) || 'Đăng gần đây'}
                            </Typography>
                            {isJobFeatured && (
                                <Chip
                                    label="HOT"
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
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: variant === 'list' ? 1.5 : 1.25 }}>
                        <Avatar
                            src={isValidUrl(companyLogoUrl) ? companyLogoUrl : undefined}
                            variant="square"
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
                                boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                            }}
                        >
                            {companyLogoInitial}
                        </Avatar>

                        <Box sx={{ flexGrow: 1, minWidth: 0, flex: 1, pr: variant === 'list' ? 0 : 6 }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5, mb: 0.5 }} {...hoverProps}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: variant === 'list' ? '1.05rem' : '0.98rem',
                                        lineHeight: 1.32,
                                        cursor: showPopup ? 'pointer' : 'default',
                                        color: 'text.primary',
                                        transition: 'color 0.2s ease-in-out',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        ...(showPopup && {
                                            '&:hover': {
                                                color: primaryColor
                                            }
                                        })
                                    }}
                                >
                                    {title}
                                </Typography>
                            </Box>

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
                                    mb: variant === 'list' ? 1 : 0
                                }}
                            >
                                {companyName}
                            </Typography>


                        </Box>

                        {variant !== 'list' && (
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onBookmark?.(job);
                                }}
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
                        )}
                    </Box>



                    {variant === 'list' ? (
                        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 1.5 }}>
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
                                normalizedJob.locations.slice(0, 2).map((loc, index) => (
                                    <Chip
                                        key={index}
                                        label={loc}
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
                                ))
                            ) : location ? (
                                <Chip
                                    label={location}
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

                            {normalizedJob.experience && (
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
                            {location && (
                                <Chip
                                    label={location}
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



                    {variant === 'list' && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1 }}>
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onBookmark?.(job);
                                }}
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
                        </Box>
                    )}
                </CardContent>
            </Card>

            {showPopup && isHovered && !isSmall && (
                <Portal>
                    <Paper
                        onMouseEnter={() => {
                            if (hoverTimeout) clearTimeout(hoverTimeout);
                            setIsHovered(true);
                        }}
                        onMouseLeave={() => {
                            if (hoverTimeout) clearTimeout(hoverTimeout);
                            const timeout = setTimeout(() => setIsHovered(false), closeDelay);
                            setHoverTimeout(timeout);
                        }}
                        elevation={8}
                        sx={{
                            position: 'fixed',
                            top: popupPosition.top,
                            left: popupPosition.left,
                            transform: popupPosition.transform,
                            p: 2.5,
                            zIndex: 9999,
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                            minWidth: '350px',
                            maxWidth: '450px',
                            maxHeight: '70vh',
                            overflowY: 'auto',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                            animation: 'fadeIn 0.15s ease-out',
                            touchAction: 'pan-y',
                            '@keyframes fadeIn': {
                                from: {
                                    opacity: 0,
                                    transform: `${popupPosition.transform} translateY(-8px)`
                                },
                                to: {
                                    opacity: 1,
                                    transform: popupPosition.transform
                                }
                            }
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, fontSize: '1.1rem' }}>
                            {title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5, fontSize: '0.9rem' }}>
                            {companyName}
                        </Typography>

                        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 0.5 }}>
                            {displaySalary && (
                                <Chip
                                    label={displaySalary}
                                    size="small"
                                    sx={{
                                        bgcolor: primaryColor,
                                        color: 'white',
                                        fontSize: '0.75rem',
                                        height: '24px'
                                    }}
                                />
                            )}
                            {location && (
                                <Chip
                                    label={location}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: '0.75rem', height: '24px' }}
                                />
                            )}
                            {type && (
                                <Chip
                                    label={type}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: '0.75rem', height: '24px' }}
                                />
                            )}
                            {working_time && (
                                <Chip
                                    label={working_time}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: '0.75rem', height: '24px' }}
                                />
                            )}
                        </Stack>

                        {description && (
                            <>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
                                    Mô tả công việc
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: '0.85rem',
                                        lineHeight: 1.6,
                                        mb: 2
                                    }}
                                >
                                    {description}
                                </Typography>
                            </>
                        )}

                        {responsibilities?.length > 0 && (
                            <>
                                <Divider sx={{ my: 1.5 }} />
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                    Trách nhiệm
                                </Typography>
                                <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                                    {responsibilities.slice(0, 5).map((item, index) => (
                                        <Typography
                                            key={index}
                                            component="li"
                                            variant="body2"
                                            sx={{ color: 'text.secondary', fontSize: '0.85rem', mb: 0.5 }}
                                        >
                                            {item}
                                        </Typography>
                                    ))}
                                </Box>
                            </>
                        )}

                        {(requirements?.length > 0 || requirement?.length > 0) && (
                            <>
                                <Divider sx={{ my: 1.5 }} />
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                    Yêu cầu
                                </Typography>
                                <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                                    {(requirements || requirement || []).slice(0, 5).map((item, index) => (
                                        <Typography
                                            key={index}
                                            component="li"
                                            variant="body2"
                                            sx={{ color: 'text.secondary', fontSize: '0.85rem', mb: 0.5 }}
                                        >
                                            {item}
                                        </Typography>
                                    ))}
                                </Box>
                            </>
                        )}

                        {(nice_to_haves?.length > 0 || niceToHaves?.length > 0) && (
                            <>
                                <Divider sx={{ my: 1.5 }} />
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                    Nice to have
                                </Typography>
                                <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                                    {(nice_to_haves || niceToHaves || []).slice(0, 3).map((item, index) => (
                                        <Typography
                                            key={index}
                                            component="li"
                                            variant="body2"
                                            sx={{ color: 'text.secondary', fontSize: '0.85rem', mb: 0.5 }}
                                        >
                                            {item}
                                        </Typography>
                                    ))}
                                </Box>
                            </>
                        )}

                        {job_deadline && (
                            <>
                                <Divider sx={{ my: 1.5 }} />
                                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                                    <strong>Hạn nộp hồ sơ:</strong> {isNaN(new Date(job_deadline)) ? job_deadline : new Date(job_deadline).toLocaleDateString('vi-VN')}
                                </Typography>
                            </>
                        )}

                        <Box sx={{ position: 'sticky', bottom: 0, mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={handleNavigate}
                                sx={{
                                    bgcolor: primaryColor,
                                    color: 'white',
                                    fontWeight: 600,
                                    py: 1.5,
                                    textTransform: 'none',
                                    fontSize: '0.95rem',
                                    '&:hover': {
                                        bgcolor: primaryDarkColor
                                    }
                                }}
                            >
                                Xem chi tiết
                            </Button>
                        </Box>
                    </Paper>
                </Portal>
            )}
        </Box>
    );
}
