import React, { useEffect, useState } from 'react';
import {
    Box,
    Paper,
    InputAdornment,
    Divider,
    Autocomplete
} from '@mui/material';
import { Search, LocationOn } from '@mui/icons-material';
import Input from '../common/Input';
import Button from '../common/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getProvinces } from '../../modules/services/addressService';

export default function SearchBar({
    onSearch,
    placeholder = "Job title, keywords, or company",
    locationPlaceholder = "City, state, or remote",
    showLocation = true,
    fullWidth = true
}) {
    const provinces = useSelector(state => state.address.provinces);
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('Tất cả thành phố');

    useEffect(() => {
        dispatch(getProvinces());
    }, [dispatch]);

    const handleSearch = () => {
        if (location === 'Tất cả thành phố') {
            onSearch({ keyword, location: '' });
            return;
        }
        onSearch({ keyword, location });
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    // Normalize provinces shape to an array of objects or strings
    const provinceList = React.useMemo(() => {
        if (!provinces) return [];
        if (Array.isArray(provinces)) return provinces;
        if (Array.isArray(provinces.data)) return provinces.data;
        if (Array.isArray(provinces.provinces)) return provinces.provinces;
        return [];
    }, [provinces]);

    // build option strings and ensure default 'Tất cả thành phố' is present
    const optionStrings = (provinceList || []).map(p =>
        typeof p === 'string' ? p : (p.name || p.title || p.province_name || '')
    ).filter(Boolean);

    const options = React.useMemo(() => {
        const arr = ['Tất cả thành phố', ...optionStrings];
        return Array.from(new Set(arr));
    }, [optionStrings]);

    return (
        <Paper
            elevation={2}
            sx={{
                p: { xs: 1.5, md: 2 },
                borderRadius: 2,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 1, md: 1 },
                alignItems: { xs: 'stretch', md: 'center' },
                flexWrap: 'wrap',
                maxWidth: '100%',
                width: '100%'
            }}
        >
            <Box sx={{
                flex: 1,
                minWidth: { xs: '100%', md: 200 },
                width: { xs: '100%', md: 'auto' }
            }}>
                <Input
                    placeholder={placeholder}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    startAdornment={
                        <InputAdornment position="start">
                            <Search color="action" />
                        </InputAdornment>
                    }
                />
            </Box>

            {showLocation && (
                <>
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                            display: { xs: 'none', md: 'block' }
                        }}
                    />
                    <Box sx={{
                        flex: 1,
                        minWidth: { xs: '100%', md: 200 },
                        width: { xs: '100%', md: 'auto' }
                    }}>
                        <Autocomplete
                            freeSolo
                            options={options}
                            value={location}
                            onChange={(event, newValue) => setLocation(newValue || '')}
                            onInputChange={(event, newInput) => setLocation(newInput)}
                            disableClearable={false}
                            renderInput={(params) => (
                                <Input
                                    {...params}
                                    placeholder={locationPlaceholder}
                                    onKeyPress={handleKeyPress}
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        // keep Autocomplete's InputProps (clear button, etc.) and add our start adornment
                                        ...params.InputProps,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LocationOn color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    inputProps={{
                                        ...params.inputProps
                                    }}
                                />
                            )}
                        />
                    </Box>
                </>
            )}

            <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                    minWidth: { xs: '100%', md: 120 },
                    width: { xs: '100%', md: 'auto' }
                }}
            >
                Search
            </Button>
        </Paper>
    );
}
