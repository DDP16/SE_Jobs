import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    Chip,
    Divider
} from '@mui/material';
import {
    LocationOn,
    Work,
    ArrowForward,
    TrendingUp
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function CompanyJobs({ jobs = [], company = {} }) {
    const navigate = useNavigate();

    const handleJobClick = (jobId) => {
        navigate(`/job/${jobId}`);
    };

    const handleViewAllJobs = () => {
        navigate('/jobs');
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    if (jobs.length === 0) {
        return (
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2, md: 3 },
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    mb: 3,
                    textAlign: 'center'
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    Vị trí tuyển dụng
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Hiện tại không có vị trí nào đang tuyển dụng. Vui lòng quay lại sau!
                </Typography>
            </Paper>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2, md: 3 },
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    mb: 3
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 700 }}
                    >
                        Vị trí tuyển dụng ({jobs.length})
                    </Typography>
                    {jobs.length > 5 && (
                        <Button
                            variant="text"
                            endIcon={<ArrowForward />}
                            onClick={handleViewAllJobs}
                            sx={{ textTransform: 'none' }}
                        >
                            Xem tất cả
                        </Button>
                    )}
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {jobs.slice(0, 5).map((job, index) => (
                        <motion.div key={job.id} variants={itemVariants}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 1,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        bgcolor: 'action.hover'
                                    }
                                }}
                                onClick={() => handleJobClick(job.id)}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 1,
                                                fontSize: '1rem',
                                                '&:hover': {
                                                    color: 'primary.main'
                                                }
                                            }}
                                        >
                                            {job.title}
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <LocationOn sx={{ fontSize: 14, color: 'text.secondary' }} />
                                                <Typography variant="caption" color="text.secondary">
                                                    {job.location}
                                                </Typography>
                                            </Box>
                                            {job.salary && (
                                                <>
                                                    <Typography variant="caption" color="text.secondary">•</Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                        <TrendingUp sx={{ fontSize: 14, color: 'text.secondary' }} />
                                                        <Typography variant="caption" color="text.secondary">
                                                            {job.salary}
                                                        </Typography>
                                                    </Box>
                                                </>
                                            )}
                                        </Box>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        sx={{
                                            ml: 2,
                                            textTransform: 'none',
                                            flexShrink: 0,
                                            fontSize: '0.813rem'
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleJobClick(job.id);
                                        }}
                                    >
                                        Ứng tuyển
                                    </Button>
                                </Box>
                            </Paper>
                        </motion.div>
                    ))}
                </Box>
            </Paper>
        </motion.div>
    );
}

