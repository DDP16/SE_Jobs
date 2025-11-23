import React, { useState } from 'react';
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
import {
    BookmarkBorder,
    Bookmark,
    Share,
    MoreVert
} from '@mui/icons-material';
import Badge from '../common/Badge';
import Button from '../common/Button';

export default function JobCard({
    job = {},
    onBookmark,
    onShare,
    onApply,
    onClick,
    isBookmarked = false,
    showActions = false,
    variant = "card",
    showDescription = false,
    showApplyButton = true
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [hoverTimeout, setHoverTimeout] = useState(null);

    // Extract data with support for both old and new API formats
    const {
        id,
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
        job_deadline_at,
        categories = [],
        logo,
        isFeatured,
        is_diamond,
        is_job_flash_active,
        is_hot,
        created_at,
        createdAt,
        applied = 0,
        capacity = 10
    } = job;

    // Handle nested company object (new API format)
    const companyName = typeof companyData === 'string'
        ? companyData
        : companyData?.name || "Company Name";

    // Get logo URL or use first letter of company name
    const companyLogoUrl = logo || companyData?.logo;
    const companyLogoInitial = (companyName && companyName !== "Company Name" && companyName.length > 0)
        ? companyName.charAt(0).toUpperCase()
        : "C";

    // Handle salary (new API format)
    const displaySalary = salary_text || salary ||
        (salary_from && salary_to
            ? `${salary_from} - ${salary_to} ${salary_currency || ''}`.trim()
            : salary_from
                ? `${salary_from} ${salary_currency || ''}`.trim()
                : "Salary not specified");

    // Handle featured status: check if job was created within last 7 days
    const getIsJobFeatured = () => {
        // First check if created_at exists and calculate days difference
        const jobCreatedAt = created_at || createdAt;
        if (jobCreatedAt) {
            const createdDate = new Date(jobCreatedAt);
            const now = new Date();
            const diffTime = Math.abs(now - createdDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays < 7) {
                return true;
            }
        }

        // Fallback to old logic if no created_at
        if (isFeatured !== undefined) {
            return isFeatured;
        }
        return is_diamond || is_job_flash_active || is_hot || false;
    };

    const isJobFeatured = getIsJobFeatured();

    const handleCardClick = (e) => {
        // Don't trigger card click if clicking on buttons or interactive elements
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('[role="button"]')) {
            return;
        }
        onClick?.(job);
    };

    if (variant === "list") {
        return (
            <Card
                onClick={handleCardClick}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    p: 3,
                    mb: 2,
                    borderRadius: '12px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.2s ease-in-out',
                    cursor: onClick ? 'pointer' : 'default',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        transform: 'translateY(-1px)'
                    }
                }}
            >
                {/* Company Logo */}
                <Avatar
                    src={companyLogoUrl}
                    sx={{
                        width: 60,
                        height: 60,
                        mr: 3,
                        bgcolor: 'primary.main',
                        color: 'white',
                        fontSize: '1.5rem',
                        fontWeight: 600
                    }}
                >
                    {companyLogoInitial}
                </Avatar>

                {/* Job Info */}
                <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                        <Box>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 600,
                                    mb: 0.5,
                                    fontSize: '0.95rem',
                                    wordWrap: 'break-word',
                                    overflowWrap: 'break-word'
                                }}
                            >
                                {title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                                {companyName}{location ? ` • ${location}` : ''}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                                {location ? ` • ${location}` : ''}
                            </Typography>
                        </Box>
                        <Stack direction="row" spacing={1}>
                            {type && <Chip label={type} size="small" variant="outlined" />}
                            {isJobFeatured && (
                                <Chip
                                    label="Featured"
                                    size="small"
                                    color="warning"
                                    sx={{
                                        bgcolor: 'warning.main',
                                        color: 'white',
                                        fontWeight: 600,
                                        fontSize: '0.75rem',
                                        height: '24px'
                                    }}
                                />
                            )}
                        </Stack>
                    </Stack>

                    {showDescription && (
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                            {description.length > 150 ? `${description.substring(0, 150)}...` : description}
                        </Typography>
                    )}

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {displayCategories.slice(0, 3).map((tag, index) => (
                                <Chip key={`category-${tag}-${index}`} label={tag} size="small" variant="outlined" />
                            ))}
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            {showActions && (
                                <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                                    {displaySalary}
                                </Typography>
                            )}
                            {showApplyButton && (
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => onApply?.(job)}
                                    sx={{ textTransform: 'none' }}
                                >
                                    Apply Now
                                </Button>
                            )}
                        </Stack>
                    </Stack>
                </Box>
            </Card>
        );
    }

    return (
        <Box sx={{ position: 'relative' }}>
            <Card
                className="h-full w-full flex flex-col relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 border border-gray-100"
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
                {/* Featured badge ở góc trên bên phải */}
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

                <CardContent
                    className="grow p-4"
                    sx={{ flexGrow: 1, p: 1.25 }}
                >
                    <Box
                        className="flex items-start"
                        sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}
                    >
                        {/* Avatar bên trái */}
                        <Avatar
                            src={companyLogoUrl}
                            className="w-12 h-12 bg-blue-600 text-white font-bold"
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

                        {/* Tất cả data bên phải */}
                        <Box
                            className="grow min-w-0"
                            sx={{ flexGrow: 1, minWidth: 0, flex: 1 }}
                        >
                            <Typography
                                variant="subtitle1"
                                className="font-semibold mb-1 text-gray-900 leading-tight"
                                onMouseEnter={() => {
                                    if (hoverTimeout) clearTimeout(hoverTimeout);
                                    setIsHovered(true);
                                }}
                                onMouseLeave={() => {
                                    const timeout = setTimeout(() => {
                                        setIsHovered(false);
                                    }, 300);
                                    setHoverTimeout(timeout);
                                }}
                                sx={{
                                    fontWeight: 600,
                                    mb: 0.25,
                                    fontSize: '0.95rem',
                                    wordWrap: 'break-word',
                                    overflowWrap: 'break-word',
                                    pr: isJobFeatured ? 10 : 0,
                                    lineHeight: 1.3,
                                    cursor: 'pointer',
                                    position: 'relative',
                                    color: 'text.primary',
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        color: 'primary.main',
                                        textDecoration: 'underline',
                                        textDecorationColor: 'primary.main',
                                        textUnderlineOffset: '3px',
                                        transform: 'translateX(2px)'
                                    }
                                }}
                            >
                                {title}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                className="text-gray-600 mb-2 text-sm"
                                sx={{ mb: 0.75, fontSize: '0.875rem', lineHeight: 1.2 }}
                            >
                                {companyName}
                            </Typography>

                            {/* Working hours và Salary badges nằm ngang */}
                            <Stack
                                direction="row"
                                spacing={0.5}
                                className="mb-2 flex-wrap gap-1"
                                sx={{ mb: 0.75, flexWrap: 'wrap', gap: 0.5 }}
                            >
                                {type && <Badge label={type} color="secondary" size="small" />}
                                <Badge label={displaySalary} color="success" size="small" />
                            </Stack>

                            {/* Location badge ở dưới cùng */}
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

                {showActions && (
                    <Box
                        className="p-4 pt-3 flex justify-between items-center border-t border-gray-100"
                        sx={{ p: 2, pt: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <Button
                            variant="outlined"
                            size="small"
                            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200 text-sm px-4 py-2"
                            sx={{
                                fontSize: '0.875rem',
                                minWidth: 'auto',
                                px: 2,
                                py: 1,
                                textTransform: 'none',
                                fontWeight: 500
                            }}
                            onClick={() => onApply?.(job)}
                        >
                            Apply Now
                        </Button>

                        <Box className="flex items-center gap-1">
                            <IconButton
                                size="small"
                                onClick={() => onBookmark?.(job)}
                                color={isBookmarked ? 'primary' : 'default'}
                                className={`transition-colors duration-200 ${isBookmarked ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'
                                    }`}
                                sx={{ padding: '6px' }}
                            >
                                {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
                            </IconButton>
                            <IconButton
                                size="small"
                                onClick={() => onShare?.(job)}
                                className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                                sx={{ padding: '6px' }}
                            >
                                <Share />
                            </IconButton>
                            <IconButton
                                size="small"
                                className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                                sx={{ padding: '6px' }}
                            >
                                <MoreVert />
                            </IconButton>
                        </Box>
                    </Box>
                )}
            </Card>

            {/* Popup hiển thị khi hover vào title */}
            {isHovered && (
                <Portal>
                    <Paper
                        onMouseEnter={() => {
                            if (hoverTimeout) clearTimeout(hoverTimeout);
                            setIsHovered(true);
                        }}
                        onMouseLeave={() => {
                            setIsHovered(false);
                        }}
                        elevation={24}
                        sx={{
                            position: 'fixed',
                            bottom: 'auto',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            p: 3,
                            zIndex: 9999,
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            minWidth: '400px',
                            maxWidth: '500px',
                            maxHeight: '80vh',
                            overflowY: 'auto',
                            boxShadow: '0 12px 48px rgba(0,0,0,0.2)',
                            animation: 'fadeIn 0.2s ease-in-out',
                            '@keyframes fadeIn': {
                                from: {
                                    opacity: 0,
                                    transform: 'translate(-50%, -45%)'
                                },
                                to: {
                                    opacity: 1,
                                    transform: 'translate(-50%, -50%)'
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

                        {/* Button details */}
                        <Box
                            sx={{
                                position: 'sticky',
                                zIndex: 15
                            }}
                        >
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
