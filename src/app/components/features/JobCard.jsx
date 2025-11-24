import React, { useState, useRef, useEffect } from 'react';
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
    Portal
} from '@mui/material';
import { BookmarkBorder, Bookmark, InfoOutlined } from '@mui/icons-material';
import Badge from '../common/Badge';
import Button from '../common/Button';

export default function JobCard({
    job = {},
    onBookmark,
    onClick,
    isBookmarked = false,
    showPopup = true
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [hoverTimeout, setHoverTimeout] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' });
    const cardRef = useRef(null);

    useEffect(() => {
        if (isHovered) {
            const scrollY = window.scrollY;
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            document.body.style.overflow = 'hidden';

            return () => {
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.left = '';
                document.body.style.right = '';
                document.body.style.paddingRight = '';
                document.body.style.overflow = '';
                window.scrollTo(0, scrollY);
            };
        }
    }, [isHovered]);

    const calculatePopupPosition = () => {
        if (!cardRef.current) {
            return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
        }

        const cardRect = cardRef.current.getBoundingClientRect();
        const popupWidth = 450;
        const popupHeight = Math.min(window.innerHeight * 0.7, 600);
        const padding = 20;
        const offset = 15;

        let left, top;
        const transform = 'translateY(-50%)';

        const spaceOnRight = window.innerWidth - cardRect.right;
        const spaceOnLeft = cardRect.left;

        // Calculate potential positions
        const rightPosition = cardRect.right + offset;
        const leftPosition = cardRect.left - offset - popupWidth;

        // Check if positions are valid (within screen bounds)
        const canFitOnRight = rightPosition + popupWidth <= window.innerWidth - padding;
        const canFitOnLeft = leftPosition >= padding;

        if (canFitOnRight || (spaceOnRight >= spaceOnLeft)) {
            // Show on right side
            left = rightPosition;
            // Ensure it doesn't overflow
            if (left + popupWidth > window.innerWidth - padding) {
                left = window.innerWidth - popupWidth - padding;
            }
        } else if (canFitOnLeft) {
            // Show on left side - only if it truly fits
            left = leftPosition;
        } else {
            // Not enough space on either side - center it
            left = Math.max(padding, (window.innerWidth - popupWidth) / 2);
        }

        // Vertical positioning
        top = cardRect.top + cardRect.height / 2;
        const halfHeight = popupHeight / 2;
        if (top - halfHeight < padding) {
            top = halfHeight + padding;
        } else if (top + halfHeight > window.innerHeight - padding) {
            top = window.innerHeight - halfHeight - padding;
        }

        return { top: `${top}px`, left: `${left}px`, transform };
    };

    const {
        title = "Job Title",
        company: companyData,
        location,
        type,
        salary,
        salary_text,
        salary_from,
        salary_to,
        salary_currency,
        description = "Job description...",
        responsibilities = [],
        requirements = [],
        requirement = [],
        nice_to_haves = [],
        niceToHaves = [],
        working_time,
        job_deadline,
        logo,
        isFeatured,
        is_diamond,
        is_job_flash_active,
        is_hot,
        created_at,
        createdAt
    } = job;

    const companyName = typeof companyData === 'string'
        ? companyData
        : companyData?.name || "Company Name";

    const companyLogoUrl = logo || companyData?.logo;
    const companyLogoInitial = (companyName && companyName !== "Company Name" && companyName.length > 0)
        ? companyName.charAt(0).toUpperCase()
        : "SE";

    const displaySalary = salary_text || salary ||
        (salary_from && salary_to
            ? `${salary_from} - ${salary_to} ${salary_currency || ''}`.trim()
            : salary_from
                ? `${salary_from} ${salary_currency || ''}`.trim()
                : "Salary not specified");

    const getIsJobFeatured = () => {
        const jobCreatedAt = created_at || createdAt;
        if (jobCreatedAt) {
            const createdDate = new Date(jobCreatedAt);
            const now = new Date();
            const diffTime = Math.abs(now - createdDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays < 7) return true;
        }
        if (isFeatured !== undefined) return isFeatured;
        return is_diamond || is_job_flash_active || is_hot || false;
    };

    const isJobFeatured = getIsJobFeatured();

    const handleCardClick = (e) => {
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('[role="button"]')) return;
        onClick?.(job);
    };


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
                    minHeight: '140px',
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
                                bgcolor: 'primary.main',
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
                            <Box
                                sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                                {...(showPopup && {
                                    onMouseEnter: () => {
                                        if (hoverTimeout) clearTimeout(hoverTimeout);
                                        const timeout = setTimeout(() => {
                                            const position = calculatePopupPosition();
                                            setPopupPosition(position);
                                            setIsHovered(true);
                                        }, 600);
                                        setHoverTimeout(timeout);
                                    },
                                    onMouseLeave: () => {
                                        if (hoverTimeout) clearTimeout(hoverTimeout);
                                        const timeout = setTimeout(() => {
                                            setIsHovered(false);
                                        }, 200);
                                        setHoverTimeout(timeout);
                                    }
                                })}
                            >
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontWeight: 600,
                                        mb: 0.25,
                                        fontSize: '0.95rem',
                                        wordWrap: 'break-word',
                                        overflowWrap: 'break-word',
                                        pr: isJobFeatured ? 10 : 0,
                                        lineHeight: 1.3,
                                        cursor: showPopup ? 'pointer' : 'default',
                                        position: 'relative',
                                        color: 'text.primary',
                                        transition: 'all 0.2s ease-in-out',
                                        ...(showPopup && {
                                            '&:hover': {
                                                color: 'primary.main'
                                            }
                                        })
                                    }}
                                >
                                    {title}
                                </Typography>
                                {/* <InfoOutlined
                                    sx={{
                                        fontSize: '1rem',
                                        color: 'text.secondary',
                                        opacity: 0.6,
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            opacity: 1,
                                            color: 'primary.main'
                                        }
                                    }}
                                /> */}
                            </Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 0.75, fontSize: '0.875rem', lineHeight: 1.2 }}
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

            {showPopup && isHovered && (
                <Portal>
                    <Paper
                        onMouseEnter={() => {
                            if (hoverTimeout) clearTimeout(hoverTimeout);
                            setIsHovered(true);
                        }}
                        onMouseLeave={() => {
                            setIsHovered(false);
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

                        {(responsibilities && responsibilities.length > 0) && (
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

                        {((requirements && requirements.length > 0) || (requirement && requirement.length > 0)) && (
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

                        {((nice_to_haves && nice_to_haves.length > 0) || (niceToHaves && niceToHaves.length > 0)) && (
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
                                    <strong>Hạn nộp hồ sơ:</strong> {new Date(job_deadline).toLocaleDateString('vi-VN')}
                                </Typography>
                            </>
                        )}

                        <Box sx={{ position: 'sticky', bottom: 0, mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => onClick?.(job)}
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
