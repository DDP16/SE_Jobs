import React from 'react';
import { Box, Typography, Paper, Button, Stack, Grid } from '@mui/material';
import { Link } from 'lucide-react';

export default function CompanyOverview({ company = {} }) {
    const {
        description = `Chúng tôi là một công ty công nghệ hàng đầu, tập trung vào đổi mới và xuất sắc. 
                      Sứ mệnh của chúng tôi là tạo ra các giải pháp tạo sự khác biệt trong cuộc sống mọi người.
                      
                      Đội ngũ của chúng tôi bao gồm những cá nhân tài năng từ nhiều nền tảng khác nhau, 
                      có chung niềm đam mê về công nghệ và đổi mới. Chúng tôi làm việc cùng nhau để 
                      giải quyết các vấn đề phức tạp và mang lại kết quả xuất sắc cho khách hàng.`,
        contact = ['twitter.com/stripe', 'facebook.com/StripeHQ', 'linkedin.com/company/stripe'],
    } = company;

    const benefits = [
        'Lương thưởng cạnh tranh và hấp dẫn',
        'Bảo hiểm sức khỏe toàn diện',
        'Cơ hội phát triển nghề nghiệp',
        'Môi trường làm việc năng động',
        'Đào tạo và phát triển kỹ năng',
        'Chế độ phúc lợi hấp dẫn'
    ];

    return (
        <Box>
            {/* Giới thiệu công ty */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2, md: 3 },
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    mb: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2.5
                }}
            >
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 700 }}
                >
                    Giới thiệu công ty
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
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 700 }}
                >
                    Liên hệ
                </Typography>
                <Grid container spacing={2}>
                    {contact.map((link, index) => (
                        <Button 
                            key={index}
                            variant="outlined"
                            href={`https://${link}`}
                            target="_blank"
                        >
                            <div className='flex items-center gap-2'>
                                <Link size={15}/>
                                <span className='text-[15px]'>{link}</span>
                            </div>
                        </Button>
                    ))}
                </Grid>
            </Paper>
        </Box>
    );
}

