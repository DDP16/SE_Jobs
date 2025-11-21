import React from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

export default function EducationSection({ educations, showAll, onToggleShowAll, onEdit, onDelete, onAdd }) {
  const formatDate = (startMonth, startYear, endMonth, endYear, isCurrentlyStudying) => {
    const startDate = startMonth ? `${String(startMonth).padStart(2, '0')}/${startYear}` : startYear;
    const endDate = (endYear === 'Present' || isCurrentlyStudying)
      ? 'HIỆN TẠI'
      : (endMonth ? `${String(endMonth).padStart(2, '0')}/${endYear}` : endYear);
    return `${startDate} - ${endDate}`;
  };

  const displayedEducations = showAll ? educations : educations.slice(0, 2);
  const remainingCount = educations.length - 2;

  return (
    <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, border: 1, borderColor: 'divider', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Học vấn
          {educations.length > 0 && (
            <Typography component="span" variant="body2" sx={{ ml: 1, color: 'text.secondary', fontWeight: 400 }}>
              ({educations.length})
            </Typography>
          )}
        </Typography>
        <IconButton onClick={onAdd} size="small" sx={{ color: 'primary.main', '&:hover': { bgcolor: 'primary.lighter' } }}>
          <AddIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {educations.length === 0 ? (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Chia sẻ trình độ học vấn của bạn
        </Typography>
      ) : (
        <>
          {displayedEducations.map((edu) => (
            <Box key={edu.id} sx={{ mb: 4, '&:last-child': { mb: 0 } }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{edu.university}</Typography>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <IconButton
                    onClick={() => onEdit(edu)}
                    size="small"
                    sx={{ p: 0.5, color: 'primary.main', '&:hover': { bgcolor: 'primary.lighter' } }}
                  >
                    <EditIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(edu.id)}
                    size="small"
                    sx={{ p: 0.5, color: 'text.secondary', '&:hover': { bgcolor: 'grey.100' } }}
                  >
                    <DeleteIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                {edu.degree} {edu.major && `- ${edu.major}`}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                {formatDate(edu.startMonth, edu.startYear, edu.endMonth, edu.endYear, edu.isCurrentlyStudying)}
              </Typography>
              {edu.description && (
                <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.6 }}>
                  {edu.description}
                </Typography>
              )}
            </Box>
          ))}

          {!showAll && educations.length > 2 && (
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button
                onClick={onToggleShowAll}
                variant="text"
                sx={{ color: 'primary.main', fontWeight: 500, '&:hover': { bgcolor: 'primary.lighter' } }}
              >
                Show {remainingCount} more educations
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
