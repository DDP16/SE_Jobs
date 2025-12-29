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

// Hard-coded TopCV city list
const TOPCV_CITIES = [
    { id: 1, name: "Hà Nội" },
    { id: 2, name: "Hồ Chí Minh" },
    { id: 3, name: "Bình Dương" },
    { id: 4, name: "Bắc Ninh" },
    { id: 5, name: "Đồng Nai" },
    { id: 6, name: "Hưng Yên" },
    { id: 7, name: "Hải Dương" },
    { id: 8, name: "Đà Nẵng" },
    { id: 9, name: "Hải Phòng" },
    { id: 10, name: "An Giang" },
    { id: 11, name: "Bà Rịa-Vũng Tàu" },
    { id: 12, name: "Bắc Giang" },
    { id: 13, name: "Bắc Kạn" },
    { id: 14, name: "Bạc Liêu" },
    { id: 15, name: "Bến Tre" },
    { id: 16, name: "Bình Định" },
    { id: 17, name: "Bình Phước" },
    { id: 18, name: "Bình Thuận" },
    { id: 19, name: "Cà Mau" },
    { id: 20, name: "Cần Thơ" },
    { id: 21, name: "Cao Bằng" },
    { id: 22, name: "Cửu Long" },
    { id: 23, name: "Đắk Lắk" },
    { id: 24, name: "Đắc Nông" },
    { id: 25, name: "Điện Biên" },
    { id: 26, name: "Đồng Tháp" },
    { id: 27, name: "Gia Lai" },
    { id: 28, name: "Hà Giang" },
    { id: 29, name: "Hà Nam" },
    { id: 30, name: "Hà Tĩnh" },
    { id: 31, name: "Hậu Giang" },
    { id: 32, name: "Hòa Bình" },
    { id: 33, name: "Khánh Hòa" },
    { id: 34, name: "Kiên Giang" },
    { id: 35, name: "Kon Tum" },
    { id: 36, name: "Lai Châu" },
    { id: 37, name: "Lâm Đồng" },
    { id: 38, name: "Lạng Sơn" },
    { id: 39, name: "Lào Cai" },
    { id: 40, name: "Long An" },
    { id: 41, name: "Miền Bắc" },
    { id: 42, name: "Miền Nam" },
    { id: 43, name: "Miền Trung" },
    { id: 44, name: "Nam Định" },
    { id: 45, name: "Nghệ An" },
    { id: 46, name: "Ninh Bình" },
    { id: 47, name: "Ninh Thuận" },
    { id: 48, name: "Phú Thọ" },
    { id: 49, name: "Phú Yên" },
    { id: 50, name: "Quảng Bình" },
    { id: 51, name: "Quảng Nam" },
    { id: 52, name: "Quảng Ngãi" },
    { id: 53, name: "Quảng Ninh" },
    { id: 54, name: "Quảng Trị" },
    { id: 55, name: "Sóc Trăng" },
    { id: 56, name: "Sơn La" },
    { id: 57, name: "Tây Ninh" },
    { id: 58, name: "Thái Bình" },
    { id: 59, name: "Thái Nguyên" },
    { id: 60, name: "Thanh Hóa" },
    { id: 61, name: "Thừa Thiên Huế" },
    { id: 62, name: "Tiền Giang" },
    { id: 63, name: "Toàn Quốc" },
    { id: 64, name: "Trà Vinh" },
    { id: 65, name: "Tuyên Quang" },
    { id: 66, name: "Vĩnh Long" },
    { id: 67, name: "Vĩnh Phúc" },
    { id: 68, name: "Yên Bái" },
    { id: 100, name: "Nước Ngoài" },
];

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
    const [keyword, setKeyword] = useState(initialKeyword || '');
    const [location, setLocation] = useState(initialLocation || DEFAULT_LOCATION);

    // If parent updates initial values (e.g. URL changed), sync local state
    useEffect(() => {
        setKeyword(initialKeyword || '');
    }, [initialKeyword]);

    useEffect(() => {
        setLocation(initialLocation || DEFAULT_LOCATION);
    }, [initialLocation]);

    const normalizeText = (text) => {
        return text.trim().replace(/\s+/g, ' ');
    };

    const handleSearch = () => {
        const normalizedKeyword = normalizeText(keyword);
        if (!location.value) {
            onSearch({ keyword: normalizedKeyword, location: null });
            return;
        }
        onSearch({ keyword: normalizedKeyword, location });
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const options = React.useMemo(() => {
        return [
            DEFAULT_LOCATION,
            ...TOPCV_CITIES.map(city => ({
                label: city.name,
                value: city.id
            }))
        ];
    }, []);

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
