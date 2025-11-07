import React, { useState } from 'react';
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
import ProfileSidebar from '../../../../components/common/SideBar';
import JobCard from '../../../../components/features/JobCard';
import { mockRecentApplications, mockDashboardStats } from '../../../../../mocks/mockData';
import { UserActivities } from './partials';

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
    const theme = useTheme();
    const navigate = useNavigate();
    const [user] = useState({
        name: 'Sang Trinh',
    });

    // Use mock data
    const stats = mockDashboardStats;
    const recentApplications = mockRecentApplications;

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
                    {/* Sidebar */}
                    <ProfileSidebar user={user} />

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
                                                        test@gmail.com
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
                                                    Cập nhật hồ sơ
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>

                        {/* User Activities Section */}
                        <UserActivities stats={stats} />

                        {/* Total Jobs Applied */}
                        {/* <Grid item xs={12} md={3}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        borderRadius: 2,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        height: '100%',
                                    }}
                                >
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        Total Jobs Applied
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Typography variant="h2" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                                            {stats.totalJobs}
                                        </Typography>
                                        <Box
                                            sx={{
                                                width: 64,
                                                height: 64,
                                                bgcolor: theme.palette.primary.main + '14',
                                                borderRadius: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <DescriptionIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
                                        </Box>
                                    </Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary, mt: 3 }}>
                                        Interviewed
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                                        <Typography variant="h3" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                                            {stats.interviewed}
                                        </Typography>
                                        <Box
                                            sx={{
                                                width: 56,
                                                height: 56,
                                                bgcolor: theme.palette.grey[50],
                                                borderRadius: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <PersonIcon sx={{ fontSize: 28, color: theme.palette.text.secondary }} />
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid> */}


                        {/* User Activity */}
                        {/* Recent Applications History */}
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
                                Recent Applications History
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
                                                    Date Applied
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
                                View all applications history
                            </Button>
                        </Paper>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

