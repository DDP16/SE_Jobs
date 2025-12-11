import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Avatar,
    Button,
    Paper,
    Stack,
    Chip,
    Grid,
    useTheme,
    IconButton
} from '@mui/material';
import {
    Description as DescriptionIcon,
    ArrowForward as ArrowForwardIcon,
    Person as PersonIcon,
    Edit as EditIcon,
    Email as EmailIcon,
    Phone as PhoneIcon
} from '@mui/icons-material';
import { ProfileSidebar, JobCard } from '../../../../components';
import { mockRecentApplications, mockDashboardStats } from '../../../../../mocks/mockData';
import { UserActivities } from './partials';
import { useSelector } from 'react-redux';

// Helper function to get initials from name
const getInitials = (name) => {
    if (!name) return '';
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2); // Get first 2 initials
};

export default function ProfileDashboard() {
    const currentUser = useSelector((state) => state.auth.user);
    const theme = useTheme();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [user] = useState({
        name: currentUser?.name || 'User',
    });

    // Use mock data
    const stats = mockDashboardStats;
    const recentApplications = mockRecentApplications;

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh'}}>
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>

                    {/* Main Content */}
                    <Box sx={{ flex: 1, maxWidth: 900 }}>
                        {/* User Profile Card */}
                        <Grid item xs={12} paddingBottom={2}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    borderRadius: 2,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                                    <Box sx={{ position: 'relative' }}>
                                        <Avatar
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                bgcolor: '#7c4dff',
                                                fontSize: '2rem',
                                                fontWeight: 600,
                                            }}
                                        >
                                            {getInitials(user.name)}
                                        </Avatar>
                                        <IconButton
                                            size="small"
                                            sx={{
                                                position: 'absolute',
                                                bottom: -4,
                                                right: -4,
                                                bgcolor: 'white',
                                                border: '2px solid',
                                                borderColor: 'divider',
                                                width: 28,
                                                height: 28,
                                                '&:hover': {
                                                    bgcolor: 'grey.100',
                                                },
                                            }}
                                        >
                                            <EditIcon sx={{ fontSize: 14 }} />
                                        </IconButton>
                                    </Box>

                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                            <Box>
                                                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                                                    {user.name}
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <EmailIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {currentUser?.email || 'No email provided'}
                                                    </Typography>
                                                </Box>
                                                <Button
                                                    variant="text"
                                                    endIcon={<ArrowForwardIcon />}
                                                    sx={{
                                                        textTransform: 'none',
                                                        fontWeight: 600,
                                                        fontSize: '0.95rem',
                                                        color: theme.palette.primary.main,
                                                        px: 0,
                                                        mt: 3,
                                                        justifyContent: 'flex-start',
                                                        '&:hover': {
                                                            bgcolor: 'transparent',
                                                        },
                                                    }}
                                                >
                                                    {t('profile.updateProfile')}
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>

                        {/* User Activities Section */}
                        <UserActivities stats={stats} />

                        {/* Recent Applications History */}
                        {/* Or Recommend Jobs */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                                {t('dashboard.recentApplicationsHistory')}
                            </Typography>
                            <Stack spacing={2}>
                                {recentApplications.map((application) => (
                                    <Box
                                        key={application.id}
                                        sx={{
                                            '& .MuiCard-root': {
                                                mb: 0,
                                            }
                                        }}
                                    >
                                        <JobCard
                                            job={application}
                                            variant="list"
                                            showDescription={false}
                                            showApplyButton={false}
                                            showActions={false}
                                        />
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,
                                                px: 3,
                                                py: 1.5,
                                                bgcolor: theme.palette.grey[50],
                                                borderBottomLeftRadius: 2,
                                                borderBottomRightRadius: 2,
                                                mt: -1,
                                            }}
                                        >
                                            <Box sx={{ flex: 1 }}>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {t('dashboard.dateApplied')}
                                                    </Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {application.dateApplied}
                                                </Typography>
                                            </Box>
                                            <Chip
                                                label={application.status}
                                                color={application.statusColor}
                                                variant="outlined"
                                                size="small"
                                                sx={{ minWidth: 100 }}
                                            />
                                        </Box>
                                    </Box>
                                ))}
                            </Stack>
                            <Button
                                variant="text"
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    mt: 3,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    color: theme.palette.primary.main,
                                    px: 0,
                                    '&:hover': {
                                        bgcolor: 'transparent',
                                    },
                                }}
                            >
                                {t('dashboard.viewAllApplicationsHistory')}
                            </Button>
                        </Paper>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

