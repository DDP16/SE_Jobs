import { React, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';
import CompanyHeader from './partials/CompanyHeader';
import CompanyOverview from './partials/CompanyOverview';
import CompanyInfo from './partials/CompanyInfo';
import CompanyJobs from './partials/CompanyJobs';
import { PerksSection } from "../../../components";
import { getCompany } from '../../../modules/services/companyService';
import { useDispatch, useSelector } from 'react-redux';
import { mockCompanies, mockJobs } from '../../../../mocks/mockData';
import OpenJobs from './partials/OpenJobs';

export default function CompanyDetails() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const company = useSelector((state) => state.company.company);
    const companyStatus = useSelector((state) => state.company.status);

    useEffect(() => {
        if (id) {
            console.log("Fetching company with id:", id);
            dispatch(getCompany(id));
        }
    }, [id, dispatch]);

    console.log("company from store:", company);

    // Get jobs for this company
    const companyJobs = company?.name
        ? mockJobs.filter(job =>
            job.company?.toLowerCase() === company.name.toLowerCase()
        )
        : [];

    // Show loading state
    if (companyStatus === "loading") {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box>Loading...</Box>
            </Box>
        );
    }

    // Show error state or not found
    if (companyStatus === "failed" || !company) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ fontSize: '4rem', mb: 2 }}>🔍</Box>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Company Not Found</h2>
                    <p className="text-gray-600 mb-4">
                        The company you're looking for doesn't exist or has been removed.
                    </p>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            {/* Breadcrumb */}
            <Box sx={{ bgcolor: 'background.paper', px: { xs: 2, md: 4 }, borderBottom: '1px solid', borderColor: 'divider' }}>
                {/* <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
                    <p className="text-sm text-muted-foreground">
                        Trang chủ / Danh sách công ty / {company.name}
                    </p>
                </Box> */}
            </Box>

            <CompanyHeader company={company} />

            <Box className="px-8 xl:px-16">
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
                    gap: { xs: 3, md: 4 }
                }}>
                    <Box sx={{ minWidth: 0 }}>
                        <CompanyOverview company={company} />
                        {/* <CompanyJobs jobs={companyJobs} company={company} /> */}
                    </Box>

                    <Box sx={{ minWidth: 0 }}>
                        <CompanyInfo company={company} />
                    </Box>
                </Box>
            </Box>

            <div className="px-8 xl:px-16 py-10 space-y-10">
                {/* <PerksSection company={company} /> */}
                <OpenJobs company={company} />
            </div>
        </Box>
    );
}

