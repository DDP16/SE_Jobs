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
import { ArrowForward } from '@mui/icons-material';
import { mockCategories } from '../../../mocks/mockData';

export default function CategorySection() {
    return (
        <Box sx={{ py: 8 }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="h2" sx={{ mb: 2 }}>
                        Explore by Category
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
                        Find jobs in your field of expertise
                    </Typography>
                </Box>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {mockCategories.map((category) => (
                        <Grid item xs={6} sm={4} md={3} key={category.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: 3
                                    }
                                }}
                            >
                                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            mb: 2,
                                            fontSize: '2.5rem'
                                        }}
                                    >
                                        {category.icon}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                        {category.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {category.count} jobs available
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ textAlign: 'center' }}>
                    <Button
                        variant="outlined"
                        size="large"
                        endIcon={<ArrowForward />}
                        sx={{ minWidth: 200 }}
                    >
                        Browse All Categories
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}
