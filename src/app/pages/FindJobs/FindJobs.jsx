import React, { useState } from "react";
import { Container, Box } from '@mui/material';
import FilterSection from "../../components/sections/FilterSection";
import JobListSection from "../../components/sections/JobListSection";
import HeroSection from "../../components/sections/HeroSection";
import JobDescription from "../JobDescription/JobDescription";

export default function FindJobs() {
    const [selectedJob, setSelectedJob] = useState(null);

    const handleSearch = (searchParams) => {
        console.log('Search params:', searchParams);
        // TODO: Implement search functionality
    };

    const handleFilter = (filterParams) => {
        console.log('Filter params:', filterParams);
        // TODO: Implement filter functionality
    };

    const handleJobSelect = (job) => {
        setSelectedJob(job);
    };

    return (
        <>
            <HeroSection onSearch={handleSearch} />
            <Container maxWidth="xl">
                <Box sx={{
                    display: 'flex',
                    gap: 3,
                    py: 3,
                    alignItems: 'flex-start'
                }}>
                    {/* Left Sidebar - Filters */}
                    <FilterSection onFilter={handleFilter} />

                    {/* Middle - Job List */}
                    <Box sx={{ flex: '0 0 400px', minWidth: 0 }}>
                        <JobListSection onJobSelect={handleJobSelect} selectedJob={selectedJob} />
                    </Box>

                    {/* Right - Job Description */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        {selectedJob ? (
                            <JobDescription
                                job={selectedJob}
                                layout="compact"
                                showBreadcrumb={false}
                                showSimilarJobs={false}
                                showCompanySection={false}
                            />
                        ) : (
                            <Box sx={{
                                p: 4,
                                textAlign: 'center',
                                color: 'text.secondary',
                                bgcolor: 'background.paper',
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: 'divider'
                            }}>
                                <h3>Select a job to view details</h3>
                                <p>Choose a job from the list to see the full description</p>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Container>
        </>
    );
}
