import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Tabs,
    Tab,
    Badge,
    Button,
    Paper,
    Stack,
    useTheme
} from '@mui/material';
import {
    WorkOutline as WorkOutlineIcon,
    InfoOutlined as InfoIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ProfileSidebar, JobCard } from '../../../../components';
import { mockJobs } from '../../../../../mocks/mockData';

// Tab panel component
function TabPanel({ children, value, index, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`jobs-tabpanel-${index}`}
            aria-labelledby={`jobs-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
        </div>
    );
}

// Empty state component
function EmptyState({ message, onExplore }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8,
                px: 2,
                minHeight: 400,
            }}
        >
            <Box
                sx={{
                    width: 120,
                    height: 120,
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'grey.400',
                }}
            >
                <WorkOutlineIcon sx={{ fontSize: 120, opacity: 0.5 }} />
            </Box>
            <Typography
                variant="h6"
                sx={{
                    mb: 3,
                    color: 'text.secondary',
                    textAlign: 'center',
                    fontWeight: 500,
                }}
            >
                {message}
            </Typography>
            {onExplore && (
                <Button
                    variant="outlined"
                    onClick={onExplore}
                    sx={{
                        borderColor: 'primary',
                        color: 'primary',
                        textTransform: 'none',
                        px: 4,
                        py: 1,
                        '&:hover': {
                            borderColor: 'primary.dark',
                            bgcolor: 'primary.light',
                            color: 'primary.dark',
                        },
                    }}
                >
                    Explore jobs
                </Button>
            )}
        </Box>
    );
}

export default function MyJobs() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);

    // Mock data - replace with actual API calls
    const [appliedJobs] = useState([]); // Mock: []
    const [savedJobs] = useState([]); // Mock: []
    const [recentViewedJobs] = useState([mockJobs[0]]); // Mock: [mockJobs[0]]
    const [invitedJobs] = useState([]); // Mock: []

    // Calculate job counts from arrays
    const jobCounts = {
        applied: appliedJobs.length,
        saved: savedJobs.length,
        recentView: recentViewedJobs.length,
        invited: invitedJobs.length,
    };

    // Get jobs for current tab
    const getCurrentTabJobs = () => {
        switch (activeTab) {
            case 0:
                return appliedJobs;
            case 1:
                return savedJobs;
            case 2:
                return recentViewedJobs;
            case 3:
                return invitedJobs;
            default:
                return [];
        }
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleExploreJobs = () => {
        navigate('/jobs');
    };

    const handleJobClick = (job) => {
        navigate(`/job?id=${job.id}`);
    };

    const handleBookmark = (job) => {
        // TODO: Implement bookmark functionality
    };

    const handleShare = (job) => {
        // TODO: Implement share functionality
    };

    const handleApply = (job) => {
        // TODO: Implement apply functionality
    };

    // Get empty state messages for each tab
    const getEmptyMessage = (tabIndex) => {
        const messages = {
            0: "You haven't applied to any jobs in the last 12 months.",
            1: "You haven't saved any jobs yet.",
            2: "You haven't viewed any jobs recently.",
            3: "You haven't received any job invitations yet.",
        };
        return messages[tabIndex] || "No data available.";
    };

    // Render job list or empty state
    const renderTabContent = (tabIndex) => {
        const jobs = getCurrentTabJobs();

        if (jobs.length === 0) {
            return (
                <EmptyState
                    message={getEmptyMessage(tabIndex)}
                    onExplore={handleExploreJobs}
                />
            );
        }

        return (
            <Box sx={{ p: 3 }}>
                <Stack spacing={2}>
                    {jobs.map((job) => (
                        <JobCard
                            key={job.id}
                            job={job}
                            variant="list"
                            showDescription={true}
                            showApplyButton={tabIndex === 0 ? false : true}
                            showActions={true}
                            isBookmarked={tabIndex === 1}
                            onBookmark={handleBookmark}
                            onShare={handleShare}
                            onApply={handleApply}
                        />
                    ))}
                </Stack>
            </Box>
        );
    };

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 2 }}>
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                    {/* Sidebar */}
                    <ProfileSidebar user={{ name: 'User' }} />

                    {/* Main Content */}
                    <Box sx={{ flex: 1, maxWidth: 900 }}>
                        {/* Tabs */}
                        <Paper
                            elevation={0}
                            sx={{
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                mb: 1.5,
                            }}
                        >
                            {/* Title */}
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    mb: 1.5,
                                    color: 'text.primary',
                                    paddingTop: 3,
                                    paddingLeft: 3,
                                }}
                            >
                                My Jobs
                            </Typography>
                            <Tabs
                                value={activeTab}
                                onChange={handleTabChange}
                                sx={{
                                    borderBottom: '1px solid',
                                    borderColor: 'divider',
                                    '& .MuiTab-root': {
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        fontSize: '0.95rem',
                                        minHeight: 56,
                                        px: 2.5,
                                    },
                                    '& .Mui-selected': {
                                        color: 'primary',
                                        fontWeight: 600,
                                    },
                                    '& .MuiTabs-indicator': {
                                        backgroundColor: 'primary',
                                        height: 3,
                                    },
                                }}
                            >
                                <Tab
                                    label={
                                        <Badge
                                            badgeContent={jobCounts.applied}
                                            color="primary"
                                            sx={{
                                                '& .MuiBadge-badge': {
                                                    bgcolor: activeTab === 0 ? 'primary' : 'grey.400',
                                                    color: 'white',
                                                    minWidth: 20,
                                                    height: 20,
                                                    fontSize: '0.75rem',
                                                },
                                            }}
                                        >
                                            <Box component="span" sx={{ px: 1 }}>
                                                Applied Jobs
                                            </Box>
                                        </Badge>
                                    }
                                />
                                <Tab
                                    label={
                                        <Badge
                                            badgeContent={jobCounts.saved}
                                            color="primary"
                                            sx={{
                                                '& .MuiBadge-badge': {
                                                    bgcolor: activeTab === 1 ? 'primary' : 'grey.400',
                                                    color: 'white',
                                                    minWidth: 20,
                                                    height: 20,
                                                    fontSize: '0.75rem',
                                                },
                                            }}
                                        >
                                            <Box component="span" sx={{ px: 1 }}>
                                                Saved Jobs
                                            </Box>
                                        </Badge>
                                    }
                                />
                                <Tab
                                    label={
                                        <Badge
                                            badgeContent={jobCounts.recentView}
                                            color="primary"
                                            sx={{
                                                '& .MuiBadge-badge': {
                                                    bgcolor: activeTab === 2 ? 'primary' : 'grey.400',
                                                    color: 'white',
                                                    minWidth: 20,
                                                    height: 20,
                                                    fontSize: '0.75rem',
                                                },
                                            }}
                                        >
                                            <Box component="span" sx={{ px: 1 }}>
                                                Recent Jobs Viewed
                                            </Box>
                                        </Badge>
                                    }
                                />
                                <Tab
                                    label={
                                        <Badge
                                            badgeContent={jobCounts.invited}
                                            color="primary"
                                            sx={{
                                                '& .MuiBadge-badge': {
                                                    bgcolor: activeTab === 3 ? 'primary' : 'grey.400',
                                                    color: 'white',
                                                    minWidth: 20,
                                                    height: 20,
                                                    fontSize: '0.75rem',
                                                },
                                            }}
                                        >
                                            <Box component="span" sx={{ px: 1 }}>
                                                Invited Jobs
                                            </Box>
                                        </Badge>
                                    }
                                />
                            </Tabs>
                        </Paper>

                        {/* Info Message (only for Applied Jobs tab) */}
                        {activeTab === 0 && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    p: 1.5,
                                    mb: 1.5,
                                    bgcolor: 'grey.50',
                                    borderRadius: 1,
                                }}
                            >
                                <InfoIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Your applied jobs are stored for the last 12 months.
                                </Typography>
                            </Box>
                        )}

                        {/* Tab Content */}
                        <Paper
                            elevation={0}
                            sx={{
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                bgcolor: 'background.paper',
                                minHeight: 400,
                            }}
                        >
                            <TabPanel value={activeTab} index={0}>
                                {renderTabContent(0)}
                            </TabPanel>

                            <TabPanel value={activeTab} index={1}>
                                {renderTabContent(1)}
                            </TabPanel>

                            <TabPanel value={activeTab} index={2}>
                                {renderTabContent(2)}
                            </TabPanel>

                            <TabPanel value={activeTab} index={3}>
                                {renderTabContent(3)}
                            </TabPanel>
                        </Paper>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

