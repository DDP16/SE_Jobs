import React, { useState } from 'react';
import {
    Box,
    Paper,
    InputAdornment,
    IconButton,
    Divider
} from '@mui/material';
import { Search, LocationOn } from '@mui/icons-material';
import Input from '../common/Input';
import Button from '../common/Button';

export default function SearchBar({
    onSearch,
    placeholder = "Job title, keywords, or company",
    locationPlaceholder = "City, state, or remote",
    showLocation = true,
    fullWidth = true
}) {
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');

    const handleSearch = () => {
        onSearch({ keyword, location });
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

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
                        <Input
                            placeholder={locationPlaceholder}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            onKeyPress={handleKeyPress}
                            startAdornment={
                                <InputAdornment position="start">
                                    <LocationOn color="action" />
                                </InputAdornment>
                            }
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
