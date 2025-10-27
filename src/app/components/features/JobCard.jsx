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
    showActions = false //set when user login or not
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
            className="h-full w-full flex flex-col relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 border border-gray-100"
            sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                minHeight: '280px',
                minWidth: '260px',
                maxWidth: '100%',
                '&:hover': {
                    transform: 'translateY(-1px)',
                    transition: 'transform 0.2s ease-in-out'
                }
            }}
        >
            {isFeatured && (
                <Chip
                    label="Featured"
                    color="primary"
                    size="small"
                    className="absolute top-4 right-4 z-10 bg-blue-600 text-white"
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        zIndex: 1
                    }}
                />
            )}

            <CardContent
                className="flex-grow p-4"
                sx={{ flexGrow: 1, p: 2 }}
            >
                <Box
                    className="flex items-start mb-3"
                    sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}
                >
                    <Avatar
                        className="w-12 h-12 mr-3 bg-blue-600 text-white font-bold"
                        sx={{
                            bgcolor: 'primary.main',
                            width: 48,
                            height: 48,
                            mr: 1.5,
                            fontSize: '1.2rem',
                            fontWeight: 'bold'
                        }}
                    >
                        {logo}
                    </Avatar>

                    <Box
                        className="flex-grow min-w-0"
                        sx={{ flexGrow: 1, minWidth: 0 }}
                    >
                        <Typography
                            variant="h6"
                            className="font-semibold mb-1 text-gray-900 text-lg leading-tight"
                            sx={{ fontWeight: 600, mb: 0.5, fontSize: '1.1rem' }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            className="text-gray-600 mb-2 text-sm"
                            sx={{ mb: 1, fontSize: '0.875rem' }}
                        >
                            {company} • {location}
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={1}
                            className="mb-3 flex-wrap gap-1"
                            sx={{ mb: 1.5 }}
                        >
                            <Badge label={type} color="secondary" size="small" />
                            <Badge label={salary} color="success" size="small" />
                        </Stack>
                    </Box>
                </Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    className="text-gray-600 mb-4 text-sm leading-relaxed"
                    sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontSize: '0.875rem',
                        lineHeight: 1.4
                    }}
                >
                    {description}
                </Typography>

                {tags.length > 0 && (
                    <Stack
                        direction="row"
                        spacing={0.5}
                        className="mb-4 flex-wrap gap-1"
                        sx={{ mb: 2, flexWrap: 'wrap' }}
                    >
                        {tags.slice(0, 3).map((tag, index) => (
                            <Badge
                                key={index}
                                label={tag}
                                variant="outlined"
                                size="small"
                                className="text-xs px-2 py-1 bg-gray-50 text-gray-600 border-gray-200"
                            />
                        ))}
                        {tags.length > 3 && (
                            <Badge
                                label={`+${tags.length - 3}`}
                                variant="outlined"
                                size="small"
                                className="text-xs px-2 py-1 bg-gray-50 text-gray-600 border-gray-200"
                            />
                        )}
                    </Stack>
                )}

                <Box
                    className="flex items-center justify-between mt-auto"
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                    <Box className="w-full">
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            className="text-gray-500 text-xs mb-2"
                            sx={{ fontSize: '0.75rem' }}
                        >
                            {applied} applied of {capacity} capacity
                        </Typography>
                        <Box
                            className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden"
                            sx={{
                                width: '100%',
                                height: 4,
                                bgcolor: 'grey.200',
                                borderRadius: 2,
                                overflow: 'hidden'
                            }}
                        >
                            <Box
                                className={`h-full rounded-full transition-all duration-300 ${appliedPercentage > 80 ? 'bg-red-500' : 'bg-blue-500'
                                    }`}
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
    );
}
