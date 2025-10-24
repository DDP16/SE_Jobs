import React from 'react';
import { TextField } from '@mui/material';

export default function Input({
    label,
    placeholder,
    value,
    onChange,
    error,
    helperText,
    type = 'text',
    fullWidth = true,
    size = 'medium',
    variant = 'outlined',
    startAdornment,
    endAdornment,
    ...props
}) {
    return (
        <TextField
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}
            type={type}
            fullWidth={fullWidth}
            size={size}
            variant={variant}
            InputProps={{
                startAdornment,
                endAdornment,
            }}
            {...props}
        />
    );
}
