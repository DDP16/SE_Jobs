import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import CompanyHeader from './partials/CompanyHeader';
import CompanyOverview from './partials/CompanyOverview';
import CompanyInfo from './partials/CompanyInfo';
import CompanyJobs from './partials/CompanyJobs';
import { mockCompanies, mockJobs } from '../../../mocks/mockData';

export default function CompanyDetails() {
    const { id } = useParams();

    // Get company data (in real app, this would be an API call)
    const company = mockCompanies.find(c => c.id === parseInt(id)) || mockCompanies[0];

    // Get jobs for this company
    const companyJobs = mockJobs.filter(job =>
        job.company.toLowerCase() === company.name.toLowerCase()
    );

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            {/* Breadcrumb */}
            <Box sx={{ bgcolor: 'background.paper', py: 2, px: { xs: 2, md: 4 }, borderBottom: '1px solid', borderColor: 'divider' }}>
                {/* <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
                    <p className="text-sm text-muted-foreground">
                        Trang chủ / Danh sách công ty / {company.name}
                    </p>
                </Box> */}
            </Box>

            {/* Header Section */}
            <Box sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
                <CompanyHeader company={company} />
            </Box>

            {/* Main Content */}
            <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 3, md: 4 } }}>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
                    gap: { xs: 3, md: 4 }
                }}>
                    {/* Left Column */}
                    <Box sx={{ minWidth: 0 }}>
                        <CompanyOverview company={company} />
                        <CompanyJobs jobs={companyJobs} company={company} />
                    </Box>

                    {/* Right Column - Sidebar */}
                    <Box sx={{ minWidth: 0 }}>
                        <CompanyInfo company={company} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

