import React from 'react';
import { Avatar, IconButton, Typography, Box } from '@mui/material';
import { Edit as EditIcon, Email as EmailIcon, Phone as PhoneIcon, Person as PersonIcon, LocationOn as LocationOnIcon, Link as LinkIcon } from '@mui/icons-material';

export default function ProfileHeader({ user, onEdit }) {
  const getInitials = (name) => {
    return name?.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2) || 'U';
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, border: '1px solid', borderColor: 'divider', mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
        {/* Avatar with Edit Button */}
        <Box sx={{ position: 'relative' }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: '2rem', fontWeight: 600 }}>
            {getInitials(user.name)}
          </Avatar>
        </Box>

        {/* User Info */}
        <Box sx={{ flex: 1 }}>
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

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
              <Typography variant="body2" color="text.secondary">{user.email}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
              <Typography variant="body2" color="text.secondary">{user.phone}</Typography>
            </Box>
            {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
              <Typography variant="body2" color="text.secondary">Ngày sinh</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
              <Typography variant="body2" color="text.secondary">Giới tính</Typography>
            </Box> */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
              <Typography variant="body2" color="text.secondary">{user.location}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LinkIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
              <Typography variant="body2" color="text.secondary">Link cá nhân</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
