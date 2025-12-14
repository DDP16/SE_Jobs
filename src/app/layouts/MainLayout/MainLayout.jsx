import React from 'react';
import { Box, Container } from '@mui/material';
import Header from '../Header';
import Footer from '../Footer';

export default function MainLayout({
    children,
    maxWidth = false, 
    disableGutters = false
}) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            bgcolor: 'background.default'
        }}>
            {/* Header */}
            <Header />

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: { xs: '40px', md: '50px' }
                }}
            >
                {children}
            </Box>

            {/* Footer */}
            <Footer />
        </Box>
    );
}
