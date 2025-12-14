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

const DEFAULT_LOCATION = { label: 'Tất cả thành phố', value: null };

export default function SearchBar({
    onSearch,
    placeholder = "Job title, keywords, or company",
    locationPlaceholder = "City, state, or remote",
    showLocation = true,
    fullWidth = true,
    initialKeyword = '',
    initialLocation = DEFAULT_LOCATION
}) {
    const provinces = useSelector(state => state.address.provinces);
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState(initialKeyword || '');
    const [location, setLocation] = useState(initialLocation || DEFAULT_LOCATION);

    // If parent updates initial values (e.g. URL changed), sync local state
    useEffect(() => {
        setKeyword(initialKeyword || '');
    }, [initialKeyword]);

    useEffect(() => {
        setLocation(initialLocation || DEFAULT_LOCATION);
    }, [initialLocation]);

    useEffect(() => {
        dispatch(getProvinces());
    }, [dispatch]);

    const handleSearch = () => {
        if (!location.value) {
            onSearch({ keyword, location: null });
            return;
        }
        onSearch({ keyword, location });
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const provinceList = React.useMemo(() => {
        if (!provinces) return [];
        if (Array.isArray(provinces)) return provinces;
        if (Array.isArray(provinces.data)) return provinces.data;
        if (Array.isArray(provinces.provinces)) return provinces.provinces;
        return [];
    }, [provinces]);

    const options = React.useMemo(() => {
        return [
            DEFAULT_LOCATION,
            ...provinceList.map(province => ({
                label: province.name,
                value: province.id
            }))
        ];
    }, [provinceList]);

    return (
        <Paper
            elevation={0}
            sx={{
                bgcolor: 'transparent',
                borderRadius: 3,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 1, md: 1 },
                alignItems: "stretch",
                flexWrap: "wrap",
                maxWidth: "90%",
                width: "100%",
            }}
        >
            {showLocation && (
                <Box
                    sx={{
                        flex: 1,
                        minWidth: { xs: "100%", md: "25%", lg: "20%" },
                        width: { xs: "100%", md: "auto" },
                    }}
                >
                    <Autocomplete
                        options={options}
                        value={location || DEFAULT_LOCATION}
                        onChange={(event, newValue) => {
                            setLocation(newValue || DEFAULT_LOCATION);
                        }}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        getOptionLabel={(option) => option?.label || ''}
                        renderInput={(params) => (
                            <Input
                                {...params}
                                placeholder={locationPlaceholder}
                                onKeyPress={handleKeyPress}
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOn color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                inputProps={{
                                    ...params.inputProps,
                                }}
                            />
                        )}
                    />
                </Box>
            )}

            <Box
                sx={{
                    flex: 1,
                    minWidth: { xs: "100%", md: "55%", lg: "60%" },
                    width: { xs: "100%", md: "auto" },
                }}
            >
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

            <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                    minWidth: { xs: "100%", md: 120 },
                    width: { xs: "100%", md: "auto" },
                }}
            >
                Search
            </Button>
        </Paper>
    );

    // accept initial values from parent (e.g., from URL query) and sync when they change
    // add optional props handled by parent
}
