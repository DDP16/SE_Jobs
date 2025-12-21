import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import CompanyHeader from './partials/CompanyHeader';
import CompanyOverview from './partials/CompanyOverview';
import CompanyInfo from './partials/CompanyInfo';
import CompanyJobs from './partials/CompanyJobs';
import { PerksSection } from "../../../components";
import { getCompany } from '../../../modules/services/companyService';
import { useDispatch, useSelector } from 'react-redux';
import { mockJobs } from '../../../../mocks/mockData';
import OpenJobs from './partials/OpenJobs';
import { useTranslation } from 'react-i18next';

export default function CompanyDetails() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const company = useSelector((state) => state.company.company);
    const companyStatus = useSelector((state) => state.company.status);

    useEffect(() => {
        if (id) {
            dispatch(getCompany(id));
        }
    }, [id, dispatch]);

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
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 4 } }} >
                        <CompanyOverview company={company} />

                        <Paper
                            elevation={0}
                            sx={{ 
                                p: { xs: 2, md: 3 },
                                border: '1px solid', borderColor: 'divider', borderRadius: 2,
                                display: 'flex', flexDirection: 'column', gap: 2
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                {t('company.office_location.title')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {t('company.office_location.description', { companyName: company.name || 'the company' })}
                            </Typography>
                            {company.company_branches && Array.isArray(company.company_branches) && company.company_branches.length > 0 ? (
                                <div className='space-y-4'>
                                    {company.company_branches.map((branch, index) => (
                                        <div key={index} className=''>
                                            <h5 className='font-semibold'>
                                                {branch.name || `Branch ${index + 1}`}
                                            </h5>
                                            <p className='text-muted-foreground'>
                                                {[
                                                    branch.address,
                                                    branch.ward?.name,
                                                    branch.province?.name,
                                                    branch.country?.name
                                                ].filter(Boolean).join(', ')}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', py: 2 }}>
                                    {t('company.office_location.no_locations') || 'No office locations available'}
                                </Typography>
                            )}
                        </Paper>
                    </Box>

                    <Box sx={{ minWidth: 0 }}>
                        <CompanyInfo company={company} />
                    </Box>
                </Box>
            </Box>

            <div className="px-8 xl:px-16 py-10 space-y-10">
                <OpenJobs company={company} />
            </div>
        </Box>
    );
}

