import React, { useState, useEffect, useCallback } from 'react';
import { Container, Box, CircularProgress, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useUserProfile } from '../../../../hooks/useUserProfile';
import { useCustomAlert } from '../../../../hooks/useCustomAlert';
import { updateUser, getUserById } from '../../../../modules/services/userService';
import {
    InformationModal,
    IntroductionModal,
    ExperienceModal,
    EducationModal,
    LanguagesModal,
    ProjectsModal,
    SkillsModal,
    CertificatesModal,
    AwardsModal,
    CustomAlert,
} from '../../../../components';

// Profile partials/sections
import ProfileHeader from './partials/ProfileHeader';
import CVUpload from './partials/CVUpload';
import IntroductionSection from './partials/IntroductionSection';
import ExperienceSection from './partials/ExperienceSection';
import EducationSection from './partials/EducationSection';
import ProfileCompletionCard from './partials/ProfileSidebar';
import {
    SkillsSection,
    LanguagesSection,
    ProjectsSection,
    CertificatesSection,
    AwardsSection
} from './partials/ProfileSections';

// Custom hooks
import { useModals, useSelectedItems } from './hooks/useProfileState';
import { mapUserData, extractProfileSections } from './utils/profileHelpers';

export default function Profile() {
    const dispatch = useDispatch();
    const { userId } = useSelector((state) => state.auth);
    const { alertConfig, showSuccess, showError, hideAlert } = useCustomAlert();
    
    // Fetch real user profile data from API
    const { profileData, isLoading, error } = useUserProfile();

    // Extract student_info from profileData (BE auto joins this data for Student role)
    const studentInfo = profileData?.student_info || {};

    // Local state for optimistic    updates - update UI immediately
    const [localProfileData, setLocalProfileData] = useState(null);
    const [localStudentInfo, setLocalStudentInfo] = useState(null);

    // UI State
    const [showAllExperiences, setShowAllExperiences] = useState(false);
    const [showAllEducations, setShowAllEducations] = useState(false);
    const [completionPercentage, setCompletionPercentage] = useState(5);

    // Custom hooks for modal and selection management
    const { modals, openModal, closeModal } = useModals();
    const {
        selectedEducation,
        setSelectedEducation,
        selectedExperience,
        setSelectedExperience,
        selectedSkillGroup,
        setSelectedSkillGroup,
        selectedProject,
        setSelectedProject,
        selectedCertificate,
        setSelectedCertificate,
        selectedAward,
        setSelectedAward,
    } = useSelectedItems();

    // Sync local state when Redux data changes
    useEffect(() => {
        if (profileData) {
            setLocalProfileData(profileData);
            setLocalStudentInfo(profileData?.student_info || {});
        }
    }, [profileData]);

    // Helper to refresh profile data from server
    const refreshProfile = useCallback(() => {
        if (userId) {
            dispatch(getUserById(userId));
        }
    }, [dispatch, userId]);

    // Use local state for display (optimistic), fallback to profileData
    const displayData = localProfileData || profileData;
    const displayStudentInfo = localStudentInfo || studentInfo;

    // Map user data using helper
    const user = mapUserData(displayData, displayStudentInfo);
    
    // Extract profile sections using helper
    const {
        cvFile,
        introduction,
        experiences,
        educations,
        skills,
        languages,
        projects,
        certificates,
        awards
    } = extractProfileSections(displayStudentInfo);

    // Calculate profile completion percentage
    useEffect(() => {
        const sections = [
            user.name, user.email, introduction,
            experiences.length > 0, educations.length > 0,
            skills.length > 0, languages.length > 0,
            projects.length > 0, certificates.length > 0
        ];
        const completed = sections.filter(Boolean).length;
        setCompletionPercentage(Math.round((completed / sections.length) * 100));
    }, [user, introduction, experiences, educations, skills, languages, projects, certificates]);

    // Generic optimistic update handler
    const createOptimisticUpdate = useCallback((sectionKey) => async (data) => {
        try {
            // Optimistic update
            setLocalStudentInfo(prev => ({ ...prev, ...data }));
            
            // Background API sync
            const updateData = {
                student_info: { ...displayStudentInfo, ...data }
            };
            
            dispatch(updateUser({ userId, userData: updateData }))
                .catch((error) => {
                    console.error(`Error updating ${sectionKey}:`, error);
                    setLocalStudentInfo(displayStudentInfo);
                });
        } catch (error) {
            console.error(`Error in ${sectionKey} update:`, error);
        }
    }, [dispatch, userId, displayStudentInfo]);

    // CV Upload/Delete/View Handlers
    const handleCVFileChange = (file) => {
        // TODO: Integrate API call to save CV file to backend
        setLocalStudentInfo(prev => ({
            ...prev,
            cv_url: URL.createObjectURL(file)
        }));
    };

    const handleDeleteCV = () => {
        setLocalStudentInfo(prev => ({
            ...prev,
            cv_url: null
        }));
    };

    const handleViewCV = () => {
        if (cvFile?.url) {
            window.open(cvFile.url, '_blank');
        }
    };

    const handleSaveInformation = async (formData) => {
        try {
            // Split full name into first_name and last_name
            const nameParts = (formData.fullName || '').trim().split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';

            // Prepare update data
            const updateData = {
                first_name: firstName,
                last_name: lastName,
                email: formData.email,
                student_info: {
                    ...displayStudentInfo,
                    date_of_birth: formData.dateOfBirth,
                    gender: formData.gender,
                    address: formData.address,
                    personal_links: formData.personalLink,
                }
            };

            // OPTIMISTIC UPDATE: Update UI immediately
            setLocalProfileData(prev => ({
                ...prev,
                first_name: firstName,
                last_name: lastName,
                email: formData.email,
            }));
            setLocalStudentInfo(prev => ({
                ...prev,
                date_of_birth: formData.dateOfBirth,
                gender: formData.gender,
                address: formData.address,
                personal_links: formData.personalLink,
            }));

            closeModal('information');
            showSuccess('Cập nhật thông tin thành công!');

            // Send to API in background
            dispatch(updateUser({ userId, userData: updateData }))
                .then(() => {
                    refreshProfile();
                })
                .catch((error) => {
                    console.error('Error updating information:', error);
                    // Rollback on error
                    setLocalProfileData(profileData);
                    setLocalStudentInfo(profileData?.student_info || {});
                    showError('Cập nhật thất bại, vui lòng thử lại');
                });
        } catch (error) {
            console.error('Error in handleSaveInformation:', error);
            showError('Có lỗi xảy ra');
        }
    };

    // Introduction/Bio Handlers
    const handleSaveIntroduction = async (formData) => {
        try {
            const newAbout = formData.introduction || formData.content || '';
            const updateData = {
                student_info: {
                    ...displayStudentInfo,
                    about: newAbout
                }
            };

            // OPTIMISTIC UPDATE
            setLocalStudentInfo(prev => ({
                ...prev,
                about: newAbout
            }));

            closeModal('introduction');
            showSuccess('Cập nhật giới thiệu thành công!');

            // Send to API in background
            dispatch(updateUser({ userId, userData: updateData }))
                .then(() => {
                    refreshProfile();
                })
                .catch((error) => {
                    console.error('Error saving introduction:', error);
                    setLocalStudentInfo(displayStudentInfo);
                    showError('Cập nhật thất bại, vui lòng thử lại');
                });
        } catch (error) {
            console.error('Error in handleSaveIntroduction:', error);
            showError('Có lỗi xảy ra');
        }
    };

    // Experience Section Handlers
    const handleEditExperience = (exp) => {
        setSelectedExperience(exp);
        openModal('experience');
    };

    const handleSaveExperience = async (formData) => {
        try {
            const experienceData = {
                position: formData.jobTitle,
                company_name: formData.company,
                start_date: `${formData.startYear}-${formData.startMonth || '01'}-01`,
                end_date: formData.isCurrentlyWorking ? null : `${formData.endYear}-${formData.endMonth || '12'}-01`,
                description: formData.description,
            };

            let updatedExperiences;
            if (selectedExperience) {
                updatedExperiences = experiences.map(exp => 
                    exp.id === selectedExperience.id ? { ...exp, ...experienceData } : exp
                );
            } else {
                updatedExperiences = [...experiences, experienceData];
            }

            // OPTIMISTIC UPDATE
            setLocalStudentInfo(prev => ({
                ...prev,
                experiences: updatedExperiences
            }));

            setSelectedExperience(null);
            closeModal('experience');
            showSuccess('Lưu kinh nghiệm làm việc thành công!');

            // Send to API in background
            const updateData = {
                student_info: {
                    ...displayStudentInfo,
                    experiences: updatedExperiences
                }
            };
            dispatch(updateUser({ userId, userData: updateData }))
                .then(() => {
                    refreshProfile();
                })
                .catch((error) => {
                    console.error('Error saving experience:', error);
                    setLocalStudentInfo(displayStudentInfo);
                    showError('Cập nhật thất bại, vui lòng thử lại');
                });
        } catch (error) {
            console.error('Error in handleSaveExperience:', error);
            showError('Có lỗi xảy ra');
        }
    };

    const handleDeleteExperience = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa thông tin công việc này?')) {
            try {
                const updatedExperiences = experiences.filter(exp => exp.id !== id);
                
                const updateData = {
                    student_info: {
                        ...studentInfo,
                        experiences: updatedExperiences
                    }
                };

                dispatch(updateUser({ userId, userData: updateData }))
                    .then(() => {
                        refreshProfile();
                    });
                showSuccess('Xóa kinh nghiệm làm việc thành công!');
            } catch (error) {
                console.error('Error deleting experience:', error);
                showError('Có lỗi xảy ra khi xóa kinh nghiệm làm việc');
            }
        }
    };

    // Education Handlers
    const handleEditEducation = (edu) => {
        setSelectedEducation(edu);
        openModal('education');
    };

    const handleSaveEducation = async (formData) => {
        try {
            const educationData = {
                school_name: formData.school,
                degree: formData.degree,
                major: formData.major,
                start_date: `${formData.startYear}-${formData.startMonth || '01'}-01`,
                end_date: formData.isCurrentlyStudying ? null : `${formData.endYear}-${formData.endMonth || '12'}-01`,
                gpa: formData.gpa || null,
            };

            let updatedEducations;
            if (selectedEducation) {
                updatedEducations = educations.map(edu => 
                    edu.id === selectedEducation.id ? { ...edu, ...educationData } : edu
                );
            } else {
                updatedEducations = [...educations, educationData];
            }

            // OPTIMISTIC UPDATE
            setLocalStudentInfo(prev => ({
                ...prev,
                educations: updatedEducations
            }));
            
            setSelectedEducation(null);
            closeModal('education');
            showSuccess('Lưu học vấn thành công!');

            // Send to API in background
            const updateData = {
                student_info: {
                    ...displayStudentInfo,
                    educations: updatedEducations
                }
            };
            dispatch(updateUser({ userId, userData: updateData }))
                .then(() => {
                    refreshProfile();
                })
                .catch((error) => {
                    console.error('Error saving education:', error);
                    setLocalStudentInfo(displayStudentInfo);
                    showError('Cập nhật thất bại, vui lòng thử lại');
                });
        } catch (error) {
            console.error('Error in handleSaveEducation:', error);
            showError('Có lỗi xảy ra');
        }
    };

    const handleDeleteEducation = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa thông tin học vấn này?')) {
            try {
                const updatedEducations = educations.filter(edu => edu.id !== id);
                
                // OPTIMISTIC UPDATE
                setLocalStudentInfo(prev => ({
                    ...prev,
                    educations: updatedEducations
                }));
                
                showSuccess('Xóa học vấn thành công!');
                
                // Send to API in background
                const updateData = {
                    student_info: {
                        ...displayStudentInfo,
                        educations: updatedEducations
                    }
                };
                dispatch(updateUser({ userId, userData: updateData }))
                    .then(() => {
                        refreshProfile();
                    })
                    .catch((error) => {
                        console.error('Error deleting education:', error);
                        setLocalStudentInfo(displayStudentInfo);
                        showError('Xóa thất bại, vui lòng thử lại');
                    });
            } catch (error) {
                console.error('Error in handleDeleteEducation:', error);
                showError('Có lỗi xảy ra');
            }
        }
    };

    // Skills Handlers
    const handleEditSkillGroup = () => {
        // Pass the string array directly
        setSelectedSkillGroup(skills);
        openModal('skills');
    };

    const handleSaveSkillGroup = async (skillsArray) => {
        try {
            // skillsArray is already a string array: ["JavaScript", "React", ...]
            const updatedSkills = Array.isArray(skillsArray) ? skillsArray : [];

            // OPTIMISTIC UPDATE
            setLocalStudentInfo(prev => ({
                ...prev,
                skills: updatedSkills
            }));

            setSelectedSkillGroup(null);
            closeModal('skills');
            showSuccess('Lưu kỹ năng thành công!');

            // Send to API in background
            const updateData = {
                student_info: {
                    ...displayStudentInfo,
                    skills: updatedSkills
                }
            };
            dispatch(updateUser({ userId, userData: updateData }))
                .then(() => {
                    refreshProfile();
                })
                .catch((error) => {
                    console.error('Error saving skills:', error);
                    setLocalStudentInfo(displayStudentInfo);
                    showError('Cập nhật thất bại, vui lòng thử lại');
                });
        } catch (error) {
            console.error('Error in handleSaveSkillGroup:', error);
            showError('Có lỗi xảy ra');
        }
    };

    const handleDeleteSkillGroup = (updatedSkills) => {
        try {
            // updatedSkills is the filtered array from SkillsSection
            const skillsToSave = Array.isArray(updatedSkills) ? updatedSkills : [];

            // Optimistic update
            setLocalStudentInfo(prev => ({
                ...prev,
                skills: skillsToSave
            }));

            const updateData = {
                student_info: {
                    ...displayStudentInfo,
                    skills: skillsToSave
                }
            };

            showSuccess('Xóa kỹ năng thành công!');
            dispatch(updateUser({ userId, userData: updateData }))
                .then(() => {
                    refreshProfile();
                })
                .catch((error) => {
                    console.error('Error deleting skill:', error);
                    setLocalStudentInfo(displayStudentInfo);
                    showError('Có lỗi xảy ra khi xóa kỹ năng');
                });
        } catch (error) {
            console.error('Error in handleDeleteSkillGroup:', error);
            showError('Có lỗi xảy ra');
        }
    };

    // Languages Handlers
    const handleSaveLanguages = async (formData) => {
        try {
            const updateData = {
                student_info: {
                    ...studentInfo,
                    languages: formData.languages || []
                }
            };

            showSuccess('Lưu ngôn ngữ thành công!');
            dispatch(updateUser({ userId, userData: updateData }))
                .then(() => {
                    refreshProfile();
                });
            closeModal('languages');
        } catch (error) {
            console.error('Error saving languages:', error);
            showError('Có lỗi xảy ra khi lưu ngôn ngữ');
        }
    };

    // Projects Handlers
    const handleEditProject = (project) => {
        setSelectedProject(project);
        openModal('projects');
    };

    const handleSaveProjects = async (formData) => {
        try {
            const updateData = {
                student_info: {
                    ...studentInfo,
                    projects: formData.projects || []
                }
            };

            showSuccess('Lưu dự án thành công!');
            dispatch(updateUser({ userId, userData: updateData }))
                .then(() => {
                    refreshProfile();
                });
            closeModal('projects');
        } catch (error) {
            console.error('Error saving projects:', error);
            showError('Có lỗi xảy ra khi lưu dự án');
        }
    };

    const handleDeleteProject = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
            try {
                const updatedProjects = projects.filter(proj => proj.id !== id);
                
                const updateData = {
                    student_info: {
                        ...studentInfo,
                        projects: updatedProjects
                    }
                };

                showSuccess('Xóa dự án thành công!');
                dispatch(updateUser({ userId, userData: updateData }))
                    .then(() => {
                        refreshProfile();
                    });
            } catch (error) {
                console.error('Error deleting project:', error);
                showError('Có lỗi xảy ra khi xóa dự án');
            }
        }
    };

    // Certificates Handlers
    const handleEditCertificate = (cert) => {
        setSelectedCertificate(cert);
        openModal('certificates');
    };

    const handleSaveCertificates = async (formData) => {
        try {
            const updateData = {
                student_info: {
                    ...studentInfo,
                    certificates: formData.certificates || []
                }
            };

            showSuccess('Lưu chứng chỉ thành công!');
            dispatch(updateUser({ userId, userData: updateData }))
                .then(() => {
                    refreshProfile();
                });
            closeModal('certificates');
        } catch (error) {
            console.error('Error saving certificates:', error);
            showError('Có lỗi xảy ra khi lưu chứng chỉ');
        }
    };

    const handleDeleteCertificate = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa chứng chỉ này?')) {
            try {
                const updatedCertificates = certificates.filter(cert => cert.id !== id);
                
                const updateData = {
                    student_info: {
                        ...studentInfo,
                        certificates: updatedCertificates
                    }
                };

                showSuccess('Xóa chứng chỉ thành công!');
                dispatch(updateUser({ userId, userData: updateData }))
                    .then(() => {
                        refreshProfile();
                    });
            } catch (error) {
                console.error('Error deleting certificate:', error);
                showError('Có lỗi xảy ra khi xóa chứng chỉ');
            }
        }
    };

    // Awards Handlers
    const handleEditAward = (award) => {
        setSelectedAward(award);
        openModal('awards');
    };

    const handleSaveAwards = async (formData) => {
        try {
            const updateData = {
                student_info: {
                    ...studentInfo,
                    awards: formData.awards || []
                }
            };

            showSuccess('Lưu giải thưởng thành công!');
            dispatch(updateUser({ userId, userData: updateData }))
                .then(() => {
                    refreshProfile();
                });
            closeModal('awards');
        } catch (error) {
            console.error('Error saving awards:', error);
            showError('Có lỗi xảy ra khi lưu giải thưởng');
        }
    };

    const handleDeleteAward = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa giải thưởng này?')) {
            try {
                const updatedAwards = awards.filter(award => award.id !== id);
                
                const updateData = {
                    student_info: {
                        ...studentInfo,
                        awards: updatedAwards
                    }
                };

                showSuccess('Xóa giải thưởng thành công!');
                dispatch(updateUser({ userId, userData: updateData }))
                    .then(() => {
                        refreshProfile();
                    });
            } catch (error) {
                console.error('Error deleting award:', error);
                showError('Có lỗi xảy ra khi xóa giải thưởng');
            }
        }
    };

    // Loading State
    if (isLoading) {
        return (
            <Container maxWidth="lg" sx={{ py: 10, textAlign: 'center' }}>
                <CircularProgress />
                <Box sx={{ mt: 2 }}>Đang tải thông tin profile...</Box>
            </Container>
        );
    }

    // Error State
    if (error) {
        return (
            <Container maxWidth="lg" sx={{ py: 10 }}>
                <Alert severity="error">
                    Lỗi khi tải profile: {error}
                </Alert>
            </Container>
        );
    }

    // No Data
    if (!profileData) {
        return (
            <Container maxWidth="lg" sx={{ py: 10 }}>
                <Alert severity="warning">
                    Không tìm thấy thông tin profile
                </Alert>
            </Container>
        );
    }

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>

                    {/* Main Content */}
                    <Box sx={{ flex: 1, maxWidth: 900 }}>
                        <ProfileHeader user={user} onEdit={() => openModal('information')} />

                        <CVUpload
                            cvFile={cvFile}
                            onFileChange={handleCVFileChange}
                            onDelete={handleDeleteCV}
                            onView={handleViewCV}
                        />

                        <IntroductionSection
                            introduction={introduction}
                            onEdit={() => openModal('introduction')}
                        />

                        <ExperienceSection
                            experiences={experiences}
                            showAll={showAllExperiences}
                            onToggleShowAll={() => setShowAllExperiences(!showAllExperiences)}
                            onEdit={handleEditExperience}
                            onDelete={handleDeleteExperience}
                            onAdd={() => { setSelectedExperience(null); openModal('experience'); }}
                        />

                        <EducationSection
                            educations={educations}
                            showAll={showAllEducations}
                            onToggleShowAll={() => setShowAllEducations(!showAllEducations)}
                            onEdit={handleEditEducation}
                            onDelete={handleDeleteEducation}
                            onAdd={() => { setSelectedEducation(null); openModal('education'); }}
                        />

                        <SkillsSection
                            skills={skills}
                            onEdit={handleEditSkillGroup}
                            onDelete={handleDeleteSkillGroup}
                            onAdd={() => { setSelectedSkillGroup(null); openModal('skills'); }}
                        />

                        <LanguagesSection
                            languages={languages}
                            onEdit={() => openModal('languages')}
                        />

                        <ProjectsSection
                            projects={projects}
                            onEdit={handleEditProject}
                            onDelete={handleDeleteProject}
                            onAdd={() => { setSelectedProject(null); openModal('projects'); }}
                        />

                        <CertificatesSection
                            certificates={certificates}
                            onEdit={handleEditCertificate}
                            onDelete={handleDeleteCertificate}
                            onAdd={() => { setSelectedCertificate(null); openModal('certificates'); }}
                        />

                        <AwardsSection
                            awards={awards}
                            onEdit={handleEditAward}
                            onDelete={handleDeleteAward}
                            onAdd={() => { setSelectedAward(null); openModal('awards'); }}
                        />
                    </Box>

                    {/* Right Sidebar - Completion (hidden on small screens) */}
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <ProfileCompletionCard
                            completionPercentage={completionPercentage}
                            onAddIntroduction={() => openModal('introduction')}
                            onAddExperience={() => { setSelectedExperience(null); openModal('experience'); }}
                        />
                    </Box>
                </Box>
            </Container>

            {/* Modals */}
            <InformationModal
                open={modals.information}
                onOpenChange={(open) => open ? openModal('information') : closeModal('information')}
                initialData={user}
                onSave={handleSaveInformation}
            />

            <IntroductionModal
                open={modals.introduction}
                onOpenChange={(open) => open ? openModal('introduction') : closeModal('introduction')}
                initialData={{ introduction }}
                onSave={handleSaveIntroduction}
            />

            <ExperienceModal
                open={modals.experience}
                onOpenChange={(open) => {
                    if (open) openModal('experience');
                    else { closeModal('experience'); setSelectedExperience(null); }
                }}
                initialData={selectedExperience ? {
                    jobTitle: selectedExperience.role,
                    company: selectedExperience.company,
                    startMonth: selectedExperience.startMonth || '',
                    startYear: selectedExperience.startYear || '',
                    endMonth: selectedExperience.endMonth || '',
                    endYear: selectedExperience.endYear === 'Present' ? '' : selectedExperience.endYear,
                    isCurrentlyWorking: selectedExperience.isCurrentlyWorking,
                    description: selectedExperience.description || '',
                } : null}
                onSave={handleSaveExperience}
            />

            <EducationModal
                open={modals.education}
                onOpenChange={(open) => {
                    if (open) openModal('education');
                    else { closeModal('education'); setSelectedEducation(null); }
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

            <SkillsModal
                open={modals.skills}
                onOpenChange={(open) => {
                    if (open) openModal('skills');
                    else { closeModal('skills'); setSelectedSkillGroup(null); }
                }}
                initialData={selectedSkillGroup}
                onSave={handleSaveSkillGroup}
            />

            <LanguagesModal
                open={modals.languages}
                onOpenChange={(open) => open ? openModal('languages') : closeModal('languages')}
                initialData={null}
                onSave={handleSaveLanguages}
            />

            <ProjectsModal
                open={modals.projects}
                onOpenChange={(open) => {
                    if (open) openModal('projects');
                    else { closeModal('projects'); setSelectedProject(null); }
                }}
                initialData={selectedProject}
                onSave={handleSaveProjects}
            />

            <CertificatesModal
                open={modals.certificates}
                onOpenChange={(open) => {
                    if (open) openModal('certificates');
                    else { closeModal('certificates'); setSelectedCertificate(null); }
                }}
                initialData={selectedCertificate}
                onSave={handleSaveCertificates}
            />

            <AwardsModal
                open={modals.awards}
                onOpenChange={(open) => {
                    if (open) openModal('awards');
                    else { closeModal('awards'); setSelectedAward(null); }
                }}
                initialData={selectedAward}
                onSave={handleSaveAwards}
            />

            {/* Alert Notification */}
            <CustomAlert
                open={alertConfig.open}
                text={alertConfig.text}
                severity={alertConfig.severity}
                variant={alertConfig.variant}
                color={alertConfig.color}
                autoHideDuration={alertConfig.autoHideDuration}
                onClose={hideAlert}
            />
        </Box>
    );
}
