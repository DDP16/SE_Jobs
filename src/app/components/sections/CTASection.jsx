import React from 'react';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
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
                                        {t("homeSections.ctaSection.postJob.title")}
                                    </Typography>
                                </Stack>

                                <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                                    {t("homeSections.ctaSection.postJob.description")}
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
                                        {t("homeSections.ctaSection.postJob.button")}
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
                                        {t("homeSections.ctaSection.postJob.learnMore")}
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
                                        {t("homeSections.ctaSection.dashboard.title")}
                                    </Typography>
                                </Stack>

                                <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                                    {t("homeSections.ctaSection.dashboard.description")}
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
                                        {t("homeSections.ctaSection.dashboard.goToDashboard")}
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
                                        {t("homeSections.ctaSection.dashboard.viewDemo")}
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Stats Section */}
                <Box sx={{ mt: 8, textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ mb: 4, fontWeight: 700 }}>
                        {t("homeSections.ctaSection.stats.title")}
                    </Typography>

                    <Grid container spacing={4} sx={{ mt: 4 }}>
                        <Grid item xs={12} sm={4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                                    10K+
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    {t("homeSections.ctaSection.stats.activeJobs")}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                                    5K+
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    {t("homeSections.ctaSection.stats.companies")}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                                    50K+
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    {t("homeSections.ctaSection.stats.jobSeekers")}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}
