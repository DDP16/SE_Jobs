import React, { useRef, useState } from 'react';
import { Box, Typography, IconButton, Chip, Button } from '@mui/material';
import { CloudUpload as CloudUploadIcon, Description as DescriptionIcon, Visibility as VisibilityIcon, Edit as EditIcon, Delete as DeleteIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';

export default function CVUpload({ cvFile, onFileChange, onDelete, onView }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file?.type === 'application/pdf') {
      onFileChange(file);
    } else {
      alert('Vui lòng chỉ tải lên file PDF');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file?.type === 'application/pdf') {
      onFileChange(file);
    } else {
      alert('Vui lòng chỉ tải lên file PDF');
    }
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  return (
    <Box sx={{ bgcolor: 'background.paper', p: { xs: 2, sm: 3 }, borderRadius: 2, border: 1, borderColor: 'divider', mb: 2 }}>
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: { xs: 1.5, sm: 2 } }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>CV đính kèm</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>Tải lên CV của bạn để nhà tuyển dụng xem</Typography>
        </Box>
        {cvFile && (
          <Chip icon={<CheckCircleIcon />} label="Đã tải lên" color="success" size="small" />
        )}
      </Box>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

        {!cvFile ? (
        <Box
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={handleUploadClick}
          sx={{
            border: 2,
            borderStyle: 'dashed',
            borderColor: isDragging ? 'primary.main' : 'divider',
            borderRadius: 2,
            p: { xs: 3, sm: 4 },
            textAlign: 'center',
            cursor: 'pointer',
            bgcolor: isDragging ? 'primary.lighter' : 'grey.50',
            transition: 'all 0.2s',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'primary.lighter',
            }
          }}
        >
          <CloudUploadIcon sx={{ fontSize: { xs: 36, sm: 40 }, mb: { xs: 1, sm: 1.5 }, color: isDragging ? 'primary.main' : 'text.disabled' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: { xs: 0.5, sm: 0.5 }, fontSize: { xs: '0.95rem', sm: '1rem' } }}>Kéo thả file CV</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: { xs: 0.75, sm: 1 } }}>hoặc</Typography>
          <Button
            onClick={(e) => { e.stopPropagation(); handleUploadClick(); }}
            variant="contained"
            color="error"
            startIcon={<CloudUploadIcon />}
            sx={{ fontWeight: 600, py: { xs: 0.4, sm: 0.5 }, px: { xs: 1.5, sm: 2 }, fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
          >
            Chọn file
          </Button>
          <Typography variant="caption" sx={{ display: 'block', color: 'text.disabled', mt: 1 }}>
            PDF, tối đa 5MB
          </Typography>
        </Box>
        ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, p: { xs: 2, sm: 3 }, bgcolor: 'grey.50', borderRadius: 2, border: 1, borderColor: 'divider' }}>
          <Box sx={{ width: { xs: 44, sm: 56 }, height: { xs: 44, sm: 56 }, bgcolor: 'error.main', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <DescriptionIcon sx={{ color: 'white', fontSize: { xs: 22, sm: 32 } }} />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5, fontSize: { xs: '0.95rem', sm: '1rem' } }}>{cvFile.name}</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>{cvFile.size} MB</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>•</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>Tải lên: {cvFile.uploadDate}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 } }}>
            <IconButton onClick={onView} sx={{ border: 1, borderColor: 'divider', color: 'primary.main', '&:hover': { bgcolor: 'primary.lighter' }, p: { xs: 0.5, sm: 1 } }}>
              <VisibilityIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
            </IconButton>
            <IconButton onClick={handleUploadClick} sx={{ border: 1, borderColor: 'divider', color: 'text.secondary', '&:hover': { bgcolor: 'grey.100' }, p: { xs: 0.5, sm: 1 } }}>
              <EditIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
            </IconButton>
            <IconButton onClick={onDelete} sx={{ border: 1, borderColor: 'divider', color: 'error.main', '&:hover': { bgcolor: 'error.lighter' }, p: { xs: 0.5, sm: 1 } }}>
              <DeleteIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}
