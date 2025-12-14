import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

/**
 * ActivityCard Component
 * Displays an activity statistic card with navigation capability
 * 
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {number|string} props.value - Statistic value to display
 * @param {string} props.bgColor - Background color
 * @param {string} props.textColor - Text color for value
 * @param {React.ReactNode} props.icon - Icon component to display
 * @param {string} props.navigateTo - Navigation path on click
 */
export default function ActivityCard({
    title,
    value,
    bgColor,
    textColor,
    icon,
    navigateTo
}) {
    const navigate = useNavigate();

    return (
        <Grid sx={{ display: 'flex', flexBasis: 0, flexGrow: 1, minWidth: 0 }}>
            <Box
                onClick={() => navigateTo && navigate(navigateTo)}
                sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: bgColor,
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    width: '100%',
                    cursor: navigateTo ? 'pointer' : 'default',
                    transition: 'all 0.3s ease',
                    '&:hover': navigateTo ? {
                        transform: 'translateY(-4px)',
                        boxShadow: `0 4px 12px ${textColor}33`,
                    } : {},
                }}
            >
                <Typography variant="body2" sx={{ mb: 2, color: 'text.primary' }}>
                    {title}
                </Typography>
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-start' }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: textColor }}>
                        {value}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        right: 16,
                        bottom: 16,
                        opacity: 0.3,
                    }}
                >
                    {icon}
                </Box>
            </Box>
        </Grid>
    );
}

