import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function AboutSection({ about, onEdit }) {
  const { t } = useTranslation();
  const currentUser = useSelector((state) => state.auth.user);
  const aboutText = about || currentUser?.student_info?.about || '';
  const hasContent = Boolean(aboutText);

  return (
    <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, border: 1, borderColor: 'divider', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>{t("profile.about_me")}</Typography>
        <IconButton onClick={onEdit} size="small" sx={{ color: 'primary.main', '&:hover': { bgcolor: 'primary.lighter' } }}>
          {hasContent ? <EditIcon sx={{ fontSize: 18 }} /> : <AddIcon sx={{ fontSize: 18 }} />}
        </IconButton>
      </Box>
      {aboutText ? (
        <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{aboutText}</Typography>
      ) : (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{t("profile.about_me_placeholder")}</Typography>
      )}
    </Box>
  );
}
