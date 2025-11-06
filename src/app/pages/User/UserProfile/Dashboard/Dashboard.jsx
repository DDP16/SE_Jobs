import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Avatar,
    Button,
    Paper,
    LinearProgress,
    IconButton,
    Link,
    Stack,
    Chip
} from '@mui/material';
import {
    Edit as EditIcon,
    Email as EmailIcon,
    Description as DescriptionIcon,
    CheckCircle as CheckCircleIcon,
    ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import ProfileSidebar from '../../../../components/common/SideBar';

export default function ProfileDashboard() {
    const [user, setUser] = useState({
        name: 'Sang Trinh',
        email: 'trinhquangsang0220@gmail.com',
        title: '',
        profileCompletion: 5,
        cvFileName: 'TrinhQuangSang_DevCV.pdf',
        cvUploadDate: '31/10/2025'
    });

    const handleUpdateProfile = () => {
        console.log('Update profile clicked');
        // Navigate to profile edit page
    };

    const handleManageCV = () => {
        console.log('Manage CV clicked');
        // Navigate to CV management page
    };

    const handleCompleteProfile = () => {
        console.log('Complete profile clicked');
        // Navigate to profile completion page
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
                    {/* Sidebar */}
                    <ProfileSidebar user={user} />

                    {/* Main Content */}
                    <Box sx={{ flex: 1, maxWidth: 900 }}>
                        {/* User Profile Card */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                mb: 3,
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                                <Avatar
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        bgcolor: 'primary.main',
                                        fontSize: '2rem',
                                        fontWeight: 600,
                                    }}
                                >
                                    {getInitials(user.name)}
                                </Avatar>

                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                                        {user.name}
                                    </Typography>

                                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                                        <Chip
                                            icon={<EditIcon sx={{ fontSize: 16 }} />}
                                            label="Update your title"
                                            size="small"
                                            variant="outlined"
                                            clickable
                                            sx={{
                                                borderColor: 'divider',
                                                color: 'text.secondary',
                                                '&:hover': {
                                                    borderColor: 'primary.main',
                                                    color: 'primary.main',
                                                }
                                            }}
                                        />
                                    </Stack>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        <EmailIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {user.email}
                                        </Typography>
                                    </Box>

                                    <Button
                                        variant="text"
                                        endIcon={<ArrowForwardIcon />}
                                        onClick={handleUpdateProfile}
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            color: 'primary.main',
                                            px: 0,
                                            '&:hover': {
                                                bgcolor: 'transparent',
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >
                                        Update your profile
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>

                        {/* CV Attachment Card */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                mb: 3,
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                                Your Attached CV
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    p: 3,
                                    bgcolor: 'grey.50',
                                    borderRadius: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 1,
                                        bgcolor: 'error.main',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                    }}
                                >
                                    <DescriptionIcon />
                                </Box>

                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                        {user.cvFileName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Last uploaded: {user.cvUploadDate}
                                    </Typography>
                                </Box>

                                <Button
                                    variant="text"
                                    endIcon={<ArrowForwardIcon />}
                                    onClick={handleManageCV}
                                    sx={{
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        color: 'primary.main',
                                        '&:hover': {
                                            bgcolor: 'transparent',
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    Manage CV attachment
                                </Button>
                            </Box>
                        </Paper>

                        {/* ITviec Profile Card */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                                ITviec Profile
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                                {/* Circular Progress */}
                                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                    <Box
                                        sx={{
                                            width: 160,
                                            height: 160,
                                            borderRadius: '50%',
                                            border: '12px solid',
                                            borderColor: 'grey.200',
                                            position: 'relative',
                                            '&::before': {
                                                content: '""',
                                                position: 'absolute',
                                                top: -12,
                                                left: -12,
                                                right: -12,
                                                bottom: -12,
                                                borderRadius: '50%',
                                                border: '12px solid',
                                                borderColor: 'transparent',
                                                borderTopColor: 'error.main',
                                                transform: 'rotate(-90deg)',
                                                clipPath: `polygon(0 0, 50% 0, 50% 50%, ${50 + user.profileCompletion * 0.5}% 50%, ${50 + user.profileCompletion * 0.5}% 100%, 0 100%)`,
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <Typography variant="h3" sx={{ fontWeight: 700, lineHeight: 1 }}>
                                                {user.profileCompletion}%
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                completed
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Profile Info */}
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                                        Reach <Box component="span" sx={{ fontWeight: 700, color: 'error.main' }}>70%</Box> of your profile to start
                                        generating your IT professional CV.
                                    </Typography>
                                    <Button
                                        variant="text"
                                        endIcon={<ArrowForwardIcon />}
                                        onClick={handleCompleteProfile}
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            color: 'primary.main',
                                            px: 0,
                                            '&:hover': {
                                                bgcolor: 'transparent',
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >
                                        Complete your profile
                                    </Button>
                                </Box>

                                {/* CV Templates Preview */}
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Box
                                        component="img"
                                        src="https://placehold.co/120x160/f5f5f5/666?text=CV+1"
                                        alt="CV Template 1"
                                        sx={{
                                            width: 120,
                                            height: 160,
                                            borderRadius: 1,
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <Box
                                        component="img"
                                        src="https://placehold.co/120x160/2c2c2c/fff?text=CV+2"
                                        alt="CV Template 2"
                                        sx={{
                                            width: 120,
                                            height: 160,
                                            borderRadius: 1,
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>

                                {/* Explore Templates Button */}
                                <Box sx={{ textAlign: 'center', alignSelf: 'center' }}>
                                    <IconButton
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            border: '2px solid',
                                            borderColor: 'error.main',
                                            color: 'error.main',
                                            '&:hover': {
                                                bgcolor: 'error.main',
                                                color: 'white',
                                            },
                                        }}
                                    >
                                        <ArrowForwardIcon />
                                    </IconButton>
                                    <Typography
                                        variant="caption"
                                        color="error.main"
                                        sx={{ display: 'block', mt: 1, fontWeight: 600 }}
                                    >
                                        Explore CV<br />templates
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

