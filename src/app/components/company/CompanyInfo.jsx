import {
    Box,
    Typography,
    Paper
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Image } from 'antd';
import { srcAsset } from '../../lib';
import { ArrowRight } from 'lucide-react';

export default function CompanyInfo({ company = {} }) {
    const { t } = useTranslation();

    return (
        <Box sx={{ position: 'sticky', top: 55 }}>
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
                {company.tech_stack && Array.isArray(company.tech_stack) && company.tech_stack.length > 0 ? (
                    <div className='grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {company.tech_stack
                            .filter(tech => tech && typeof tech === 'string')
                            .map((tech, index) => (
                                <div key={index} className=' flex flex-col justify-center items-center'>
                                    <Image
                                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.toLowerCase()}/${tech.toLowerCase()}-original.svg`}
                                        alt={tech}
                                        width={50}
                                        height={50}
                                        preview={false}
                                        fallback={srcAsset.techIcon}
                                    />
                                    <span className='text-base text-center mt-2'>{tech}</span>
                                </div>
                            ))}
                    </div>
                ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', py: 2 }}>
                        {t('company.tech_stack.no_tech_stack') || 'No tech stack available'}
                    </Typography>
                )}
                <a
                    href="#"
                    className="text-primary flex items-center gap-2 hover:underline font-medium"
                >
                    {t('company.tech_stack.view_all')}
                    <ArrowRight className="w-5 h-5" />
                </a>
            </Paper>
        </Box>
    );
}

