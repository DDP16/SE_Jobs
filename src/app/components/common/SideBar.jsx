import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Badge, Typography, Avatar } from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Description as DescriptionIcon,
    Person as PersonIcon,
    Work as WorkIcon,
    Mail as MailIcon,
    Notifications as NotificationsIcon,
    Settings as SettingsIcon,
    Inbox as InboxIcon,
    WavingHand as WavingHandIcon,
    PowerSettingsNew as LogoutIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ProfileSidebar({ user }) {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { icon: <DashboardIcon />, text: 'Dashboard', path: '/profile/dashboard', color: 'error' },
        { icon: <DescriptionIcon />, text: 'CV Attachment', path: '/profile/cv-attachment' },
        { icon: <PersonIcon />, text: 'Profile', path: '/profile/itviec-profile' },
        { icon: <WorkIcon />, text: 'My Jobs', path: '/profile/my-jobs' },
        { icon: <InboxIcon />, text: 'Job Invitation', path: '/profile/job-invitation', badge: 0 },
        { icon: <MailIcon />, text: 'Email Subscriptions', path: '/profile/email-subscriptions' },
        { icon: <NotificationsIcon />, text: 'Notifications', path: '/profile/notifications' },
        { icon: <SettingsIcon />, text: 'Settings', path: '/profile/settings' },
    ];

    const handleNavigation = (path) => {
        navigate(path);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <Box
            sx={{
                width: 280,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                height: 'fit-content',
                position: 'sticky',
                top: 20,
            }}
        >
            {/* Welcome Section */}
            <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <WavingHandIcon sx={{ fontSize: 20, color: 'warning.main' }} />
                    <Typography variant="body2" color="text.secondary">
                        Welcome
                    </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {user?.name || 'User'}
                </Typography>
            </Box>

            {/* Menu Items */}
            <List sx={{ py: 1 }}>
                {menuItems.map((item, index) => (
                    <ListItemButton
                        key={index}
                        onClick={() => handleNavigation(item.path)}
                        sx={{
                            px: 3,
                            py: 1.5,
                            borderLeft: isActive(item.path) ? '3px solid' : '3px solid transparent',
                            borderColor: isActive(item.path) ? 'error.main' : 'transparent',
                            bgcolor: isActive(item.path) ? 'rgba(244, 67, 54, 0.08)' : 'transparent',
                            '&:hover': {
                                bgcolor: isActive(item.path) ? 'rgba(244, 67, 54, 0.12)' : 'action.hover',
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 40,
                                color: isActive(item.path)
                                    ? item.color === 'error' ? 'error.main' : 'text.primary'
                                    : 'text.secondary',
                            }}
                        >
                            {item.badge !== undefined ? (
                                <Badge badgeContent={item.badge} color="primary">
                                    {item.icon}
                                </Badge>
                            ) : (
                                item.icon
                            )}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.text}
                            primaryTypographyProps={{
                                fontSize: '0.9rem',
                                fontWeight: isActive(item.path) ? 600 : 400,
                                color: isActive(item.path) ? 'text.primary' : 'text.secondary',
                            }}
                        />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
}

// Keep the old component for backward compatibility
export function DefaultSidebar() {
    return <ProfileSidebar user={{ name: 'Sang Trinh' }} />;
}