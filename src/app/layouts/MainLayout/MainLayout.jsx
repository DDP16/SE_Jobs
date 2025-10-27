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
                    flexDirection: 'column'
                }}
            >
                {children}
            </Box>

            {/* Footer */}
            <Footer />
        </Box>
    );
}
