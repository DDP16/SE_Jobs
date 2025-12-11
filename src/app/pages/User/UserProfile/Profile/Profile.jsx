import React, { useEffect } from 'react';
import { Container, Box, CircularProgress, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

// Partials
import ProfileHeader from './partials/ProfileHeader';
import CVUpload from './partials/CVUpload';
import AboutSection from './partials/AboutSection';
import ExperienceSection from './partials/ExperienceSection';
import EducationSection from './partials/EducationSection';
import ProfileCompletionCard from './partials/ProfileSidebar';
import {
    SkillsSection,
    ProjectsSection,
    CertificatesSection,
    AwardsSection
} from './partials/ProfileSections';

// Custom Hooks
import { useProfileData } from './hooks/useProfileData';
import { useProfileModals } from './hooks/useProfileModals';
import { useProfileHandlers } from './hooks/useProfileHandlers';

// Components
import { ProfileModals } from './components/ProfileModals';

import { getEducationByStudentId } from '../../../../modules/services/educationsService';

export default function Profile() {
    const dispatch = useDispatch();

    // Check auth state
    const currentUser = useSelector((state) => state.auth.user);
    const authStatus = useSelector((state) => state.auth.status);

    // Custom hooks for data management
    const profileData = useProfileData();
    const modalState = useProfileModals();

    // Handlers
    const handlers = useProfileHandlers({
        ...profileData,
        ...modalState,
        dispatch,
        currentUser,
    });

    // Fetch profile data (education, experience, etc.) once when component mounts
    useEffect(() => {
        if (currentUser && currentUser.user_id) {
            // Import and dispatch your data fetching actions here
            // Example: dispatch(getEducations(currentUser.user_id));
            // dispatch(getExperiences(currentUser.user_id));
            // dispatch(getSkills(currentUser.user_id));
            dispatch(getEducationByStudentId(currentUser.student_info.id));
        }
    }, [currentUser?.user_id, dispatch]);

    // Show loading if no user data yet (after reload)
    if (!currentUser && authStatus === 'loading') {
        return (
            <Box sx={{
                bgcolor: 'background.default',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress size={48} sx={{ mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                        Đang tải thông tin người dùng...
                    </Typography>
                </Box>
            </Box>
        );
    }

    const {
        user,
        cvFile,
        about,
        experiences,
        educations,
        skills,
        projects,
        certificates,
        awards,
        showAllExperiences,
        setShowAllExperiences,
        showAllEducations,
        setShowAllEducations,
        completionPercentage,
    } = profileData;

    const {
        modals,
        openModal,
        closeModal,
        selectedEducation,
        selectedExperience,
        selectedSkillGroup,
        selectedProject,
        selectedCertificate,
        selectedAward,
        setSelectedEducation,
        setSelectedExperience,
        setSelectedSkillGroup,
        setSelectedProject,
        setSelectedCertificate,
        setSelectedAward,
    } = modalState;

    // Edit handlers that set selected item and open modal
    const handleEditExperience = (exp) => {
        setSelectedExperience(exp);
        openModal('experience');
    };

    const handleEditEducation = (edu) => {
        setSelectedEducation(edu);
        openModal('education');
    };

    const handleEditSkillGroup = () => {
        // For simple array skills we just open the modal with current skills
        setSelectedSkillGroup(null);
        openModal('skills');
    };

    const handleEditProject = (project) => {
        setSelectedProject(project);
        openModal('projects');
    };

    const handleEditCertificate = (cert) => {
        setSelectedCertificate(cert);
        openModal('certificates');
    };

    const handleEditAward = (award) => {
        setSelectedAward(award);
        openModal('awards');
    };

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
                    {/* Main Content */}
                    <Box sx={{ flex: 1, maxWidth: 900 }}>
                        <ProfileHeader
                            user={user}
                            onEdit={() => openModal('information')}
                        />

                        <CVUpload
                            cvFile={cvFile}
                            onFileChange={handlers.handleCVFileChange}
                            onDelete={handlers.handleDeleteCV}
                            onView={() => handlers.handleViewCV(cvFile)}
                        />

                        <AboutSection
                            about={about}
                            onEdit={() => openModal('about')}
                        />

                        <ExperienceSection
                            experiences={experiences}
                            showAll={showAllExperiences}
                            onToggleShowAll={() => setShowAllExperiences(!showAllExperiences)}
                            onEdit={handleEditExperience}
                            onDelete={handlers.handleDeleteExperience}
                            onAdd={() => { setSelectedExperience(null); openModal('experience'); }}
                        />

                        <EducationSection
                            educations={educations}
                            showAll={showAllEducations}
                            onToggleShowAll={() => setShowAllEducations(!showAllEducations)}
                            onEdit={handleEditEducation}
                            onDelete={handlers.handleDeleteEducation}
                            onAdd={() => { setSelectedEducation(null); openModal('education'); }}
                        />

                        <SkillsSection
                            skills={skills}
                            onEdit={handleEditSkillGroup}
                            onDelete={handlers.handleDeleteSkillGroup}
                            onAdd={() => { setSelectedSkillGroup(null); openModal('skills'); }}
                        />

                        <ProjectsSection
                            projects={projects}
                            onEdit={handleEditProject}
                            onDelete={handlers.handleDeleteProject}
                            onAdd={() => { setSelectedProject(null); openModal('projects'); }}
                        />

                        <CertificatesSection
                            certificates={certificates}
                            onEdit={handleEditCertificate}
                            onDelete={handlers.handleDeleteCertificate}
                            onAdd={() => { setSelectedCertificate(null); openModal('certificates'); }}
                        />

                        <AwardsSection
                            awards={awards}
                            onEdit={handleEditAward}
                            onDelete={handlers.handleDeleteAward}
                            onAdd={() => { setSelectedAward(null); openModal('awards'); }}
                        />
                    </Box>

                    {/* Right Sidebar - Completion (hidden on small screens) */}
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <ProfileCompletionCard
                            completionPercentage={completionPercentage}
                        />
                    </Box>
                </Box>
            </Container>

            {/* All Modals */}
            <ProfileModals
                modals={modals}
                openModal={openModal}
                closeModal={closeModal}
                user={user}
                selectedExperience={selectedExperience}
                selectedEducation={selectedEducation}
                selectedSkillGroup={selectedSkillGroup}
                selectedProject={selectedProject}
                selectedCertificate={selectedCertificate}
                selectedAward={selectedAward}
                    skills={skills}
                setSelectedExperience={setSelectedExperience}
                setSelectedEducation={setSelectedEducation}
                setSelectedSkillGroup={setSelectedSkillGroup}
                setSelectedProject={setSelectedProject}
                setSelectedCertificate={setSelectedCertificate}
                setSelectedAward={setSelectedAward}
                handlers={handlers}
            />
        </Box>
    );
}
