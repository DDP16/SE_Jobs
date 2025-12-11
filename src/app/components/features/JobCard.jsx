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
    try {
        window.open(url, '_blank', 'noopener');
    } catch (err) {
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.click();
    }
};

export default function JobCard({
    job = {},
    onBookmark,
    onClick,
    isBookmarked = false,
    showPopup = true
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
            : job.location || job.company_branches?.location,
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
            : (job.location ? [job.location] : (job.company_branches?.location ? [job.company_branches.location] : [])),
        description: job.description || "Job description...",
        responsibilities: job.responsibilities || [],
        requirements: job.requirements || [],
        requirement: job.requirement || [],
        nice_to_haves: job.nice_to_haves || [],
        niceToHaves: job.niceToHaves || [],
        working_time: job.working_time,
        logo: job.logo,
        isFeatured: job.isFeatured,
        is_diamond: job.is_diamond,
        is_job_flash_active: job.is_job_flash_active,
        is_hot: job.is_hot,
        created_at: job.created_at,
        createdAt: job.createdAt
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
    const companyLogoInitial = (companyName && companyName !== "Company Name" && companyName.length > 0)
        ? companyName.charAt(0).toUpperCase()
        : "SE";

    const displaySalary = salary_text ||
        (salary_from && salary_to
            ? `${salary_from} - ${salary_to} ${salary_currency || ''}`.trim()
            : salary_from
                ? `${salary_from} ${salary_currency || ''}`.trim()
                : "Salary not specified");

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
        if (isValidUrl(jobUrl)) {
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
                    minHeight: '150px',
                    minWidth: '260px',
                    maxWidth: '100%',
                    cursor: onClick ? 'pointer' : 'default',
                    '&:hover': {
                        transform: 'translateY(-1px)',
                        transition: 'transform 0.2s ease-in-out',
                        '& .featured-badge': {
                            opacity: 1,
                            transform: 'scale(1.05)',
                            transition: 'all 0.2s ease-in-out'
                        }
                    }
                }}
            >
                {isJobFeatured && (
                    <Box
                        className="featured-badge"
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            zIndex: 1,
                            opacity: 0.5,
                            transition: 'all 0.2s ease-in-out'
                        }}
                    >
                        <Chip
                            label="Featured"
                            size="small"
                            color="warning"
                            sx={{
                                bgcolor: 'warning.main',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                height: '24px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        />
                    </Box>
                )}

                <IconButton
                    size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        onBookmark?.(job);
                    }}
                    sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        zIndex: 1,
                        bgcolor: 'background.paper',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            bgcolor: 'primary.main',
                            color: 'white',
                            transform: 'scale(1.1)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        },
                        color: isBookmarked ? 'primary.main' : 'text.secondary'
                    }}
                >
                    {isBookmarked ? <Bookmark fontSize="small" /> : <BookmarkBorder fontSize="small" />}
                </IconButton>

                <CardContent sx={{ flexGrow: 1, p: 1.25 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
                        <Avatar
                            src={companyLogoUrl}
                            variant="square"
                            sx={{
                                bgcolor: '#ffffff',
                                width: 48,
                                height: 48,
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                borderRadius: 2,
                                flexShrink: 0
                            }}
                        >
                            {companyLogoInitial}
                        </Avatar>

                        <Box sx={{ flexGrow: 1, minWidth: 0, flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }} {...hoverProps}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontWeight: 600,
                                        mb: 0.25,
                                        fontSize: '0.95rem',
                                        pr: isJobFeatured ? 10 : 0,
                                        lineHeight: 1.3,
                                        cursor: showPopup ? 'pointer' : 'default',
                                        position: 'relative',
                                        color: 'text.primary',
                                        transition: 'all 0.2s ease-in-out',
                                        // Clamp to 2 lines
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        ...(showPopup && {
                                            '&:hover': {
                                                color: 'primary.main'
                                            }
                                        })
                                    }}
                                >
                                    {title}
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mb: 0.75,
                                    fontSize: '0.875rem',
                                    lineHeight: 1.2,
                                    // Clamp to 1 line
                                    display: '-webkit-box',
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                            >
                                {companyName}
                            </Typography>

                            <Stack direction="row" spacing={0.5} sx={{ mb: 0.75, flexWrap: 'wrap', gap: 0.5 }}>
                                {type && <Badge label={type} color="secondary" size="small" />}
                                <Badge label={displaySalary} color="success" size="small" />
                            </Stack>

                            {location && (
                                <Badge
                                    label={location}
                                    variant="outlined"
                                    size="small"
                                    sx={{ mt: 0 }}
                                />
                            )}
                        </Box>
                    </Box>
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
                                        bgcolor: 'success.main',
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
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    fontWeight: 600,
                                    py: 1.5,
                                    textTransform: 'none',
                                    fontSize: '0.95rem',
                                    '&:hover': {
                                        bgcolor: 'primary.dark'
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
