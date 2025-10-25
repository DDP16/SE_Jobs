import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Stack,
    Button,
    Tabs,
    Tab
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import JobCard from '../features/JobCard';
import { mockJobs } from '../../data/mockData';
import { useState } from 'react';

export default function JobSection() {
    const [activeTab, setActiveTab] = useState(0);

    const featuredJobs = mockJobs.filter(job => job.isFeatured);
    const latestJobs = mockJobs.slice(0, 6);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleJobAction = (action, job) => {
        console.log(`${action} job:`, job);
    };

    return (
        <Box sx={{ py: 8, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="h2" sx={{ mb: 2 }}>
                        Latest Job Openings
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
                        Discover new opportunities and advance your career
                    </Typography>
                </Box>

                {/* Tabs */}
                <Box sx={{ mb: 4 }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        centered
                        sx={{ mb: 4 }}
                    >
                        <Tab label="Featured Jobs" />
                        <Tab label="Latest Jobs" />
                    </Tabs>
                </Box>

                {/* Job Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {(activeTab === 0 ? featuredJobs : latestJobs).map((job) => (
                        <Grid item xs={12} sm={6} lg={4} key={job.id}>
                            <JobCard
                                job={job}
                                onBookmark={(job) => handleJobAction('bookmark', job)}
                                onShare={(job) => handleJobAction('share', job)}
                                onApply={(job) => handleJobAction('apply', job)}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ textAlign: 'center' }}>
                    <Button
                        variant="outlined"
                        size="large"
                        endIcon={<ArrowForward />}
                        sx={{ minWidth: 200 }}
                    >
                        View All Jobs
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}
