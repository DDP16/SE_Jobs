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
import { Image } from 'antd';
import { srcAsset } from '../../../../lib';
import { ArrowRight } from 'lucide-react';

export default function CompanyInfo({ company = {} }) {
    const { t } = useTranslation();

    return (
        <Box sx={{ position: 'sticky', top: 16 }}>
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    gap: 1,
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {t('company.tech_stack.title')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {t('company.tech_stack.description', { companyName: company.name || 'the company' })}
                </Typography>
                <div className='grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {company.techStack && company.techStack.map((tech, index) => (
                        <div key={index} className=' flex flex-col justify-center items-center'>
                            <Image 
                                src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.toLowerCase()}/${tech.toLowerCase()}-original.svg`}
                                alt={tech}
                                width={50}
                                height={50}
                                preview={false}
                                fallback={srcAsset.techIcon}
                            />
                            <span className='text-base mt-2'>{tech}</span>
                        </div>
                    ))}
                </div>
                <a
                    href="#"
                    className="text-primary flex items-center gap-2 hover:underline font-medium"
                >
                    {t('company.tech_stack.view_all')}
                    <ArrowRight className="w-5 h-5" />
                </a>

                {/* <Divider sx={{ my: 1 }} />

                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {t('company.office_location.title')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {t('company.office_location.description', { companyName: company.name || 'the company' })}
                </Typography>
                <a
                    href="#"
                    className="text-primary flex items-center gap-2 hover:underline font-medium"
                >
                    {t('company.office_location.view_all')}
                    <ArrowRight className="w-5 h-5" />
                </a> */}
            </Paper>
        </Box>
    );
}

