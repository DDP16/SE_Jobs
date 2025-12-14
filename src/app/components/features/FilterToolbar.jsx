import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Stack,
    Button,
    Badge,
    Menu,
    MenuItem,
    Checkbox,
    FormControlLabel,
    Divider,
    Typography
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import { getLevels } from '../../modules/services/levelsService';
import { getEmploymentTypes } from '../../modules/services/employmentTypeService';
import { getCategories } from '../../modules/services/categoriesService';

export default function FilterToolbar({
    onFilterClick,
    onQuickFilterClick,
    onQuickFilterChange,
    onClearFilter,
    activeFilterCount = 0,
    appliedFilters = null,
    showQuickFilters = true,
    className = ''
}) {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeMenu, setActiveMenu] = useState(null);
    
    // Fetch filter options from Redux
    const levels = useSelector((state) => state.levels?.levels || []);
    const employmentTypes = useSelector((state) => state.employmentTypes?.employmentTypes || []);
    const categories = useSelector((state) => state.categories?.categories || []);
    
    useEffect(() => {
        dispatch(getLevels());
        dispatch(getEmploymentTypes());
        dispatch(getCategories());
    }, [dispatch]);
    
    // Define filter options with API data
    const filterOptions = [
        { 
            id: 'levels', 
            label: 'Level', 
            options: levels.map(l => ({ id: l.id, name: l.name }))
        },
        { 
            id: 'workingModels', 
            label: 'Working Model', 
            options: employmentTypes.map(t => ({ id: t.id, name: t.name }))
        },
        { 
            id: 'jobDomains', 
            label: 'Job Domain', 
            options: categories.map(c => ({ id: c.id, name: c.name }))
        },
        // { id: 'salary', label: 'Salary', options: null }
    ];

    const handleMenuOpen = (event, filterId) => {
        const option = filterOptions.find(opt => opt.id === filterId);

        // If no options (like Salary, Job Domain), open full filter dialog
        if (!option?.options) {
            if (onQuickFilterClick) {
                onQuickFilterClick(filterId);
            }
            return;
        }

        setAnchorEl(event.currentTarget);
        setActiveMenu(filterId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setActiveMenu(null);
    };

    const handleOptionToggle = (filterId, optionId) => {
        if (onQuickFilterChange) {
            onQuickFilterChange(filterId, optionId);
        }
    };

    const getSelectedValues = (filterId) => {
        if (!appliedFilters) return [];

        const filterMap = {
            levels: appliedFilters.levels || [],
            workingModels: appliedFilters.workingModels || [],
            jobDomains: appliedFilters.jobDomains || []
        };

        return filterMap[filterId] || [];
    };

    const handleQuickFilter = (filterId) => {
        if (onQuickFilterClick) {
            onQuickFilterClick(filterId);
        }
    };

    const activeOption = filterOptions.find(opt => opt.id === activeMenu);
    const selectedValues = activeMenu ? getSelectedValues(activeMenu) : [];

    // Helpers for selected labels
    const getSelectedNames = (filterId) => {
        if (!appliedFilters) return [];

        if (filterId === 'levels') {
            return (appliedFilters.levels || [])
                .map(id => levels.find(l => l.id === id)?.name)
                .filter(Boolean);
        }
        if (filterId === 'workingModels') {
            return (appliedFilters.workingModels || [])
                .map(id => employmentTypes.find(t => t.id === id)?.name)
                .filter(Boolean);
        }
        if (filterId === 'jobDomains') {
            return (appliedFilters.jobDomains || [])
                .map(id => categories.find(c => c.id === id)?.name)
                .filter(Boolean);
        }
        return [];
    };

    const buildLevelLabel = () => {
        const names = getSelectedNames('levels');
        if (!names.length) return 'Level';
        if (names.length === 1) return names[0];
        if (names.length === 2) return `${names[0]}, ${names[1]}`;
        return `${names[0]}, ${names[1]}, +${names.length - 2}`;
    };

    const clearFilter = (filterId) => {
        if (onClearFilter) {
            onClearFilter(filterId);
        }
    };

    return (
        <Box className={`bg-white rounded-xl p-2 md:p-3 shadow-sm border border-gray-100 ${className}`}>
            <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap alignItems="center">
                {showQuickFilters && filterOptions.map((option) => {
                    const hasSelection = getSelectedValues(option.id).length > 0;
                    const isLevel = option.id === 'levels';

                    return (
                        <React.Fragment key={option.id}>
                            <Button
                                variant="outlined"
                                size="medium"
                                onClick={(e) => handleMenuOpen(e, option.id)}
                                endIcon={option.options ? <KeyboardArrowDownIcon /> : null}
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: hasSelection ? 600 : 500,
                                    borderColor: hasSelection ? 'primary.main' : 'divider',
                                    color: hasSelection ? 'primary.main' : 'text.primary',
                                    backgroundColor: hasSelection ? 'primary.50' : 'transparent',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        backgroundColor: 'primary.50'
                                    }
                                }}
                            >
                                {isLevel && hasSelection ? buildLevelLabel() : option.label}
                                {!isLevel && hasSelection && (
                                    <Box
                                        component="span"
                                        sx={{
                                            ml: 1,
                                            px: 0.75,
                                        py: 0.25,
                                            borderRadius: '10px',
                                            backgroundColor: 'primary.main',
                                            color: 'white',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            lineHeight: 1
                                        }}
                                    >
                                        {getSelectedValues(option.id).length}
                                    </Box>
                                )}
                            </Button>
                        </React.Fragment>
                    );
                })}

                <Box sx={{ flexGrow: 1 }} />

                <Badge
                    color="error"
                    badgeContent={activeFilterCount}
                    invisible={activeFilterCount === 0}
                    sx={{
                        '& .MuiBadge-badge': {
                            fontWeight: 600
                        }
                    }}
                >
                    <Button
                        variant="contained"
                        size="medium"
                        onClick={onFilterClick}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 3
                        }}
                    >
                        Filter
                    </Button>
                </Badge>
            </Stack>

            {/* Dropdown Menu for quick filters */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && Boolean(activeMenu)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                PaperProps={{
                    sx: {
                        mt: 1,
                        minWidth: 200,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        borderRadius: 2,
                        '& .MuiList-root': {
                            py: 1
                        }
                    }
                }}
            >
                {activeOption?.options?.map((option) => (
                    <MenuItem
                        key={option.id}
                        onClick={() => handleOptionToggle(activeMenu, option.id)}
                        sx={{
                            py: 0.5,
                            px: 2,
                            '&:hover': {
                                backgroundColor: 'primary.50'
                            }
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedValues.includes(option.id)}
                                    size="small"
                                    sx={{ py: 0 }}
                                />
                            }
                            label={
                                <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                                    {option.name}
                                </Typography>
                            }
                            sx={{
                                margin: 0,
                                width: '100%',
                                '& .MuiFormControlLabel-label': {
                                    fontSize: '0.875rem'
                                }
                            }}
                        />
                    </MenuItem>
                ))}

                {selectedValues.length > 0 && <Divider sx={{ my: 0.5 }} />}
                
                {selectedValues.length > 0 && (
                    <MenuItem
                        onClick={() => {
                            clearFilter(activeMenu);
                            handleMenuClose();
                        }}
                        sx={{
                            py: 0.5,
                            px: 2,
                            color: 'error.main',
                            fontWeight: 600
                        }}
                    >
                        <CloseIcon fontSize="small" sx={{ mr: 1 }} />
                        Clear all
                    </MenuItem>
                )}
            </Menu>
        </Box>
    );
}
