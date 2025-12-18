import React from 'react';
import { Box, Typography, Paper, Button, Stack, Grid } from '@mui/material';
import { Facebook, Link, Linkedin, Mail, X, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SOCIAL_ICONS = {
  twitter: { icon: X, color: "text-sky-500" },
  facebook: { icon: Facebook, color: "text-blue-600" },
  linkedin: { icon: Linkedin, color: "text-blue-700" },
  youtube: { icon: Youtube, color: "text-red-500" },
  mail: { icon: Mail, color: "text-red-500" },
};

export default function CompanyOverview({ company = {} }) {
    const { t } = useTranslation();

    const description = company.description || "";

    // Handle socials - can be object or array
    const socials = company.socials || {};
    const socialLinks = Array.isArray(socials)
        ? socials
        : Object.entries(socials).map(([platform, url]) => ({
            platform,
            url,
            icon: SOCIAL_ICONS[platform]?.icon || Link,
            color: SOCIAL_ICONS[platform]?.color || "text-gray-500"
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
                                    <button
                                        key={platform}
                                        className="
                                            flex items-center gap-3 px-4 py-3
                                            border rounded-lg bg-white
                                            hover:border-primary hover:scale-105 hover:shadow-xl
                                            active:scale-95 active:shadow-md
                                            transition-all cursor-pointer
                                            text-left hover:text-primary
                                        "
                                        onClick={() => window.open((contact.url).startsWith('http') ? contact.url : `https://${contact.url}`, '_blank')}
                                    >
                                        <social.icon className={`w-5 h-5 ${social.color}`} />
                                        <span className="text-sm font-medium">{url}</span>
                                    </button>
                                </Grid>
                            );
                        })}
                    </Grid>
                </>
            )}
        </Paper>
    );
}

