import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Stack,
    Button,
    Avatar
} from '@mui/material';
import {
    ArrowForward,
    Work,
    Dashboard,
    TrendingUp
} from '@mui/icons-material';

export default function CTASection() {
    return (
        <Box sx={{ py: 8 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Post Job Card */}
                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                height: '100%',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                                    <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
                                        <Work />
                                    </Avatar>
                                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                        Post a Job
                                    </Typography>
                                </Stack>

                                <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                                    Reach thousands of qualified candidates and find the perfect fit for your team.
                                </Typography>

                                <Stack direction="row" spacing={2}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            bgcolor: 'white',
                                            color: 'primary.main',
                                            '&:hover': { bgcolor: 'grey.100' }
                                        }}
                                        endIcon={<ArrowForward />}
                                    >
                                        Post a Job
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            borderColor: 'white',
                                            color: 'white',
                                            '&:hover': {
                                                borderColor: 'white',
                                                bgcolor: 'rgba(255, 255, 255, 0.1)'
                                            }
                                        }}
                                    >
                                        Learn More
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Dashboard Preview Card */}
                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                height: '100%',
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                color: 'white',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                                    <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
                                        <Dashboard />
                                    </Avatar>
                                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                        Dashboard
                                    </Typography>
                                </Stack>

                                <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                                    Manage your job postings, track applications, and analyze your hiring performance.
                                </Typography>

                                <Stack direction="row" spacing={2}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            bgcolor: 'white',
                                            color: 'primary.main',
                                            '&:hover': { bgcolor: 'grey.100' }
                                        }}
                                        endIcon={<ArrowForward />}
                                    >
                                        Go to Dashboard
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            borderColor: 'white',
                                            color: 'white',
                                            '&:hover': {
                                                borderColor: 'white',
                                                bgcolor: 'rgba(255, 255, 255, 0.1)'
                                            }
                                        }}
                                    >
                                        View Demo
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Stats Section */}
                <Box sx={{ mt: 8, textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ mb: 4, fontWeight: 700 }}>
                        Join Thousands of Job Seekers
                    </Typography>

                    <Grid container spacing={4} sx={{ mt: 4 }}>
                        <Grid item xs={12} sm={4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                                    10K+
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    Active Jobs
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                                    5K+
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    Companies
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                                    50K+
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    Job Seekers
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}
