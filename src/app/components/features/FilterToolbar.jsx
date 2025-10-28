import React, { useState } from 'react';
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

// Map filter IDs to match FilterDialog section refs
const FILTER_OPTIONS = [
    { id: 'level', label: 'Level', options: ['Fresher', 'Junior', 'Senior', 'Manager'] },
    { id: 'workingModel', label: 'Working Model', options: ['At office', 'Remote', 'Hybrid'] },
    { id: 'salary', label: 'Salary', options: null }, // null means special handling
    { id: 'jobDomain', label: 'Job Domain', options: null }
];


export default function FilterToolbar({
    onFilterClick,
    onQuickFilterClick,
    onQuickFilterChange,
    activeFilterCount = 0,
    appliedFilters = null,
    filterOptions = FILTER_OPTIONS,
    showQuickFilters = true,
    className = ''
}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeMenu, setActiveMenu] = useState(null);

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

    const handleOptionToggle = (filterId, value) => {
        if (onQuickFilterChange) {
            onQuickFilterChange(filterId, value);
        }
    };

    const getSelectedValues = (filterId) => {
        if (!appliedFilters) return [];

        const filterMap = {
            level: appliedFilters.levels || [],
            workingModel: appliedFilters.workingModels || []
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

    return (
        <Box className={`bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 ${className}`}>
            <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap alignItems="center">
                {showQuickFilters && filterOptions.map((option) => {
                    const hasSelection = getSelectedValues(option.id).length > 0;

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
                                {option.label}
                                {hasSelection && (
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
                {activeOption?.options?.map((optionValue, index) => (
                    <MenuItem
                        key={optionValue}
                        onClick={() => handleOptionToggle(activeMenu, optionValue)}
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
                                    checked={selectedValues.includes(optionValue)}
                                    size="small"
                                    sx={{ py: 0 }}
                                />
                            }
                            label={
                                <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                                    {optionValue}
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
            </Menu>
        </Box>
    );
}

// Export the default filter options for customization
export { FILTER_OPTIONS };

