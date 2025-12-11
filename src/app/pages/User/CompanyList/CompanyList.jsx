import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import CompanyListHero from './partials/CompanyListHero';
import CompanyFilters from './partials/CompanyFilters';
import CompanyGrid from './partials/CompanyGrid';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanies } from '../../../modules';
import { getCompanyTypes } from '../../../modules/services/companyTypeService';

const DEFAULT_FILTER = {
    keyword: '',
    company_type_ids: [],
    employee_count: '',
}
export default function CompanyList() {
    const [sortBy, setSortBy] = useState('created_at:desc');
    const [filter, setFilter] = useState(DEFAULT_FILTER);
    const companies = useSelector(state => state.company.companies);

    const dispatch = useDispatch();

    const getActiveFilter = () => {
        let active = 0;

        Object.keys(filter).forEach((key) => {
            const value = filter[key];

            if (typeof value === "string" && value.trim() !== "") {
                active++;
            }
            else if (Array.isArray(value) && value.length > 0) {
                active++;
            }
            else if (typeof value === "number" && value !== 0) {
                active++;
            }
        });

        return active;
    };

    const searchCompanies = async (filter, sortBy) => {
        const query = {
            page: 1,
            limit: 10,
            company_type_ids: filter.company_type_ids.join(',') || '',
            keyword: filter.keyword,
            employee_count_from: filter.employee_count ? filter.employee_count.split(":")[0] : 0,
            employee_count_to: filter.employee_count ? filter.employee_count.split(":")[1] : 1000000,
        }

        if (sortBy) {
            query.order = sortBy;
        }
        dispatch(getCompanies(query));
    }

    useEffect(() => {
        dispatch(getCompanyTypes());
    }, [dispatch])

    useEffect(() => {
        searchCompanies(filter, sortBy);
    }, [filter, sortBy])

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            {/* Hero Section with Search */}
            <CompanyListHero
                onSearch={(keyword) => {
                    setFilter((filter) => ({ ...filter, keyword }));
                }}
                searchKeyword={filter.keyword}
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
                            clearFilter={() => setFilter(DEFAULT_FILTER)}
                            setFilter={setFilter}
                            filter={filter}
                            activeFiltersCount={getActiveFilter()}
                        />
                    </Box>

                    {/* Company Grid */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <CompanyGrid
                            companies={companies}
                            sortBy={sortBy}
                            onSortChange={setSortBy}
                            totalCount={companies.length}
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

