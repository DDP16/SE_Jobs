import React from 'react';
import { Avatar, IconButton, Typography, Box } from '@mui/material';
import { Edit as EditIcon, Email as EmailIcon, Phone as PhoneIcon, Person as PersonIcon, LocationOn as LocationOnIcon, Link as LinkIcon } from '@mui/icons-material';

/**
 * ProfileHeader Component
 * 
 * Displays the user's profile header section with avatar, name, and contact information.
 * 
 * @param {Object} user - User object containing profile information
 * @param {Function} onEdit - Callback function when edit button is clicked
 * 
 * Props structure:
 * - user.name: Full name of the user
 * - user.email: Email address
 * - user.phone: Phone number
 * - user.dateOfBirth: Date of birth
 * - user.gender: Gender
 * - user.currentAddress: Current address
 * - user.personalLinks: Personal website/social links
 */
export default function ProfileHeader({ user, onEdit }) {
  /**
   * Generate initials from user name for avatar display
   * @param {String} name - Full name of the user
   * @returns {String} Up to 2 uppercase initials
   */
  const getInitials = (name) => {
    return name?.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2) || 'U';
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, border: '1px solid', borderColor: 'divider', mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
        {/* Avatar Section */}
        <Box sx={{ position: 'relative' }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: '2rem', fontWeight: 600 }}>
            {getInitials(user.name)}
          </Avatar>
        </Box>

        {/* User Information Section */}
        <Box sx={{ flex: 1 }}>
          {/* Name and Edit Button */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>{user.name}</Typography>
              <Typography variant="body2" color="text.secondary">Cập nhật chức danh</Typography>
            </Box>
            <IconButton 
              onClick={onEdit} 
              sx={{ 
                border: '1px solid', 
                borderColor: 'divider',
                color: 'primary.main',
                '&:hover': { bgcolor: 'primary.lighter' }
              }}
            >
              <EditIcon />
            </IconButton>
          </Box>

          {/* Contact Information Grid - All fields have fallback "Chưa cập nhật" if empty */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {/* Email */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
              <Typography variant="body2" color="text.secondary">{user.email || 'Chưa cập nhật'}</Typography>
            </Box>
            {/* Phone */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
              <Typography variant="body2" color="text.secondary">{user.phone || 'Chưa cập nhật'}</Typography>
            </Box>
            {/* Date of Birth */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
              <Typography variant="body2" color="text.secondary">{user.dateOfBirth || 'Chưa cập nhật'}</Typography>
            </Box>
            {/* Gender */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
              <Typography variant="body2" color="text.secondary">{user.gender || 'Chưa cập nhật'}</Typography>
            </Box>
            {/* Address */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
              <Typography variant="body2" color="text.secondary">{user.currentAddress || 'Chưa cập nhật'}</Typography>
            </Box>
            {/* Personal Links */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LinkIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
              <Typography variant="body2" color="text.secondary">{user.personalLinks || 'Chưa cập nhật'}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
