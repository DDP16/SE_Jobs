import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export default function CompanyOverview({ company = {} }) {
    const {
        description = `Chúng tôi là một công ty công nghệ hàng đầu, tập trung vào đổi mới và xuất sắc. 
                      Sứ mệnh của chúng tôi là tạo ra các giải pháp tạo sự khác biệt trong cuộc sống mọi người.
                      
                      Đội ngũ của chúng tôi bao gồm những cá nhân tài năng từ nhiều nền tảng khác nhau, 
                      có chung niềm đam mê về công nghệ và đổi mới. Chúng tôi làm việc cùng nhau để 
                      giải quyết các vấn đề phức tạp và mang lại kết quả xuất sắc cho khách hàng.`,
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
                    mb: 3
                }}
            >
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mb: 2 }}
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
            </Paper>

            {/* Vì sao bạn nên làm việc tại đây */}
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
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mb: 2 }}
                >
                    Vì sao bạn nên làm việc tại đây
                </Typography>
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {benefits.map((benefit, index) => (
                        <Box
                            component="li"
                            key={index}
                            sx={{
                                mb: 1.5,
                                color: 'text.secondary',
                                fontSize: '0.875rem',
                                lineHeight: 1.7
                            }}
                        >
                            {benefit}
                        </Box>
                    ))}
                </Box>
            </Paper>
        </Box>
    );
}

