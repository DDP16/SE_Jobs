import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import CompanyListHero from './partials/CompanyListHero';
import CompanyFilters from './partials/CompanyFilters';
import CompanyGrid from './partials/CompanyGrid';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanies } from '../../../modules';
import { getCompanyTypes } from '../../../modules/services/companyTypeService';

const DEFAULT_FILTER = {
    page: 1,
    limit: 9,
    keyword: '',
    company_type_ids: [],
    employee_count_from: 0,
    employee_count_to: 1000000,
}

export default function CompanyList() {
    const [sortBy, setSortBy] = useState('created_at:desc');
    const [filter, setFilter] = useState(DEFAULT_FILTER);
    const { companies, pagination } = useSelector(state => state.company);
    const dispatch = useDispatch();

    // Đếm số filter đang active (không bao gồm page và limit)
    const getActiveFilter = () => {
        let active = 0;

        if (filter.keyword && filter.keyword.trim() !== "") {
            active++;
        }

        if (filter.company_type_ids && filter.company_type_ids.length > 0) {
            active++;
        }

        if (filter.employee_count_from !== DEFAULT_FILTER.employee_count_from || 
            filter.employee_count_to !== DEFAULT_FILTER.employee_count_to) {
            active++;
        }

        return active;
    };

    const searchCompanies = async (filter, sortBy) => {
        const query = {
            page: filter.page,
            limit: filter.limit,
            company_type_ids: filter.company_type_ids.join(',') || '',
            keyword: filter.keyword || '',
            employee_count_from: filter.employee_count_from,
            employee_count_to: filter.employee_count_to,
        }

        if (sortBy) {
            query.order = sortBy;
        }

        dispatch(getCompanies(query));
    }

    useEffect(() => {
        dispatch(getCompanyTypes({ page: 1, limit: 10 }));
    }, [dispatch]);

    
    useEffect(() => {
        searchCompanies(filter, sortBy);
    }, [filter, sortBy]);

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            {/* Hero Section with Search */}
            <CompanyListHero
                onSearch={(keyword) => {
                    setFilter((prevFilter) => ({ 
                        ...prevFilter, 
                        keyword,
                        page: 1
                    }));
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
                            clearFilter={() => setFilter({ 
                                ...DEFAULT_FILTER,
                                page: 1
                            })}
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
                            page={filter.page}
                            totalPages={pagination.total_pages}
                            setFilter={setFilter}
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}