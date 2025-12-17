import React from 'react';
import { Box, Typography, Paper, Button, Stack, Grid } from '@mui/material';
import { Link } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function CompanyOverview({ company = {} }) {
    const { t } = useTranslation();

    const description = company.description || "";

    // Handle socials - can be object or array
    const socials = company.socials || {};
    const socialLinks = Array.isArray(socials)
        ? socials
        : Object.entries(socials).map(([platform, url]) => ({
            platform,
            url: url.startsWith('http') ? url : `https://${url}`
        }));

    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 2, md: 3 },
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}
        >
            <Typography
                variant="h6"
                sx={{ fontWeight: 700 }}
            >
                {t('company.overview.title')}
            </Typography>
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    lineHeight: 1.8,
                    whiteSpace: 'pre-line'
                }}
            >
                {description}
            </Typography>
            {socialLinks.length > 0 && (
                <>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 700 }}
                    >
                        {t('company.overview.contact')}
                    </Typography>
                    <Grid container spacing={2}>
                        {socialLinks.map((social, index) => {
                            const url = typeof social === 'string' ? social : social.url;
                            const platform = typeof social === 'string' ? social : social.platform;
                            
                            return (
                                <Grid item key={index}>
                                    <Button
                                        variant="outlined"
                                        href={url.startsWith('http') ? url : `https://${url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className='flex items-center gap-2'>
                                            <Link size={15} />
                                            <span className='text-[15px]'>{platform}</span>
                                        </div>
                                    </Button>
                                </Grid>
                            );
                        })}
                    </Grid>
                </>
            )}
        </Paper>
    );
}

