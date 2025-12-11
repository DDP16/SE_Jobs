import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography
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
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const iconByName = {
    'Software Engineering': Engineering,
    'Data Science': TrendingUp,
    'Product Management': Lightbulb,
    'Design': Palette,
    'Marketing': TrendingUp,
    'Sales': AttachMoney,
    'Human Resources': Groups,
    'Customer Support': Groups,
    'Finance': AttachMoney,
    'Operations': BusinessCenter
};

const fallbackCategories = [
    { id: 1, name: 'Software Engineering' },
    { id: 2, name: 'Data Science' },
    { id: 3, name: 'Product Management' },
    { id: 4, name: 'Design' },
    { id: 5, name: 'Marketing' },
    { id: 6, name: 'Sales' },
    { id: 7, name: 'Human Resources' },
    { id: 8, name: 'Customer Support' },
    { id: 9, name: 'Finance' },
    { id: 10, name: 'Operations' }
];

const getIconForCategory = (name) => {
    const IconComponent = iconByName[name] || Computer;
    return <IconComponent />;
};

export default function CategorySection({ onCategoryClick }) {
    const categoriesFromStore = useSelector(state => state.categories?.categories || []);
    const categoriesSource = categoriesFromStore.length ? categoriesFromStore : fallbackCategories;
    const categories = categoriesSource.slice(0, 8);
    const navigate = useNavigate();

    const handleClick = (category) => {
        if (onCategoryClick) {
            onCategoryClick(category);
            return;
        }

        const queryValue = category.id;
        navigate(`/jobs?category_ids=${encodeURIComponent(queryValue)}&page=1`);
    };

    return (
        <div className="py-6 md:py-10 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Explore by <span className="text-blue-600">Category</span>
                    </h3>
                    <button className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
                        Show all jobs
                        <ArrowForward className="w-5 h-5" />
                    </button>
                </div>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(4, 1fr)'
                        },
                        gap: 2
                    }}
                >
                    {categories.map((category) => (
                        <Card
                            key={category.id || category.name}
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
                            onClick={() => handleClick(category)}
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
                                    {React.cloneElement(getIconForCategory(category.name), {
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
                                        {category.count ? `${category.count} jobs available →` : 'View jobs →'}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>

            </div>
        </div>
    );
}
