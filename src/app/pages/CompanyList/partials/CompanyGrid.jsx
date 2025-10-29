import React from 'react';
import {
    Box,
    Typography,
    Grid,
    FormControl,
    Select,
    MenuItem,
    IconButton,
    Paper,
    Stack,
    Pagination
} from '@mui/material';
import {
    GridView,
    ViewList,
    Sort
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import CompanyCard from '../../../components/features/CompanyCard';
import { sortType, viewMode as viewModeEnum } from '../../../lib';

export default function CompanyGrid({
    companies = [],
    sortBy = sortType.featured,
    onSortChange,
    viewMode = viewModeEnum.grid,
    onViewModeChange,
    totalCount = 0
}) {
    const navigate = useNavigate();
    const [page, setPage] = React.useState(1);
    const companiesPerPage = 12;

    const handleCompanyClick = (company) => {
        navigate(`/company/${company.id}`);
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

                <Stack direction="row" spacing={2} alignItems="center">
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
                                <MenuItem value={sortType.featured}>Featured</MenuItem>
                                <MenuItem value={sortType.jobs}>Most Jobs</MenuItem>
                                <MenuItem value={sortType.name}>Name (A-Z)</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* View Mode Toggle */}
                    <Box
                        sx={{
                            display: { xs: 'none', sm: 'flex' },
                            gap: 0.5,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            p: 0.5
                        }}
                    >
                        <IconButton
                            size="small"
                            onClick={() => onViewModeChange(viewModeEnum.grid)}
                            sx={{
                                bgcolor: viewMode === viewModeEnum.grid ? 'primary.main' : 'transparent',
                                color: viewMode === viewModeEnum.grid ? 'white' : 'text.secondary',
                                '&:hover': {
                                    bgcolor: viewMode === viewModeEnum.grid ? 'primary.dark' : 'action.hover'
                                }
                            }}
                        >
                            <GridView fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() => onViewModeChange(viewModeEnum.list)}
                            sx={{
                                bgcolor: viewMode === viewModeEnum.list ? 'primary.main' : 'transparent',
                                color: viewMode === viewModeEnum.list ? 'white' : 'text.secondary',
                                '&:hover': {
                                    bgcolor: viewMode === viewModeEnum.list ? 'primary.dark' : 'action.hover'
                                }
                            }}
                        >
                            <ViewList fontSize="small" />
                        </IconButton>
                    </Box>
                </Stack>
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
                    {viewMode === viewModeEnum.grid ? (
                        // Grid View
                        <Grid container spacing={{ xs: 2, md: 3 }}>
                            {paginatedCompanies.map((company) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    lg={4}
                                    key={company.id}
                                >
                                    <CompanyCard
                                        company={company}
                                        onClick={handleCompanyClick}
                                        showStats={true}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        // List View
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 } }}>
                            {paginatedCompanies.map((company) => (
                                <CompanyCard
                                    key={company.id}
                                    company={company}
                                    onClick={handleCompanyClick}
                                    showStats={true}
                                />
                            ))}
                        </Box>
                    )}

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

