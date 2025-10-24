import React from 'react';
import { Box, Container } from '@mui/material';
import Header from '../Header';
import Footer from '../Footer';

interface MainLayoutProps {
    children: React.ReactNode;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
    disableGutters?: boolean;
}

export default function MainLayout({
    children,
    maxWidth = 'lg',
    disableGutters = false
}: MainLayoutProps) {
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
                {maxWidth ? (
                    <Container
                        maxWidth={maxWidth}
                        disableGutters={disableGutters}
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {children}
                    </Container>
                ) : (
                    <Box sx={{ flexGrow: 1 }}>
                        {children}
                    </Box>
                )}
            </Box>

            {/* Footer */}
            <Footer />
        </Box>
    );
}
