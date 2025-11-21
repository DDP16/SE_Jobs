import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function ProfileCompletionCard({
  completionPercentage
}) {
  const theme = useTheme();
  return (
    <Box sx={{ width: { xs: '100%', sm: 300 }, position: { xs: 'static', sm: 'sticky' }, top: { sm: 20 }, mb: { xs: 3, sm: 0 } }}>
      <Box sx={{ bgcolor: 'background.paper', p: { xs: 2.5, sm: 4 }, borderRadius: 2, border: 1, borderColor: 'divider' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'center', mb: 4 }}>
          Độ hoàn thiện hồ sơ
        </Typography>

        {/* Circular Progress (visual ring using conic-gradient) */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: { xs: 3, sm: 4 } }}>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <Box
              sx={{
                width: { xs: 90, sm: 120 },
                height: { xs: 90, sm: 120 },
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                '&::before': {
                  content: "''",
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: `conic-gradient(${theme.palette.primary.main} ${completionPercentage * 3.6}deg, ${theme.palette.grey[200]} 0deg)`
                }
              }}
            >
              <Box sx={{ width: { xs: 66, sm: 88 }, height: { xs: 66, sm: 88 }, borderRadius: '50%', bgcolor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
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
        </Box>

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
          <Typography variant="body1" sx={{ lineHeight: 1.6, fontSize: '0.95rem' }}>
            Một số mẹo để hồ sơ của bạn nổi bật hơn
          </Typography>
        </Box>

        {/* Tips list (simple subitems without borders) */}
        <Box component="ul" sx={{ listStyle: 'disc', pl: 2, mb: 3, m: 0 }}>
          <Box component="li" sx={{ mb: 1, fontSize: '0.95rem', color: 'text.primary' }}>
            Nâng cấp hồ sơ của bạn lên 100% để thu hút nhà tuyển dụng hơn!
          </Box>
          <Box component="li" sx={{ fontSize: '0.95rem', color: 'text.primary' }}>
            Nâng cấp hồ sơ của bạn lên 100% để thu hút nhà tuyển dụng hơn!
          </Box>
        </Box>

        {/* View CV Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ fontWeight: 700, py: 1.75, mt: 1, fontSize: '0.95rem', borderRadius: 2 }}
        >
          Xem và Tải CV
        </Button>
      </Box>
    </Box>
  );
}
