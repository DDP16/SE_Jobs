import React, { useMemo, useState, useRef, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    useMediaQuery,
    Chip,
    Slider,
    TextField,
    Checkbox,
    FormControlLabel
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function FilterDialog({
    open = false,
    title = 'Filter',
    onClose,
    onApply,
    maxWidth = 'md',
    focusSection = null, // 'level', 'workingModel', 'salary', 'jobDomain', 'companyIndustry'
    // Option sources (can be injected from parent later)
    levelOptions,
    workingModelOptions,
    jobDomainOptions,
    companyIndustryOptions,
    salaryMin = 500,
    salaryMax = 10000
}) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    // Defaults
    const defaultLevels = useMemo(() => levelOptions || ['Fresher', 'Junior', 'Senior', 'Manager'], [levelOptions]);
    const defaultWorkingModels = useMemo(() => workingModelOptions || ['At office', 'Remote', 'Hybrid'], [workingModelOptions]);
    const defaultJobDomains = useMemo(
        () => jobDomainOptions || [
            'Blockchain & Web3 Services',
            'Food and Beverage',
            'Tourism and Hospitality Services',
            'Insurance',
            'Consumer Goods'
        ],
        [jobDomainOptions]
    );
    const defaultCompanyIndustries = useMemo(
        () => companyIndustryOptions || [
            'Information Technology',
            'Healthcare',
            'Education',
            'Finance',
            'E-commerce'
        ],
        [companyIndustryOptions]
    );

    // Refs for scroll to section
    const levelRef = useRef(null);
    const workingModelRef = useRef(null);
    const salaryRef = useRef(null);
    const jobDomainRef = useRef(null);
    const companyIndustryRef = useRef(null);

    // State
    const [selectedLevels, setSelectedLevels] = useState([]);
    const [selectedWorkingModels, setSelectedWorkingModels] = useState([]);
    const [salaryRange, setSalaryRange] = useState([salaryMin, salaryMax]);
    const [searchDomain, setSearchDomain] = useState('');
    const [selectedDomains, setSelectedDomains] = useState([]);
    const [searchIndustry, setSearchIndustry] = useState('');
    const [selectedIndustries, setSelectedIndustries] = useState([]);

    const filteredDomains = useMemo(
        () => defaultJobDomains.filter((d) => d.toLowerCase().includes(searchDomain.toLowerCase())),
        [defaultJobDomains, searchDomain]
    );
    const filteredIndustries = useMemo(
        () => defaultCompanyIndustries.filter((d) => d.toLowerCase().includes(searchIndustry.toLowerCase())),
        [defaultCompanyIndustries, searchIndustry]
    );

    // Auto scroll to focused section when dialog opens
    useEffect(() => {
        if (open && focusSection) {
            setTimeout(() => {
                const refMap = {
                    level: levelRef,
                    workingModel: workingModelRef,
                    salary: salaryRef,
                    jobDomain: jobDomainRef,
                    companyIndustry: companyIndustryRef
                };

                const targetRef = refMap[focusSection];
                if (targetRef?.current) {
                    targetRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 300); // Wait for dialog animation
        }
    }, [open, focusSection]);

    const toggleArrayValue = (arr, setArr, value) => {
        if (arr.includes(value)) {
            setArr(arr.filter((v) => v !== value));
        } else {
            setArr([...arr, value]);
        }
    };

    const handleReset = () => {
        setSelectedLevels([]);
        setSelectedWorkingModels([]);
        setSalaryRange([salaryMin, salaryMax]);
        setSearchDomain('');
        setSelectedDomains([]);
        setSearchIndustry('');
        setSelectedIndustries([]);
    };

    const handleApply = () => {
        onApply?.({
            levels: selectedLevels,
            workingModels: selectedWorkingModels,
            salary: { min: salaryRange[0], max: salaryRange[1] },
            jobDomains: selectedDomains,
            companyIndustries: selectedIndustries
        });
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth={maxWidth}
            fullScreen={fullScreen}
            PaperProps={{
                className: 'bg-white rounded-none md:rounded-2xl max-h-screen md:max-h-[90vh]',
                sx: {
                    '& .MuiDialogContent-root': {
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: '#f3f4f6',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#d1d5db',
                            borderRadius: '4px',
                            '&:hover': {
                                backgroundColor: '#9ca3af',
                            }
                        }
                    }
                }
            }}
        >
            <DialogTitle className="bg-white px-6 md:px-8 py-5 md:py-6 font-semibold text-xl md:text-2xl border-b border-gray-200">
                {title}
            </DialogTitle>

            <DialogContent className="bg-white px-6 md:px-8 py-6 md:py-8">
                {/* Level */}
                <div ref={levelRef} className="mb-7">
                    <h3 className="text-base font-semibold mb-3.5 text-gray-900">
                        Level
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                        {defaultLevels.map((lvl) => (
                            <Chip
                                key={lvl}
                                label={lvl}
                                onClick={() => toggleArrayValue(selectedLevels, setSelectedLevels, lvl)}
                                color={selectedLevels.includes(lvl) ? 'primary' : 'default'}
                                variant={selectedLevels.includes(lvl) ? 'filled' : 'outlined'}
                                className={`transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${selectedLevels.includes(lvl) ? 'font-semibold' : 'font-normal'
                                    }`}
                                sx={{
                                    height: '36px',
                                    fontSize: '0.875rem'
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Working Model */}
                <div ref={workingModelRef} className="mb-7">
                    <h3 className="text-base font-semibold mb-3.5 text-gray-900">
                        Working Model
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                        {defaultWorkingModels.map((wm) => (
                            <Chip
                                key={wm}
                                label={wm}
                                onClick={() => toggleArrayValue(selectedWorkingModels, setSelectedWorkingModels, wm)}
                                color={selectedWorkingModels.includes(wm) ? 'primary' : 'default'}
                                variant={selectedWorkingModels.includes(wm) ? 'filled' : 'outlined'}
                                className={`transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${selectedWorkingModels.includes(wm) ? 'font-semibold' : 'font-normal'
                                    }`}
                                sx={{
                                    height: '36px',
                                    fontSize: '0.875rem'
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Salary */}
                <div ref={salaryRef} className="mb-7 pb-6 border-b border-gray-100">
                    <h3 className="text-base font-semibold mb-3.5 text-gray-900">
                        Salary Range
                    </h3>
                    <div className="bg-blue-50 rounded-lg px-4 py-3 mb-4">
                        <p className="text-lg font-semibold text-blue-700">
                            ${salaryRange[0].toLocaleString()} - ${salaryRange[1].toLocaleString()}
                        </p>
                    </div>
                    <div className="px-2">
                        <Slider
                            value={salaryRange}
                            onChange={(_, v) => setSalaryRange(v)}
                            valueLabelDisplay="auto"
                            valueLabelFormat={(value) => `$${value.toLocaleString()}`}
                            min={salaryMin}
                            max={salaryMax}
                            step={100}
                            sx={{
                                color: 'primary.main',
                                '& .MuiSlider-thumb': {
                                    width: 20,
                                    height: 20,
                                },
                                '& .MuiSlider-valueLabel': {
                                    fontSize: '0.875rem',
                                    fontWeight: 600
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Job Domain */}
                <div ref={jobDomainRef} className="mb-7">
                    <h3 className="text-base font-semibold mb-3.5 text-gray-900">
                        Job Domain
                    </h3>
                    <TextField
                        placeholder="Search domain..."
                        size="small"
                        fullWidth
                        value={searchDomain}
                        onChange={(e) => setSearchDomain(e.target.value)}
                        className="mb-4"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                            }
                        }}
                    />
                    <div className="border border-gray-200 rounded-lg p-3 max-h-[200px] overflow-auto bg-gray-50/50 shadow-sm">
                        {filteredDomains.length > 0 ? (
                            <div className="space-y-1">
                                {filteredDomains.map((d) => (
                                    <FormControlLabel
                                        key={d}
                                        control={
                                            <Checkbox
                                                checked={selectedDomains.includes(d)}
                                                onChange={() => toggleArrayValue(selectedDomains, setSelectedDomains, d)}
                                                size="small"
                                            />
                                        }
                                        label={<span className="text-sm text-gray-700">{d}</span>}
                                        className="mx-0 hover:bg-white rounded-md px-2 py-1.5 transition-colors w-full block"
                                        sx={{ margin: 0, display: 'flex' }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 py-8 text-center">
                                No domains found
                            </p>
                        )}
                    </div>
                </div>

                {/* Company Industry */}
                <div ref={companyIndustryRef}>
                    <h3 className="text-base font-semibold mb-3.5 text-gray-900">
                        Company Industry
                    </h3>
                    <TextField
                        placeholder="Search industry..."
                        size="small"
                        fullWidth
                        value={searchIndustry}
                        onChange={(e) => setSearchIndustry(e.target.value)}
                        className="mb-4"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                            }
                        }}
                    />
                    <div className="border border-gray-200 rounded-lg p-3 max-h-[200px] overflow-auto bg-gray-50/50 shadow-sm">
                        {filteredIndustries.length > 0 ? (
                            <div className="space-y-1">
                                {filteredIndustries.map((d) => (
                                    <FormControlLabel
                                        key={d}
                                        control={
                                            <Checkbox
                                                checked={selectedIndustries.includes(d)}
                                                onChange={() => toggleArrayValue(selectedIndustries, setSelectedIndustries, d)}
                                                size="small"
                                            />
                                        }
                                        label={<span className="text-sm text-gray-700">{d}</span>}
                                        className="mx-0 hover:bg-white rounded-md px-2 py-1.5 transition-colors w-full block"
                                        sx={{ margin: 0, display: 'flex' }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 py-8 text-center">
                                No industries found
                            </p>
                        )}
                    </div>
                </div>
            </DialogContent>

            {/* Footer Actions */}
            <DialogActions className="bg-white px-6 md:px-8 py-4 md:py-5 border-t border-gray-200 gap-3">
                <Button
                    onClick={handleReset}
                    color="inherit"
                    className="normal-case font-medium text-gray-600 hover:text-gray-900"
                >
                    Reset All
                </Button>
                <div className="grow" />
                <Button
                    onClick={onClose}
                    variant="outlined"
                    className="normal-case font-medium px-5"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleApply}
                    variant="contained"
                    color="primary"
                    className="normal-case font-semibold px-8"
                >
                    Apply Filters
                </Button>
            </DialogActions>
        </Dialog>
    );
}


