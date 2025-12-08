import React from 'react';
import {
    Box,
    Typography,
    FormControl,
    Select,
    MenuItem,
    Paper,
    Stack,
    Pagination
} from '@mui/material';
import {
    Sort
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CompanyCard } from '../../../../components';
import { sortType } from '../../../../lib';

export default function CompanyGrid({
    companies = [],
    sortBy = sortType.featured,
    onSortChange,
    totalCount = 0
}) {
    const navigate = useNavigate();
    const [page, setPage] = React.useState(1);
    const companiesPerPage = 12;

    const handleCompanyClick = (company) => {
        navigate(`/company?id=${company.id}`);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Paginate companies
    const startIndex = (page - 1) * companiesPerPage;
    const endIndex = startIndex + companiesPerPage;
    const paginatedCompanies = companies.slice(startIndex, endIndex);
    const totalPages = Math.ceil(companies.length / companiesPerPage);

    return (
        <Box>
            {/* Toolbar */}
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    mb: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2
                }}
            >
                <Typography variant="body1" color="text.secondary">
                    <strong>{totalCount}</strong> {totalCount === 1 ? 'company' : 'companies'} found
                </Typography>

                {/* Sort Dropdown */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Sort sx={{ color: 'text.secondary', fontSize: 20 }} />
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <Select
                            value={sortBy}
                            onChange={(e) => onSortChange(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none'
                                }
                            }}
                        >
                            <MenuItem value={'created_at:desc'}>Newest</MenuItem>
                            <MenuItem value={'created_at:asc'}>Oldest</MenuItem>
                            <MenuItem value={'name:asc'}>Name (A-Z)</MenuItem>
                            <MenuItem value={'name:desc'}>Name (Z-A)</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Paper>

            {/* Companies Grid/List */}
            {paginatedCompanies.length === 0 ? (
                <Paper
                    elevation={0}
                    sx={{
                        p: 8,
                        textAlign: 'center',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2
                    }}
                >
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No companies found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Try adjusting your filters or search criteria
                    </Typography>
                </Paper>
            ) : (
                <>
                    {/* Grid View - 3 columns */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(3, 1fr)'
                            },
                            gap: { xs: 2, md: 3 }
                        }}
                    >
                        {paginatedCompanies.map((company) => (
                            <CompanyCard
                                key={company.id}
                                company={company}
                                onClick={handleCompanyClick}
                                showStats={true}
                            />
                        ))}
                    </Box>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mt: 4
                            }}
                        >
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                size="large"
                                showFirstButton
                                showLastButton
                            />
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
}

