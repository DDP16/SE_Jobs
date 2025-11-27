import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Divider
} from '@mui/material';
import {
    Business,
    People,
    LocationOn
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

export default function CompanyInfo({ company = {} }) {
    const { t } = useTranslation();
    const {
        industry = 'Công nghệ',
        size = '10-50 nhân viên',
        location = 'Địa điểm'
    } = company;

    const infoItems = [
        {
            icon: Business,
            label: t('company.info.field'),
            value: industry
        },
        {
            icon: People,
            label: t('company.info.company_size'),
            value: size
        },
        {
            icon: LocationOn,
            label: t('company.info.location'),
            value: location
        }
    ];

    return (
        <Box sx={{ position: 'sticky', top: 16 }}>
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    {t('company.info.title')}
                </Typography>

                {/* Company Details */}
                <Box>
                    {infoItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Box key={index}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 2,
                                        py: 2
                                    }}
                                >
                                    <Icon sx={{ fontSize: 20, color: 'primary.main', mt: 0.2 }} />
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ display: 'block', mb: 0.5, fontSize: '0.75rem' }}
                                        >
                                            {item.label}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ fontWeight: 500 }}
                                        >
                                            {item.value}
                                        </Typography>
                                    </Box>
                                </Box>
                                {index < infoItems.length - 1 && <Divider />}
                            </Box>
                        );
                    })}
                </Box>
            </Paper>
        </Box>
    );
}

