import React from 'react';
import {
    Box,
    Typography,
    Avatar,
    Chip,
    Card,
    CardContent,
    IconButton,
    Stack
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
    isBookmarked = false,
    showActions = true
}) {
    const {
        id,
        title = "Job Title",
        company = "Company Name",
        location = "Location",
        type = "Full-time",
        salary = "€2,000 - €3,000",
        description = "Job description...",
        tags = [],
        logo = "C",
        isFeatured = false,
        applied = 0,
        capacity = 10
    } = job;

    const appliedPercentage = (applied / capacity) * 100;

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    transition: 'transform 0.2s ease-in-out'
                }
            }}
        >
            {isFeatured && (
                <Chip
                    label="Featured"
                    color="primary"
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        zIndex: 1
                    }}
                />
            )}

            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Avatar
                        sx={{
                            bgcolor: 'primary.main',
                            width: 48,
                            height: 48,
                            mr: 2,
                            fontSize: '1.2rem',
                            fontWeight: 'bold'
                        }}
                    >
                        {logo}
                    </Avatar>

                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {company} • {location}
                        </Typography>

                        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                            <Badge label={type} color="secondary" size="small" />
                            <Badge label={salary} color="success" size="small" />
                        </Stack>
                    </Box>
                </Box>

                <Typography
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
                </Typography>

                {tags.length > 0 && (
                    <Stack direction="row" spacing={0.5} sx={{ mb: 2, flexWrap: 'wrap' }}>
                        {tags.slice(0, 3).map((tag, index) => (
                            <Badge
                                key={index}
                                label={tag}
                                variant="outlined"
                                size="small"
                            />
                        ))}
                        {tags.length > 3 && (
                            <Badge
                                label={`+${tags.length - 3}`}
                                variant="outlined"
                                size="small"
                            />
                        )}
                    </Stack>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant="caption" color="text.secondary">
                            {applied} applied of {capacity} capacity
                        </Typography>
                        <Box
                            sx={{
                                width: '100%',
                                height: 4,
                                bgcolor: 'grey.200',
                                borderRadius: 2,
                                mt: 0.5,
                                overflow: 'hidden'
                            }}
                        >
                            <Box
                                sx={{
                                    width: `${appliedPercentage}%`,
                                    height: '100%',
                                    bgcolor: appliedPercentage > 80 ? 'error.main' : 'primary.main',
                                    transition: 'width 0.3s ease'
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </CardContent>

            {showActions && (
                <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => onApply?.(job)}
                    >
                        Apply Now
                    </Button>

                    <Box>
                        <IconButton
                            size="small"
                            onClick={() => onBookmark?.(job)}
                            color={isBookmarked ? 'primary' : 'default'}
                        >
                            {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
                        </IconButton>
                        <IconButton size="small" onClick={() => onShare?.(job)}>
                            <Share />
                        </IconButton>
                        <IconButton size="small">
                            <MoreVert />
                        </IconButton>
                    </Box>
                </Box>
            )}
        </Card>
    );
}
