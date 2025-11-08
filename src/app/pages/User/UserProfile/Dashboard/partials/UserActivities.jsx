import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { Description as DescriptionIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import ActivityCard from './ActivityCard';

/**
 * UserActivities Component
 * Displays user activity statistics in card format
 * 
 * @param {Object} props
 * @param {Object} props.stats - Statistics data containing totalJobs, savedJobs, invitations
 */
export default function UserActivities({ stats }) {
    const { t } = useTranslation();
    // Activity cards configuration
    const activities = [
        {
            title: t('activities.applied'),
            value: stats.totalJobs || 0,
            bgColor: '#E8F4FD',
            textColor: '#2196F3',
            icon: <DescriptionIcon sx={{ fontSize: 64, color: '#2196F3' }} />,
            navigateTo: '/profile/my-jobs',
        },
        {
            title: t('activities.saved'),
            value: stats.savedJobs || 0,
            bgColor: '#FFEBEE',
            textColor: '#F44336',
            icon: (
                <svg width="64" height="64" viewBox="0 0 24 24" fill="#F44336">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            ),
            navigateTo: '/profile/my-jobs',
        },
        {
            title: t('activities.invitations'),
            value: stats.invitations || 0,
            bgColor: '#E8F5E9',
            textColor: '#4CAF50',
            icon: (
                <svg width="64" height="64" viewBox="0 0 24 24" fill="#4CAF50">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
            ),
            navigateTo: '/profile/job-invitation',
        },
    ];

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                mb: 3,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                {t('userActivities.title')}
            </Typography>
            <Grid container spacing={3} alignItems="stretch">
                {activities.map((activity, index) => (
                    <ActivityCard
                        key={index}
                        title={activity.title}
                        value={activity.value}
                        bgColor={activity.bgColor}
                        textColor={activity.textColor}
                        icon={activity.icon}
                        navigateTo={activity.navigateTo}
                    />
                ))}
            </Grid>
        </Paper>
    );
}

