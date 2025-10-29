import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Divider,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip
} from '@mui/material';
import {
    ExpandMore,
    FilterList,
    Clear
} from '@mui/icons-material';

export default function CompanyFilters({
    selectedIndustries = [],
    selectedSizes = [],
    selectedLocations = [],
    onIndustryChange,
    onSizeChange,
    onLocationChange,
    onClearFilters,
    activeFiltersCount = 0
}) {
    const [expandedPanels, setExpandedPanels] = useState(['industry', 'size', 'location']);

    const industries = [
        'Technology',
        'Cloud Storage',
        'Productivity',
        'Finance',
        'Healthcare',
        'Education',
        'E-commerce',
        'Marketing'
    ];

    const companySizes = [
        '1-10 employees',
        '10-50 employees',
        '50-200 employees',
        '200-500 employees',
        '500-1000 employees',
        '1000+ employees'
    ];

    const locations = [
        'USA',
        'Remote',
        'France',
        'UK',
        'Germany',
        'Canada',
        'Singapore',
        'Vietnam'
    ];

    const handlePanelChange = (panel) => (event, isExpanded) => {
        setExpandedPanels(prev =>
            isExpanded
                ? [...prev, panel]
                : prev.filter(p => p !== panel)
        );
    };

    const handleIndustryToggle = (industry) => {
        const newSelection = selectedIndustries.includes(industry)
            ? selectedIndustries.filter(i => i !== industry)
            : [...selectedIndustries, industry];
        onIndustryChange(newSelection);
    };

    const handleSizeToggle = (size) => {
        const newSelection = selectedSizes.includes(size)
            ? selectedSizes.filter(s => s !== size)
            : [...selectedSizes, size];
        onSizeChange(newSelection);
    };

    const handleLocationToggle = (location) => {
        const newSelection = selectedLocations.includes(location)
            ? selectedLocations.filter(l => l !== location)
            : [...selectedLocations, location];
        onLocationChange(newSelection);
    };

    return (
        <Paper
            elevation={0}
            sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                overflow: 'hidden',
                position: 'sticky',
                top: 16
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    p: 2,
                    bgcolor: 'background.default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FilterList color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Filters
                    </Typography>
                    {activeFiltersCount > 0 && (
                        <Chip
                            label={activeFiltersCount}
                            size="small"
                            color="primary"
                            sx={{ height: 20, minWidth: 20 }}
                        />
                    )}
                </Box>
                {activeFiltersCount > 0 && (
                    <Button
                        size="small"
                        startIcon={<Clear />}
                        onClick={onClearFilters}
                        sx={{ textTransform: 'none' }}
                    >
                        Clear
                    </Button>
                )}
            </Box>

            <Divider />

            {/* Industry Filter */}
            <Accordion
                expanded={expandedPanels.includes('industry')}
                onChange={handlePanelChange('industry')}
                elevation={0}
                disableGutters
            >
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography sx={{ fontWeight: 600 }}>Industry</Typography>
                    {selectedIndustries.length > 0 && (
                        <Chip
                            label={selectedIndustries.length}
                            size="small"
                            color="primary"
                            sx={{ ml: 1, height: 20 }}
                        />
                    )}
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0 }}>
                    <FormGroup>
                        {industries.map((industry) => (
                            <FormControlLabel
                                key={industry}
                                control={
                                    <Checkbox
                                        checked={selectedIndustries.includes(industry)}
                                        onChange={() => handleIndustryToggle(industry)}
                                        size="small"
                                    />
                                }
                                label={
                                    <Typography variant="body2">{industry}</Typography>
                                }
                            />
                        ))}
                    </FormGroup>
                </AccordionDetails>
            </Accordion>

            <Divider />

            {/* Company Size Filter */}
            <Accordion
                expanded={expandedPanels.includes('size')}
                onChange={handlePanelChange('size')}
                elevation={0}
                disableGutters
            >
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography sx={{ fontWeight: 600 }}>Company Size</Typography>
                    {selectedSizes.length > 0 && (
                        <Chip
                            label={selectedSizes.length}
                            size="small"
                            color="primary"
                            sx={{ ml: 1, height: 20 }}
                        />
                    )}
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0 }}>
                    <FormGroup>
                        {companySizes.map((size) => (
                            <FormControlLabel
                                key={size}
                                control={
                                    <Checkbox
                                        checked={selectedSizes.includes(size)}
                                        onChange={() => handleSizeToggle(size)}
                                        size="small"
                                    />
                                }
                                label={
                                    <Typography variant="body2">{size}</Typography>
                                }
                            />
                        ))}
                    </FormGroup>
                </AccordionDetails>
            </Accordion>

            <Divider />

            {/* Location Filter */}
            <Accordion
                expanded={expandedPanels.includes('location')}
                onChange={handlePanelChange('location')}
                elevation={0}
                disableGutters
            >
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography sx={{ fontWeight: 600 }}>Location</Typography>
                    {selectedLocations.length > 0 && (
                        <Chip
                            label={selectedLocations.length}
                            size="small"
                            color="primary"
                            sx={{ ml: 1, height: 20 }}
                        />
                    )}
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0 }}>
                    <FormGroup>
                        {locations.map((location) => (
                            <FormControlLabel
                                key={location}
                                control={
                                    <Checkbox
                                        checked={selectedLocations.includes(location)}
                                        onChange={() => handleLocationToggle(location)}
                                        size="small"
                                    />
                                }
                                label={
                                    <Typography variant="body2">{location}</Typography>
                                }
                            />
                        ))}
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
        </Paper>
    );
}

