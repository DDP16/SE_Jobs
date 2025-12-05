import React from 'react';
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
    IconButton,
    CircularProgress,
    Alert
} from '@mui/material';
import {
    ArrowForward as ArrowForwardIcon,
    Edit as EditIcon,
    Email as EmailIcon,
    Phone as PhoneIcon
} from '@mui/icons-material';
import { JobCard } from '../../../../components';
import { mockRecentApplications, mockDashboardStats } from '../../../../../mocks/mockData';
import { UserActivities } from './partials';
import { useUserProfile } from '../../../../hooks/useUserProfile';

/**
 * Get user initials from full name for avatar display
 * @param {string} name - Full name of user
 * @returns {string} First 2 initials in uppercase
 */
const getInitials = (name) => {
    if (!name) return '';
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

export default function ProfileDashboard() {
    const theme = useTheme();
    const { t } = useTranslation();
    const navigate = useNavigate();
    
    // Fetch real user profile data from API
    const { profileData, isLoading, error } = useUserProfile();

    // Extract student_info from profileData
    const studentInfo = profileData?.student_info || {};

    // Map API data to component-friendly format
    const user = {
        name: `${profileData?.first_name || ''} ${profileData?.last_name || ''}`.trim() || 'User',
        email: profileData?.email || '',
        phone: profileData?.phone || '',
        avatar: studentInfo?.avatar_url || '',
    };

    // TODO: Replace with real API data later
    const stats = mockDashboardStats;
    const recentApplications = mockRecentApplications;

    // Loading State
    if (isLoading) {
        return (
            <Container maxWidth="lg" sx={{ py: 10, textAlign: 'center' }}>
                <CircularProgress />
                <Box sx={{ mt: 2 }}>Đang tải thông tin dashboard...</Box>
            </Container>
        );
    }

    // Error State
    if (error) {
        return (
            <Container maxWidth="lg" sx={{ py: 10 }}>
                <Alert severity="error">
                    Lỗi khi tải dashboard: {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
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
                                            src={user.avatar}
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
                                            onClick={() => navigate('/user/profile')}
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
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                    <EmailIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {user.email || 'Chưa cập nhật'}
                                                    </Typography>
                                                </Box>
                                                {user.phone && (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <PhoneIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                                        <Typography variant="body2" color="text.secondary">
                                                            {user.phone}
                                                        </Typography>
                                                    </Box>
                                                )}
                                                <Button
                                                    variant="text"
                                                    endIcon={<ArrowForwardIcon />}
                                                    onClick={() => navigate('/profile/user-profile')}
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

