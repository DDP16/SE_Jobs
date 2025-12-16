import React from 'react';
import { useTranslation } from 'react-i18next';
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
    page,
    totalPages,
    sortBy = sortType.featured,
    onSortChange,
    setFilter
}) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleCompanyClick = (company) => {
        navigate(`/company?id=${company.id}`);
    };
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
                    {t("companyList.grid.companiesFound", { count: companies.length })}
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
                            <MenuItem value={'created_at:desc'}>{t("companyList.grid.sort.newest")}</MenuItem>
                            <MenuItem value={'created_at:asc'}>{t("companyList.grid.sort.oldest")}</MenuItem>
                            <MenuItem value={'name:asc'}>{t("companyList.grid.sort.nameAsc")}</MenuItem>
                            <MenuItem value={'name:desc'}>{t("companyList.grid.sort.nameDesc")}</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Paper>

            {/* Companies Grid/List */}
            {companies.length === 0 && (
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
                        {t("companyList.grid.noCompaniesFound")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t("companyList.grid.tryAdjustingFilters")}
                    </Typography>
                </Paper>
            )}
            {companies.length > 0 && (
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
                        {companies.map((company) => (
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
                                onChange={(e, val) =>    setFilter((filter => ({...filter, page: val })))}
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

