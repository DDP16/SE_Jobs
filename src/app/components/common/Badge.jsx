import React from 'react';
import { Chip } from '@mui/material';

export default function Badge({ 
  label, 
  color = 'primary', 
  variant = 'filled',
  size = 'small',
  clickable = false,
  onDelete,
  onClick,
  ...props 
}) {
  return (
    <Chip
      label={label}
      color={color}
      variant={variant}
      size={size}
      clickable={clickable}
      onDelete={onDelete}
      onClick={onClick}
      {...props}
    />
  );
}
