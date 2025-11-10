import React, { useState, useRef } from 'react';
import {
    Box,
    Container,
    Typography,
    Avatar,
    Button,
    Paper,
    IconButton,
    Divider,
    LinearProgress,
    Card,
    CardContent,
    CircularProgress,
    Chip,
} from '@mui/material';
import {
    Edit as EditIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    LocationOn as LocationOnIcon,
    Link as LinkIcon,
    Person as PersonIcon,
    Add as AddIcon,
    ErrorOutline as ErrorIcon,
    CloudUpload as CloudUploadIcon,
    Description as DescriptionIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { ProfileSidebar } from '../../../../components';
import { InformationModal, ApplicationModal } from '../../../../components';
import EducationModal from '../../../../components/common/EducationModal';

export default function Profile() {
    const fileInputRef = useRef(null);
    const [user, setUser] = useState({
        name: 'Sang Trinh',
        email: 'test@gmail.com',
        phone: '012345679899',
        dateOfBirth: '',
        gender: '',
        currentAddress: '',
        personalLinks: '',
        profileCompletion: 5,
    });

    const [cvFile, setCvFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isOpenInformationModal, setIsOpenInformationModal] = useState(false);
    const [isOpenApplicationModal, setIsOpenApplicationModal] = useState(false);
    const [isOpenEducationModal, setIsOpenEducationModal] = useState(false);
    const [selectedEducation, setSelectedEducation] = useState(null);

    // Profile section data - sẽ được cập nhật từ API hoặc form
    const [introduction, setIntroduction] = useState('');
    const [experiences, setExperiences] = useState([]);
    const [educations, setEducations] = useState([]);
    const [skills, setSkills] = useState([]);
    const [showAllExperiences, setShowAllExperiences] = useState(false);
    const [showAllEducations, setShowAllEducations] = useState(false);

    const profileSections = [
        {
            id: 'introduction',
            title: 'Giới thiệu bản thân',
            subtitle: 'Giới thiệu điểm mạnh và số năm kinh nghiệm của bạn',
            isEmpty: !introduction,
        },
        {
            id: 'education',
            title: 'Học vấn',
            subtitle: 'Chia sẻ trình độ học vấn của bạn',
            isEmpty: educations.length === 0,
        },
        {
            id: 'experience',
            title: 'Kinh nghiệm làm việc',
            subtitle: 'Thể hiện những thông tin chi tiết về quá trình làm việc',
            isEmpty: experiences.length === 0,
        },
        {
            id: 'skills',
            title: 'Kỹ năng',
            subtitle: 'Liệt kê các kỹ năng chuyên môn của bạn',
            isEmpty: skills.length === 0,
        },
        {
            id: 'languages',
            title: 'Ngoại ngữ',
            subtitle: 'Liệt kê các ngôn ngữ mà bạn biết',
            isEmpty: true,
        },
        {
            id: 'projects',
            title: 'Dự án nổi bật',
            subtitle: 'Giới thiệu dự án nổi bật của bạn',
            isEmpty: true,
        },
        {
            id: 'certificates',
            title: 'Chứng chỉ',
            subtitle: 'Bổ sung chứng chỉ liên quan đến kỹ năng của bạn',
            isEmpty: true,
        },
        {
            id: 'awards',
            title: 'Giải thưởng',
            subtitle: 'Thể hiện giải thưởng hoặc thành tích mà bạn đạt được',
            isEmpty: true,
        },
    ];

    const handleAddSection = (sectionId, educationData = null) => {
        if (sectionId === 'education') {
            setSelectedEducation(educationData);
            setIsOpenEducationModal(true);
        } else {
            console.log(`Add ${sectionId} clicked`);
            // Handle other sections
        }
    };

    const renderSectionContent = (section) => {
        switch (section.id) {
            case 'introduction':
                if (introduction) {
                    return (
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.primary',
                                whiteSpace: 'pre-line',
                                lineHeight: 1.6
                            }}
                        >
                            {introduction}
                        </Typography>
                    );
                }
                return null;

            case 'experience':
                if (experiences.length > 0) {
                    const displayedExperiences = showAllExperiences ? experiences : experiences.slice(0, 2);
                    const remainingCount = experiences.length - 2;

                    return (
                        <Box>
                            {displayedExperiences.map((exp) => (
                                <Box
                                    key={exp.id}
                                    sx={{
                                        display: 'flex',
                                        gap: 2,
                                        mb: 3,
                                        position: 'relative',
                                        '&:last-child': { mb: 0 }
                                    }}
                                >
                                    {/* Company Logo */}
                                    <Avatar
                                        sx={{
                                            width: 56,
                                            height: 56,
                                            bgcolor: exp.company === 'Twitter' ? '#1DA1F2' : '#000',
                                            fontSize: '1.5rem',
                                            fontWeight: 600,
                                            flexShrink: 0,
                                        }}
                                    >
                                        {exp.logo}
                                    </Avatar>

                                    {/* Experience Details */}
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 0.5 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                                                {exp.role}
                                            </Typography>
                                            <IconButton
                                                onClick={() => handleAddSection(section.id)}
                                                sx={{
                                                    color: '#7c4dff',
                                                    p: 0.5,
                                                    '&:hover': {
                                                        bgcolor: 'rgba(124, 77, 255, 0.1)',
                                                    },
                                                }}
                                                size="small"
                                            >
                                                <EditIcon sx={{ fontSize: 18 }} />
                                            </IconButton>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                            {exp.company} - {exp.employmentType} - {exp.startDate} - {exp.endDate} ({exp.duration})
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            {exp.location}
                                        </Typography>
                                        {exp.description && (
                                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                                {exp.description}
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            ))}

                            {!showAllExperiences && experiences.length > 2 && (
                                <Box sx={{ textAlign: 'center', mt: 2 }}>
                                    <Button
                                        onClick={() => setShowAllExperiences(true)}
                                        sx={{
                                            color: '#1976d2',
                                            textTransform: 'none',
                                            fontWeight: 500,
                                            '&:hover': {
                                                bgcolor: 'rgba(25, 118, 210, 0.1)',
                                            },
                                        }}
                                    >
                                        Show {remainingCount} more experiences
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    );
                }
                return null;

            case 'education':
                if (educations.length > 0) {
                    const displayedEducations = showAllEducations ? educations : educations.slice(0, 2);
                    const remainingCount = educations.length - 2;

                    return (
                        <Box>
                            {displayedEducations.map((edu) => (
                                <Box
                                    key={edu.id}
                                    sx={{
                                        mb: 3,
                                        position: 'relative',
                                        '&:last-child': { mb: 0 }
                                    }}
                                >
                                    {/* Education Details */}
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 0.5 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                                                {edu.university}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                                                <IconButton
                                                    onClick={() => handleOpenEducationModal(edu)}
                                                    sx={{
                                                        color: '#d32f2f',
                                                        p: 0.5,
                                                        '&:hover': {
                                                            bgcolor: 'rgba(211, 47, 47, 0.1)',
                                                        },
                                                    }}
                                                    size="small"
                                                >
                                                    <EditIcon sx={{ fontSize: 18 }} />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => handleDeleteEducation(edu.id)}
                                                    sx={{
                                                        color: 'text.secondary',
                                                        p: 0.5,
                                                        '&:hover': {
                                                            bgcolor: 'rgba(0, 0, 0, 0.05)',
                                                        },
                                                    }}
                                                    size="small"
                                                >
                                                    <DeleteIcon sx={{ fontSize: 18 }} />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                            {edu.degree} {edu.major && `- ${edu.major}`}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            {(() => {
                                                const startDate = edu.startMonth
                                                    ? `${String(edu.startMonth).padStart(2, '0')}/${edu.startYear}`
                                                    : edu.startYear;
                                                const endDate = (edu.endYear === 'Present' || edu.isCurrentlyStudying)
                                                    ? 'HIỆN TẠI'
                                                    : (edu.endMonth
                                                        ? `${String(edu.endMonth).padStart(2, '0')}/${edu.endYear}`
                                                        : edu.endYear);
                                                return `${startDate} - ${endDate}`;
                                            })()}
                                        </Typography>
                                        {edu.description && (
                                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                                {edu.description}
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            ))}

                            {!showAllEducations && educations.length > 2 && (
                                <Box sx={{ textAlign: 'center', mt: 2 }}>
                                    <Button
                                        onClick={() => setShowAllEducations(true)}
                                        sx={{
                                            color: '#1976d2',
                                            textTransform: 'none',
                                            fontWeight: 500,
                                            '&:hover': {
                                                bgcolor: 'rgba(25, 118, 210, 0.1)',
                                            },
                                        }}
                                    >
                                        Show {remainingCount} more educations
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    );
                }
                return null;

            case 'skills':
                if (skills.length > 0) {
                    return (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {skills.map((skill, index) => (
                                <Chip
                                    key={index}
                                    label={skill}
                                    sx={{
                                        bgcolor: '#E8E0FF',
                                        color: '#5E35B1',
                                        fontWeight: 500,
                                        borderRadius: 2,
                                        '&:hover': {
                                            bgcolor: '#D1C4E9',
                                        },
                                    }}
                                />
                            ))}
                        </Box>
                    );
                }
                return null;

            default:
                return null;
        }
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setCvFile({
                name: file.name,
                size: (file.size / 1024 / 1024).toFixed(2), // Convert to MB
                uploadDate: new Date().toLocaleDateString('vi-VN'),
                file: file
            });
        } else {
            alert('Vui lòng chỉ tải lên file PDF');
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            setCvFile({
                name: file.name,
                size: (file.size / 1024 / 1024).toFixed(2),
                uploadDate: new Date().toLocaleDateString('vi-VN'),
                file: file
            });
        } else {
            alert('Vui lòng chỉ tải lên file PDF');
        }
    };

    const handleDeleteCV = () => {
        setCvFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleViewCV = () => {
        if (cvFile && cvFile.file) {
            const fileURL = URL.createObjectURL(cvFile.file);
            window.open(fileURL, '_blank');
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleOpenInformationModal = () => {
        setIsOpenInformationModal(true);
    };

    const handleSaveInformation = (formData) => {
        // Update user state with the form data from modal
        setUser((prevUser) => ({
            ...prevUser,
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            currentAddress: formData.address,
            personalLinks: formData.personalLink,
            // Add title if it exists in the form
            ...(formData.title && { title: formData.title }),
        }));

        // Here you can also make an API call to save the data
        // Example: await updateUserProfile(formData);
        console.log("User information saved:", formData);
    };

    const handleSaveEducation = (formData) => {
        // Format the education data to match the display structure
        const educationData = {
            id: selectedEducation?.id || Date.now(), // Use existing ID or generate new one
            university: formData.school,
            degree: formData.degree,
            major: formData.major,
            startYear: formData.startYear,
            endYear: formData.isCurrentlyStudying ? 'Present' : formData.endYear,
            description: formData.description,
            logo: formData.school ? formData.school.charAt(0).toUpperCase() : 'U',
            // Additional fields for compatibility
            startMonth: formData.startMonth,
            endMonth: formData.endMonth,
            isCurrentlyStudying: formData.isCurrentlyStudying,
        };

        if (selectedEducation) {
            // Update existing education
            setEducations((prev) =>
                prev.map((edu) =>
                    edu.id === selectedEducation.id ? educationData : edu
                )
            );
        } else {
            // Add new education
            setEducations((prev) => [...prev, educationData]);
        }

        // Reset selected education
        setSelectedEducation(null);

        // Here you can also make an API call to save the data
        // Example: await saveEducation(educationData);
        console.log("Education saved:", educationData);
    };

    const handleOpenEducationModal = (educationData = null) => {
        setSelectedEducation(educationData);
        setIsOpenEducationModal(true);
    };

    const handleDeleteEducation = (educationId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa thông tin học vấn này?')) {
            setEducations((prev) => prev.filter((edu) => edu.id !== educationId));

            // Here you can also make an API call to delete the data
            // Example: await deleteEducation(educationId);
            console.log("Education deleted:", educationId);
        }
    };

    return (
        <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
                    {/* Sidebar */}
                    <ProfileSidebar user={user} />

                    {/* Main Content */}
                    <Box sx={{ flex: 1, maxWidth: 900 }}>
                        {/* User Info Card */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                mb: 3,
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                                <Box sx={{ position: 'relative' }}>
                                    <Avatar
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            bgcolor: '#7c4dff',
                                            fontSize: '2rem',
                                            fontWeight: 600,
                                        }}
                                    >
                                        {getInitials(user.name)}
                                    </Avatar>
                                    <IconButton
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            bottom: -4,
                                            right: -4,
                                            bgcolor: 'white',
                                            border: '2px solid',
                                            borderColor: 'divider',
                                            width: 28,
                                            height: 28,
                                            '&:hover': {
                                                bgcolor: 'grey.100',
                                            },
                                        }}
                                    >
                                        <EditIcon sx={{ fontSize: 14 }} onClick={() => handleOpenInformationModal()} />
                                    </IconButton>
                                </Box>

                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                        <Box>
                                            <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                                                {user.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Cập nhật chức danh
                                            </Typography>
                                        </Box>
                                        <IconButton
                                            onClick={handleOpenInformationModal}
                                            sx={{
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                color: 'error.main',
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Box>

                                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <EmailIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                            <Typography variant="body2" color="text.secondary">
                                                {user.email}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <PhoneIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                            <Typography variant="body2" color="text.secondary">
                                                {user.phone}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <PersonIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                            <Typography variant="body2" color="text.secondary">
                                                Ngày sinh
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <PersonIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                            <Typography variant="body2" color="text.secondary">
                                                Giới tính
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <LocationOnIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                            <Typography variant="body2" color="text.secondary">
                                                Địa chỉ hiện tại
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <LinkIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                            <Typography variant="body2" color="text.secondary">
                                                Link cá nhân
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>

                        {/* CV Upload Section */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                mb: 3,
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                        CV đính kèm
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Tải lên CV của bạn để nhà tuyển dụng xem
                                    </Typography>
                                </Box>
                                {cvFile && (
                                    <Chip
                                        icon={<CheckCircleIcon />}
                                        label="Đã tải lên"
                                        color="success"
                                        size="small"
                                    />
                                )}
                            </Box>

                            {/* Hidden file input */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf"
                                onChange={handleFileSelect}
                                style={{ display: 'none' }}
                            />

                            {!cvFile ? (
                                /* Upload Area */
                                <Box
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    sx={{
                                        border: '2px dashed',
                                        borderColor: isDragging ? 'primary.main' : 'divider',
                                        borderRadius: 2,
                                        p: 6,
                                        textAlign: 'center',
                                        bgcolor: isDragging ? 'primary.50' : 'grey.50',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            borderColor: 'primary.main',
                                            bgcolor: 'primary.50',
                                        },
                                    }}
                                    onClick={handleUploadClick}
                                >
                                    <CloudUploadIcon
                                        sx={{
                                            fontSize: 64,
                                            color: isDragging ? 'primary.main' : 'text.secondary',
                                            mb: 2,
                                        }}
                                    />
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                        Kéo và thả file CV vào đây
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        hoặc
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        startIcon={<CloudUploadIcon />}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUploadClick();
                                        }}
                                        sx={{
                                            bgcolor: 'error.main',
                                            color: 'white',
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            px: 4,
                                            py: 1.5,
                                            '&:hover': {
                                                bgcolor: 'error.dark',
                                            },
                                        }}
                                    >
                                        Chọn file từ máy tính
                                    </Button>
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
                                        Chỉ hỗ trợ file PDF, tối đa 5MB
                                    </Typography>
                                </Box>
                            ) : (
                                /* Uploaded File Display */
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        p: 3,
                                        bgcolor: 'grey.50',
                                        borderRadius: 2,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: 1,
                                            bgcolor: 'error.main',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            flexShrink: 0,
                                        }}
                                    >
                                        <DescriptionIcon sx={{ fontSize: 32 }} />
                                    </Box>

                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                            {cvFile.name}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                            <Typography variant="body2" color="text.secondary">
                                                {cvFile.size} MB
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                •
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Tải lên: {cvFile.uploadDate}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <IconButton
                                            onClick={handleViewCV}
                                            sx={{
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                color: 'primary.main',
                                                '&:hover': {
                                                    bgcolor: 'primary.50',
                                                },
                                            }}
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={handleUploadClick}
                                            sx={{
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                color: 'text.secondary',
                                                '&:hover': {
                                                    bgcolor: 'grey.100',
                                                },
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={handleDeleteCV}
                                            sx={{
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                color: 'error.main',
                                                '&:hover': {
                                                    bgcolor: 'error.50',
                                                },
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            )}
                        </Paper>

                        {/* Profile Sections */}
                        {profileSections.map((section) => (
                            <Paper
                                key={section.id}
                                elevation={0}
                                sx={{
                                    p: section.isEmpty ? 2.5 : 4,
                                    mb: 3,
                                    borderRadius: 2,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    position: 'relative',
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: section.isEmpty ? 0 : 2 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: section.isEmpty ? 0.5 : 1 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {section.title}
                                            </Typography>
                                            <IconButton
                                                onClick={() => {
                                                    if (section.id === 'education') {
                                                        handleOpenEducationModal(null);
                                                    } else {
                                                        handleAddSection(section.id);
                                                    }
                                                }}
                                                sx={{
                                                    color: '#d32f2f',
                                                    p: 0.5,
                                                    '&:hover': {
                                                        bgcolor: 'rgba(211, 47, 47, 0.1)',
                                                    },
                                                }}
                                                size="small"
                                            >
                                                <AddIcon sx={{ fontSize: 18 }} />
                                            </IconButton>
                                        </Box>
                                        {section.isEmpty && (
                                            <Typography variant="body2" color="text.secondary">
                                                {section.subtitle}
                                            </Typography>
                                        )}

                                        {!section.isEmpty && (
                                            <Box>
                                                {renderSectionContent(section)}
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            </Paper>
                        ))}
                    </Box>

                    {/* Right Sidebar - Completion Card */}
                    <Box sx={{ width: 320, position: 'sticky', top: 20 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
                                Độ hoàn thiện hồ sơ
                            </Typography>

                            {/* Circular Progress */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    mb: 3,
                                    position: 'relative',
                                }}
                            >
                                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                    <Box
                                        sx={{
                                            width: 160,
                                            height: 160,
                                            borderRadius: '50%',
                                            border: '12px solid #f0f0f0',
                                            position: 'relative',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: '50%',
                                                border: '12px solid transparent',
                                                borderTopColor: 'error.main',
                                                transform: 'rotate(-90deg)',
                                            }}
                                        />
                                        <Box sx={{ textAlign: 'center' }}>
                                            <Typography variant="h3" sx={{ fontWeight: 700, lineHeight: 1 }}>
                                                {user.profileCompletion}%
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                hoàn thành
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Warning Card */}
                            <Box
                                sx={{
                                    bgcolor: '#fff9e6',
                                    border: '2px solid #ffc107',
                                    borderRadius: 2,
                                    p: 2,
                                    mb: 3,
                                    position: 'relative',
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: -16,
                                        right: 16,
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={`data:image/svg+xml,${encodeURIComponent(`
                                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="24" cy="24" r="20" fill="#FFB84D"/>
                                                <text x="24" y="32" text-anchor="middle" fill="white" font-size="24" font-weight="bold">!</text>
                                            </svg>
                                        `)}`}
                                        alt="Warning"
                                        sx={{ width: 48, height: 48 }}
                                    />
                                </Box>
                                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                                    Nâng cấp hồ sơ của bạn lên{' '}
                                    <Box component="span" sx={{ fontWeight: 700, color: 'error.main' }}>
                                        70%
                                    </Box>{' '}
                                    để tài xỉu CV đánh cho chuyên gia IT.
                                </Typography>
                            </Box>

                            {/* Action Buttons */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                <Button
                                    fullWidth
                                    variant="text"
                                    startIcon={<AddIcon />}
                                    sx={{
                                        justifyContent: 'flex-start',
                                        textTransform: 'none',
                                        color: 'primary.main',
                                        fontWeight: 500,
                                        '&:hover': {
                                            bgcolor: 'primary.50',
                                        },
                                    }}
                                >
                                    Thêm Giới thiệu bản thân
                                </Button>
                                <Button
                                    fullWidth
                                    variant="text"
                                    startIcon={<AddIcon />}
                                    sx={{
                                        justifyContent: 'flex-start',
                                        textTransform: 'none',
                                        color: 'primary.main',
                                        fontWeight: 500,
                                        '&:hover': {
                                            bgcolor: 'primary.50',
                                        },
                                    }}
                                >
                                    Thêm Thông tin cá nhân
                                </Button>
                                <Button
                                    fullWidth
                                    variant="text"
                                    startIcon={<AddIcon />}
                                    sx={{
                                        justifyContent: 'flex-start',
                                        textTransform: 'none',
                                        color: 'primary.main',
                                        fontWeight: 500,
                                        '&:hover': {
                                            bgcolor: 'primary.50',
                                        },
                                    }}
                                >
                                    Thêm Kinh nghiệm làm việc
                                </Button>
                                <Divider sx={{ my: 1 }} />
                                <Button
                                    fullWidth
                                    variant="text"
                                    sx={{
                                        justifyContent: 'flex-start',
                                        textTransform: 'none',
                                        color: 'text.secondary',
                                        fontWeight: 500,
                                        '&:hover': {
                                            bgcolor: 'grey.100',
                                        },
                                    }}
                                >
                                    Thêm thông tin khác
                                </Button>
                            </Box>

                            {/* View CV Button */}
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    bgcolor: 'error.main',
                                    color: 'white',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    py: 1.5,
                                    borderRadius: 2,
                                    '&:hover': {
                                        bgcolor: 'error.dark',
                                    },
                                }}
                            >
                                Xem và Tải CV
                            </Button>
                        </Paper>
                    </Box>
                </Box>
            </Container>

            {/* Information Modal */}
            <InformationModal
                open={isOpenInformationModal}
                onOpenChange={setIsOpenInformationModal}
                initialData={user}
                onSave={handleSaveInformation}
            />

            {/* Education Modal */}
            <EducationModal
                open={isOpenEducationModal}
                onOpenChange={(open) => {
                    setIsOpenEducationModal(open);
                    if (!open) {
                        setSelectedEducation(null);
                    }
                }}
                initialData={selectedEducation ? {
                    school: selectedEducation.university,
                    degree: selectedEducation.degree,
                    major: selectedEducation.major,
                    startMonth: selectedEducation.startMonth || '',
                    startYear: selectedEducation.startYear,
                    endMonth: selectedEducation.endMonth || '',
                    endYear: selectedEducation.endYear === 'Present' ? '' : selectedEducation.endYear,
                    isCurrentlyStudying: selectedEducation.endYear === 'Present' || selectedEducation.isCurrentlyStudying,
                    description: selectedEducation.description || '',
                } : null}
                onSave={handleSaveEducation}
            />
        </Box>
    );
}

