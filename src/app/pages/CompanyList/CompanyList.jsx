import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import CompanyListHero from './partials/CompanyListHero';
import CompanyFilters from './partials/CompanyFilters';
import CompanyGrid from './partials/CompanyGrid';
import { mockCompanies } from '../../../mocks/mockData';

export default function CompanyList() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedIndustries, setSelectedIndustries] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [sortBy, setSortBy] = useState('featured');
    const [viewMode, setViewMode] = useState('list'); // 'grid' or 'list'

    // Filter companies based on search and filters
    const filteredCompanies = mockCompanies.filter(company => {
        // Search filter
        if (searchKeyword && !company.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
            !company.description.toLowerCase().includes(searchKeyword.toLowerCase())) {
            return false;
        }

        // Industry filter
        if (selectedIndustries.length > 0 && !selectedIndustries.includes(company.industry)) {
            return false;
        }

        // Size filter
        if (selectedSizes.length > 0 && !selectedSizes.includes(company.size)) {
            return false;
        }

        // Location filter
        if (selectedLocations.length > 0 && !selectedLocations.some(loc =>
            company.location.includes(loc))) {
            return false;
        }

        return true;
    });

    // Sort companies
    const sortedCompanies = [...filteredCompanies].sort((a, b) => {
        switch (sortBy) {
            case 'featured':
                return (b.isHiring ? 1 : 0) - (a.isHiring ? 1 : 0);
            case 'jobs':
                return b.jobsCount - a.jobsCount;
            case 'name':
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });

    const handleSearch = (keyword) => {
        setSearchKeyword(keyword);
    };

    const handleIndustryChange = (industries) => {
        setSelectedIndustries(industries);
    };

    const handleSizeChange = (sizes) => {
        setSelectedSizes(sizes);
    };

    const handleLocationChange = (locations) => {
        setSelectedLocations(locations);
    };

    const handleClearFilters = () => {
        setSelectedIndustries([]);
        setSelectedSizes([]);
        setSelectedLocations([]);
        setSearchKeyword('');
    };

    const activeFiltersCount = selectedIndustries.length + selectedSizes.length + selectedLocations.length;

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            {/* Hero Section with Search */}
            <CompanyListHero
                onSearch={handleSearch}
                searchKeyword={searchKeyword}
            />

            <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: { xs: 3, md: 4 },
                        alignItems: 'flex-start'
                    }}
                >
                    {/* Filters Sidebar */}
                    <Box
                        sx={{
                            width: { xs: '100%', md: 280 },
                            flexShrink: 0
                        }}
                    >
                        <CompanyFilters
                            selectedIndustries={selectedIndustries}
                            selectedSizes={selectedSizes}
                            selectedLocations={selectedLocations}
                            onIndustryChange={handleIndustryChange}
                            onSizeChange={handleSizeChange}
                            onLocationChange={handleLocationChange}
                            onClearFilters={handleClearFilters}
                            activeFiltersCount={activeFiltersCount}
                        />
                    </Box>

                    {/* Company Grid */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <CompanyGrid
                            companies={sortedCompanies}
                            sortBy={sortBy}
                            onSortChange={setSortBy}
                            viewMode={viewMode}
                            onViewModeChange={setViewMode}
                            totalCount={filteredCompanies.length}
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

