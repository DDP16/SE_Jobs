import React from 'react';
import { Box, Container } from '@mui/material';
import SideBar from '../../../components/common/SideBar';

export default function UserProfileLayout({ children, sidebarProps = {} }) {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
          <SideBar {...sidebarProps} />

          {/* Main content area */}
          <Box sx={{ flex: 1 }}>{children}</Box>
        </Box>
      </Container>
    </Box>
  );
}
