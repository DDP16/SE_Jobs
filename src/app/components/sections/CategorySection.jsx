import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Stack,
    Button
} from '@mui/material';
import {
    ArrowForward,
    Palette,
    BusinessCenter,
    TrendingUp,
    Lightbulb,
    Groups,
    AttachMoney,
    Engineering,
    Computer
} from '@mui/icons-material';
import { mockCategories } from '../../../mocks/mockData';

// Icon mapping function
const getIcon = (iconName) => {
    const iconMap = {
        Palette: Palette,
        BusinessCenter: BusinessCenter,
        TrendingUp: TrendingUp,
        Lightbulb: Lightbulb,
        Groups: Groups,
        AttachMoney: AttachMoney,
        Engineering: Engineering,
        Computer: Computer
    };

    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent /> : <Computer />;
};

export default function CategorySection() {
    return (
        <Box
            sx={{
                py: 4,
                bgcolor: 'background.default'
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            fontWeight: 700,
                            color: 'text.primary'
                        }}
                    >
                        Explore by <span style={{ color: '#0041D9' }}>Category</span>
                    </Typography>
                    <Button
                        variant="text"
                        endIcon={<ArrowForward />}
                        sx={{
                            textTransform: 'none',
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: 'primary.main',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 65, 217, 0.04)'
                            }
                        }}
                    >
                        Show all jobs
                    </Button>
                </Box>

                {/* First Row - 4 cards */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        mb: 2,
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}
                >
                    {mockCategories.slice(0, 4).map((category) => (
                        <Box
                            key={category.id}
                            sx={{
                                flex: '0 0 calc(25% - 12px)',
                                minWidth: '200px',
                                maxWidth: '250px'
                            }}
                        >
                            <Card
                                sx={{
                                    height: '100%',
                                    cursor: 'pointer',
                                    borderRadius: '12px',
                                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                    transition: 'all 0.2s ease-in-out',
                                    backgroundColor: 'white',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                    }
                                }}
                            >
                                <CardContent
                                    sx={{
                                        textAlign: 'center',
                                        p: 3,
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            mb: 2,
                                            color: 'primary.main'
                                        }}
                                    >
                                        {React.cloneElement(getIcon(category.icon), {
                                            sx: { fontSize: '2.5rem' }
                                        })}
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 1,
                                                fontSize: '1.1rem',
                                                color: 'text.primary'
                                            }}
                                        >
                                            {category.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'text.secondary',
                                                fontSize: '0.9rem',
                                                fontWeight: 500
                                            }}
                                        >
                                            {category.count} jobs available →
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>

                {/* Second Row - 4 cards */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        mb: 0,
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}
                >
                    {mockCategories.slice(4, 8).map((category) => (
                        <Box
                            key={category.id}
                            sx={{
                                flex: '0 0 calc(25% - 12px)',
                                minWidth: '200px',
                                maxWidth: '250px'
                            }}
                        >
                            <Card
                                sx={{
                                    height: '100%',
                                    cursor: 'pointer',
                                    borderRadius: '12px',
                                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                    transition: 'all 0.2s ease-in-out',
                                    backgroundColor: 'white',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                    }
                                }}
                            >
                                <CardContent
                                    sx={{
                                        textAlign: 'center',
                                        p: 3,
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            mb: 2,
                                            color: 'primary.main'
                                        }}
                                    >
                                        {React.cloneElement(getIcon(category.icon), {
                                            sx: { fontSize: '2.5rem' }
                                        })}
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 1,
                                                fontSize: '1.1rem',
                                                color: 'text.primary'
                                            }}
                                        >
                                            {category.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'text.secondary',
                                                fontSize: '0.9rem',
                                                fontWeight: 500
                                            }}
                                        >
                                            {category.count} jobs available →
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>

            </Container>
        </Box>
    );
}
