import React, { useState, useEffect } from 'react';
import { Container, Box, CircularProgress, Alert } from '@mui/material';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import CompanyListHero from './partials/CompanyListHero';
import CompanyFilters from './partials/CompanyFilters';
import CompanyGrid from './partials/CompanyGrid';
import { sortType } from '../../../lib';
import { getCompanies } from '../../../modules/services/companyService';
import { useCompanyData, useCompanyFilters, useCompanySort } from './hooks';

export default function CompanyList() {
    const dispatch = useDispatch();
    const companies = useSelector(state => state.company?.companies || [], shallowEqual);
    const status = useSelector(state => state.company?.status || 'idle');
    const error = useSelector(state => state.company?.error || null);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedIndustries, setSelectedIndustries] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [sortBy, setSortBy] = useState(sortType.featured);

    useEffect(() => {
        dispatch(getCompanies({ page, limit }));
    }, [page, limit, dispatch]);

    const mappedCompanies = useCompanyData(companies);
    const filteredCompanies = useCompanyFilters(
        mappedCompanies,
        searchKeyword,
        selectedIndustries,
        selectedSizes,
        selectedLocations
    );
    const sortedCompanies = useCompanySort(filteredCompanies, sortBy);

    const handleClearFilters = () => {
        setSelectedIndustries([]);
        setSelectedSizes([]);
        setSelectedLocations([]);
        setSearchKeyword('');
    };

    const activeFiltersCount =
        selectedIndustries.length +
        selectedSizes.length +
        selectedLocations.length;

    const hasNoCompanies = mappedCompanies.length === 0 && status === 'succeeded';

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            <CompanyListHero
                onSearch={setSearchKeyword}
                searchKeyword={searchKeyword}
            />

            <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
                {status === 'loading' && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <CircularProgress />
                    </Box>
                )}

                {status === 'failed' && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error || 'Failed to load companies. Please try again later.'}
                    </Alert>
                )}

                {(status === 'succeeded' || status === 'idle') && (
                    <>
                        {hasNoCompanies ? (
                            <Box sx={{ textAlign: 'center', py: 8 }}>
                                <Alert severity="info">
                                    No companies found. Please try again later.
                                </Alert>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', md: 'row' },
                                    gap: { xs: 3, md: 4 },
                                    alignItems: 'flex-start'
                                }}
                            >
                                <Box sx={{ width: { xs: '100%', md: 280 }, flexShrink: 0 }}>
                                    <CompanyFilters
                                        selectedIndustries={selectedIndustries}
                                        selectedSizes={selectedSizes}
                                        selectedLocations={selectedLocations}
                                        onIndustryChange={setSelectedIndustries}
                                        onSizeChange={setSelectedSizes}
                                        onLocationChange={setSelectedLocations}
                                        onClearFilters={handleClearFilters}
                                        activeFiltersCount={activeFiltersCount}
                                    />
                                </Box>

                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <CompanyGrid
                                        companies={sortedCompanies}
                                        sortBy={sortBy}
                                        onSortChange={setSortBy}
                                        totalCount={filteredCompanies.length}
                                    />
                                </Box>
                            </Box>
                        )}
                    </>
                )}
            </Container>
        </Box>
    );
}

