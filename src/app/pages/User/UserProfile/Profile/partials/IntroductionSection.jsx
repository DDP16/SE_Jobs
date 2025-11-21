import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

export default function IntroductionSection({ introduction, onEdit }) {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, border: 1, borderColor: 'divider', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Giới thiệu bản thân</Typography>
        <IconButton onClick={onEdit} size="small" sx={{ color: 'primary.main', '&:hover': { bgcolor: 'primary.lighter' } }}>
          <AddIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
      {introduction ? (
        <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{introduction}</Typography>
      ) : (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Giới thiệu điểm mạnh và số năm kinh nghiệm của bạn</Typography>
      )}
    </Box>
  );
}
