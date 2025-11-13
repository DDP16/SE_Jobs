import React, { useState } from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import { Add as AddIcon, ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

export default function ProfileCompletionCard({
  completionPercentage,
  onAddIntroduction,
  onAddExperience,
  onAddEducation = () => {},
  onAddSkills = () => {},
  onAddAwards = () => {}
}) {
  const [showMore, setShowMore] = useState(false);
  return (
    <Box sx={{ width: { xs: '100%', sm: 300 }, position: { xs: 'static', sm: 'sticky' }, top: { sm: 20 }, mb: { xs: 3, sm: 0 } }}>
      <Box sx={{ bgcolor: 'background.paper', p: { xs: 2.5, sm: 4 }, borderRadius: 2, border: 1, borderColor: 'divider' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'center', mb: 4 }}>
          Độ hoàn thiện hồ sơ
        </Typography>

        {/* Circular Progress */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: { xs: 3, sm: 4 } }}>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <Box
              sx={{
                width: { xs: 90, sm: 120 },
                height: { xs: 90, sm: 120 },
                borderRadius: '50%',
                border: { xs: '8px solid', sm: '12px solid' },
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: { xs: '8px solid transparent', sm: '12px solid transparent' },
                  borderTopColor: 'error.main',
                  transform: 'rotate(-90deg)'
                }}
              />
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                  {completionPercentage}%
                </Typography>
                <Typography sx={{ fontSize: 10, color: 'text.secondary', mt: 0.5 }}>
                  hoàn thành
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Warning Card */}
        <Box
          sx={{
            bgcolor: 'warning.lighter',
            border: 2,
            borderColor: 'warning.main',
            borderRadius: 2,
            p: 1,
            mb: 4
          }}
        >
          <Typography variant="body3" sx={{ lineHeight: 1.6, fontSize: '0.7rem' }}>
            Nâng cấp hồ sơ của bạn lên 100% để thu hút nhà tuyển dụng hơn!
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
          <Button
            onClick={onAddIntroduction}
            variant="text"
            startIcon={<AddIcon />}
            sx={{
              justifyContent: 'flex-start',
              color: 'primary.main',
              fontWeight: 500,
              fontSize: '0.875rem',
              '&:hover': { bgcolor: 'primary.lighter' }
            }}
          >
            Thêm Giới thiệu bản thân
          </Button>
          <Button
            variant="text"
            startIcon={<AddIcon />}
            sx={{
              justifyContent: 'flex-start',
              color: 'primary.main',
              fontWeight: 500,
              fontSize: '0.875rem',
              '&:hover': { bgcolor: 'primary.lighter' }
            }}
          >
            Thêm Thông tin cá nhân
          </Button>
          <Button
            onClick={onAddExperience}
            variant="text"
            startIcon={<AddIcon />}
            sx={{
              justifyContent: 'flex-start',
              color: 'primary.main',
              fontWeight: 500,
              fontSize: '0.875rem',
              '&:hover': { bgcolor: 'primary.lighter' }
            }}
          >
            Thêm Kinh nghiệm làm việc
          </Button>
          {/* Toggle + Extra fields moved into the action buttons group for better alignment */}
          {showMore ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 0.5, pl: 0 }}>
              <Button
                variant="text"
                startIcon={<AddIcon />}
                onClick={onAddEducation}
                sx={{
                  justifyContent: 'flex-start',
                  color: 'primary.main',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  '&:hover': { bgcolor: 'primary.lighter' }
                }}
              >
                Thêm Học vấn
              </Button>
              <Button
                variant="text"
                startIcon={<AddIcon />}
                onClick={onAddSkills}
                sx={{
                  justifyContent: 'flex-start',
                  color: 'primary.main',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  '&:hover': { bgcolor: 'primary.lighter' }
                }}
              >
                Thêm Kỹ năng
              </Button>
              <Button
                variant="text"
                startIcon={<AddIcon />}
                onClick={onAddAwards}
                sx={{
                  justifyContent: 'flex-start',
                  color: 'primary.main',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  '&:hover': { bgcolor: 'primary.lighter' }
                }}
              >
                Thêm giải thưởng
              </Button>

              <Button
                variant="text"
                startIcon={<ExpandLessIcon />}
                onClick={() => setShowMore(false)}
                sx={{
                  justifyContent: 'flex-start',
                  color: 'text.secondary',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  '&:hover': { bgcolor: 'grey.100' }
                }}
              >
                Thu gọn
              </Button>
            </Box>
          ) : (
            <Button
              variant="text"
              endIcon={<ExpandMoreIcon />}
              onClick={() => setShowMore(true)}
              sx={{
                justifyContent: 'flex-start',
                color: 'text.secondary',
                fontWeight: 500,
                fontSize: '0.875rem',
                '&:hover': { bgcolor: 'grey.100' }
              }}
            >
              Thêm thông tin khác
            </Button>
          )}

  </Box>

  {/* View CV Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ fontWeight: 600, py: 1.5, mt: 4, fontSize: '0.9rem' }}
        >
          Xem và Tải CV
        </Button>
      </Box>
    </Box>
  );
}
