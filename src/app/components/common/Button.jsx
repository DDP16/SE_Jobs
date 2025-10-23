import React from 'react';
import { Button as MuiButton } from '@mui/material';

export default function Button({
    children,
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    fullWidth = false,
    disabled = false,
    startIcon,
    endIcon,
    onClick,
    ...props
}) {
    return (
        <MuiButton
            variant={variant}
            color={color}
            size={size}
            fullWidth={fullWidth}
            disabled={disabled}
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            {...props}
        >
            {children}
        </MuiButton>
    );
}
