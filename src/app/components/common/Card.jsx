import React from 'react';
import { Card as MuiCard, CardContent, CardActions } from '@mui/material';

export default function Card({
    children,
    content,
    actions,
    elevation = 1,
    sx = {},
    ...props
}) {
    return (
        <MuiCard elevation={elevation} sx={sx} {...props}>
            {content && <CardContent>{content}</CardContent>}
            {children}
            {actions && <CardActions>{actions}</CardActions>}
        </MuiCard>
    );
}
