import React, { useState, useEffect } from 'react';
import { IconButton, Badge, Menu, MenuItem, Box, Typography, Divider, Button } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function NotificationsPopup({ compact = false }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [notifications, setNotifications] = useState(() => {
    try {
      const raw = localStorage.getItem('NOTIFICATIONS');
      if (raw) return JSON.parse(raw);
    } catch (err) {}
    return [
      {
        id: 'n1',
        title: 'Job mới dành riêng cho bạn. Tham khảo ngay!',
        subtitle: 'JavaScript Developer Intern',
        date: '13/11/2025',
        read: false,
        url: '/jobs/1'
      }
    ];
  });

  useEffect(() => {
    try { localStorage.setItem('NOTIFICATIONS', JSON.stringify(notifications)); } catch (e) {}
  }, [notifications]);

  const unread = notifications.filter(n => !n.read).length;

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const handleItemClick = (n) => {
    if (!n.read) setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x));
    if (n.url) {
      navigate(n.url);
      handleClose();
    }
  };

  return (
    <>
      <IconButton size={compact ? 'small' : 'medium'} color="inherit" onClick={handleOpen} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
        <Badge badgeContent={unread > 0 ? unread : undefined} color="error" variant={unread > 0 ? 'standard' : 'dot'}>
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { mt: 1, minWidth: 320, borderRadius: 2, p: 0, overflow: 'hidden' } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Thông báo</Typography>
          <Button size="small" onClick={markAllRead} sx={{ textTransform: 'none', color: 'success.main' }}>Đánh dấu là đã đọc</Button>
        </Box>
        <Divider />
        <Box sx={{ maxHeight: '40vh', overflowY: 'auto' }}>
          {notifications && notifications.length > 0 ? (
            notifications.map(n => (
              <MenuItem key={n.id} onClick={() => handleItemClick(n)} sx={{ alignItems: 'flex-start', py: 1.25, px: 2 }}>
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ fontWeight: n.read ? 500 : 700 }}>{n.title}</Typography>
                  {n.subtitle && <Typography variant="body2" sx={{ color: 'text.secondary' }}>{n.subtitle}</Typography>}
                  <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5 }}>{n.date}</Typography>
                </Box>
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled sx={{ px: 2, py: 2 }}>Không có thông báo</MenuItem>
          )}
        </Box>
      </Menu>
    </>
  );
}
