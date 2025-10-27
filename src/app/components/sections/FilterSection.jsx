import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormControlLabel,
    Checkbox,
    Slider,
    Button,
    Chip,
    Stack
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

export default function FilterSection({ onFilter }) {
    const [salaryRange, setSalaryRange] = useState([0, 10000]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);

    const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Remote'];
    const locations = ['Ho Chi Minh', 'Ha Noi', 'Da Nang', 'Remote', 'Other'];
    const companies = ['Google', 'Microsoft', 'Apple', 'Facebook', 'Amazon'];

    const handleTypeChange = (type) => {
        const newTypes = selectedTypes.includes(type)
            ? selectedTypes.filter(t => t !== type)
            : [...selectedTypes, type];
        setSelectedTypes(newTypes);
    };

    const handleLocationChange = (location) => {
        const newLocations = selectedLocations.includes(location)
            ? selectedLocations.filter(l => l !== location)
            : [...selectedLocations, location];
        setSelectedLocations(newLocations);
    };

    const handleCompanyChange = (company) => {
        const newCompanies = selectedCompanies.includes(company)
            ? selectedCompanies.filter(c => c !== company)
            : [...selectedCompanies, company];
        setSelectedCompanies(newCompanies);
    };

    const clearFilters = () => {
        setSelectedTypes([]);
        setSelectedLocations([]);
        setSelectedCompanies([]);
        setSalaryRange([0, 10000]);
    };

    return (
        <Box sx={{ width: '320px', flexShrink: 0 }}>
            <Paper
                elevation={2}
                sx={{
                    p: 3,
                    borderRadius: '12px',
                    position: 'sticky',
                    top: '24px',
                    backgroundColor: 'white',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '18px' }}>
                        Filters
                    </Typography>
                    <Button
                        variant="text"
                        size="small"
                        onClick={clearFilters}
                        sx={{
                            textTransform: 'none',
                            fontSize: '14px',
                            fontWeight: 500,
                            color: 'primary.main'
                        }}
                    >
                        Clear all
                    </Button>
                </Box>

                {/* Job Type */}
                <Accordion defaultExpanded sx={{ mb: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '15px' }}>
                            Job Type
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 1 }}>
                        <Stack spacing={1}>
                            {jobTypes.map((type) => (
                                <FormControlLabel
                                    key={type}
                                    control={
                                        <Checkbox
                                            checked={selectedTypes.includes(type)}
                                            onChange={() => handleTypeChange(type)}
                                            size="small"
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                                        />
                                    }
                                    label={
                                        <Typography variant="body2" sx={{ fontSize: '14px' }}>
                                            {type}
                                        </Typography>
                                    }
                                />
                            ))}
                        </Stack>
                    </AccordionDetails>
                </Accordion>

                {/* Location */}
                <Accordion defaultExpanded sx={{ mb: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '15px' }}>
                            Location
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 1 }}>
                        <Stack spacing={1}>
                            {locations.map((location) => (
                                <FormControlLabel
                                    key={location}
                                    control={
                                        <Checkbox
                                            checked={selectedLocations.includes(location)}
                                            onChange={() => handleLocationChange(location)}
                                            size="small"
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                                        />
                                    }
                                    label={
                                        <Typography variant="body2" sx={{ fontSize: '14px' }}>
                                            {location}
                                        </Typography>
                                    }
                                />
                            ))}
                        </Stack>
                    </AccordionDetails>
                </Accordion>

                {/* Salary Range */}
                <Accordion defaultExpanded sx={{ mb: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '15px' }}>
                            Salary Range
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 1 }}>
                        <Box sx={{ px: 2 }}>
                            <Slider
                                value={salaryRange}
                                onChange={(e, newValue) => setSalaryRange(newValue)}
                                valueLabelDisplay="auto"
                                min={0}
                                max={10000}
                                step={500}
                                marks={[
                                    { value: 0, label: '$0' },
                                    { value: 5000, label: '$5K' },
                                    { value: 10000, label: '$10K+' }
                                ]}
                                sx={{
                                    '& .MuiSlider-markLabel': {
                                        fontSize: '12px'
                                    }
                                }}
                            />
                        </Box>
                    </AccordionDetails>
                </Accordion>

                {/* Company */}
                <Accordion sx={{ mb: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '15px' }}>
                            Company
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 1 }}>
                        <Stack spacing={1}>
                            {companies.map((company) => (
                                <FormControlLabel
                                    key={company}
                                    control={
                                        <Checkbox
                                            checked={selectedCompanies.includes(company)}
                                            onChange={() => handleCompanyChange(company)}
                                            size="small"
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                                        />
                                    }
                                    label={
                                        <Typography variant="body2" sx={{ fontSize: '14px' }}>
                                            {company}
                                        </Typography>
                                    }
                                />
                            ))}
                        </Stack>
                    </AccordionDetails>
                </Accordion>

                {/* Active Filters */}
                {(selectedTypes.length > 0 || selectedLocations.length > 0 || selectedCompanies.length > 0) && (
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                            Active Filters:
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {selectedTypes.map((type) => (
                                <Chip
                                    key={type}
                                    label={type}
                                    size="small"
                                    onDelete={() => handleTypeChange(type)}
                                />
                            ))}
                            {selectedLocations.map((location) => (
                                <Chip
                                    key={location}
                                    label={location}
                                    size="small"
                                    onDelete={() => handleLocationChange(location)}
                                />
                            ))}
                            {selectedCompanies.map((company) => (
                                <Chip
                                    key={company}
                                    label={company}
                                    size="small"
                                    onDelete={() => handleCompanyChange(company)}
                                />
                            ))}
                        </Stack>
                    </Box>
                )}
            </Paper>
        </Box>
    );
}
