import React, { useState, useEffect } from 'react';
import { Container, Box } from '@mui/material';
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
    ProfileSidebar
} from '../../../../components';

// Partials
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

export default function Profile() {
    // User Data
    const [user, setUser] = useState({
        name: 'Sang Trinh',
        email: 'test@gmail.com',
        phone: '012345679899',
        dateOfBirth: '',
        gender: '',
        currentAddress: '',
        personalLinks: '',
    });

    // Profile Data
    const [cvFile, setCvFile] = useState(null);
    const [introduction, setIntroduction] = useState('');
    const [experiences, setExperiences] = useState([]);
    const [educations, setEducations] = useState([]);
    const [skills, setSkills] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [projects, setProjects] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [awards, setAwards] = useState([]);

    // UI State
    const [showAllExperiences, setShowAllExperiences] = useState(false);
    const [showAllEducations, setShowAllEducations] = useState(false);
    const [completionPercentage, setCompletionPercentage] = useState(5);

    // Modal State
    const [modals, setModals] = useState({
        information: false,
        introduction: false,
        experience: false,
        education: false,
        skills: false,
        languages: false,
        projects: false,
        certificates: false,
        awards: false,
    });

    // Selected Items
    const [selectedEducation, setSelectedEducation] = useState(null);
    const [selectedExperience, setSelectedExperience] = useState(null);
    const [selectedSkillGroup, setSelectedSkillGroup] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [selectedAward, setSelectedAward] = useState(null);

    // Calculate completion percentage
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

    // Modal Helpers
    const openModal = (modalName) => setModals(prev => ({ ...prev, [modalName]: true }));
    const closeModal = (modalName) => setModals(prev => ({ ...prev, [modalName]: false }));

    // CV Handlers
    const handleCVFileChange = (file) => {
        setCvFile({
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(2),
            uploadDate: new Date().toLocaleDateString('vi-VN'),
            file: file
        });
    };

    const handleDeleteCV = () => setCvFile(null);

    const handleViewCV = () => {
        if (cvFile?.file) {
            const fileURL = URL.createObjectURL(cvFile.file);
            window.open(fileURL, '_blank');
        }
    };

    // Information Handlers
    const handleSaveInformation = (formData) => {
        setUser(prev => ({
            ...prev,
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            currentAddress: formData.address,
            personalLinks: formData.personalLink,
            ...(formData.title && { title: formData.title }),
        }));
        closeModal('information');
    };

    const handleSaveIntroduction = (formData) => {
        setIntroduction(formData.introduction || formData.content || '');
        closeModal('introduction');
    };

    // Experience Handlers
    const handleEditExperience = (exp) => {
        setSelectedExperience(exp);
        openModal('experience');
    };

    const handleSaveExperience = (formData) => {
        const experienceData = {
            id: selectedExperience?.id || Date.now(),
            role: formData.jobTitle,
            company: formData.company,
            logo: formData.company?.charAt(0).toUpperCase() || 'C',
            startMonth: formData.startMonth,
            startYear: formData.startYear,
            endMonth: formData.endMonth,
            endYear: formData.endYear,
            isCurrentlyWorking: formData.isCurrentlyWorking,
            description: formData.description,
        };

        if (selectedExperience) {
            setExperiences(prev => prev.map(exp => exp.id === selectedExperience.id ? experienceData : exp));
        } else {
            setExperiences(prev => [...prev, experienceData]);
        }
        setSelectedExperience(null);
        closeModal('experience');
    };

    const handleDeleteExperience = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa thông tin công việc này?')) {
            setExperiences(prev => prev.filter(exp => exp.id !== id));
        }
    };

    // Education Handlers
    const handleEditEducation = (edu) => {
        setSelectedEducation(edu);
        openModal('education');
    };

    const handleSaveEducation = (formData) => {
        const educationData = {
            id: selectedEducation?.id || Date.now(),
            university: formData.school,
            degree: formData.degree,
            major: formData.major,
            startYear: formData.startYear,
            endYear: formData.isCurrentlyStudying ? 'Present' : formData.endYear,
            description: formData.description,
            logo: formData.school?.charAt(0).toUpperCase() || 'U',
            startMonth: formData.startMonth,
            endMonth: formData.endMonth,
            isCurrentlyStudying: formData.isCurrentlyStudying,
        };

        if (selectedEducation) {
            setEducations(prev => prev.map(edu => edu.id === selectedEducation.id ? educationData : edu));
        } else {
            setEducations(prev => [...prev, educationData]);
        }
        setSelectedEducation(null);
        closeModal('education');
    };

    const handleDeleteEducation = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa thông tin học vấn này?')) {
            setEducations(prev => prev.filter(edu => edu.id !== id));
        }
    };

    // Skills Handlers
    const handleEditSkillGroup = (skillGroup) => {
        setSelectedSkillGroup(skillGroup);
        openModal('skills');
    };

    const handleDeleteSkillGroup = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa nhóm kỹ năng này?')) {
            setSkills(prev => prev.filter(skill => skill.id !== id));
        }
    };

    // Projects Handlers
    const handleEditProject = (project) => {
        setSelectedProject(project);
        openModal('projects');
    };

    const handleDeleteProject = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
            setProjects(prev => prev.filter(proj => proj.id !== id));
        }
    };

    // Certificates Handlers
    const handleEditCertificate = (cert) => {
        setSelectedCertificate(cert);
        openModal('certificates');
    };

    const handleDeleteCertificate = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa chứng chỉ này?')) {
            setCertificates(prev => prev.filter(cert => cert.id !== id));
        }
    };

    // Awards Handlers
    const handleEditAward = (award) => {
        setSelectedAward(award);
        openModal('awards');
    };

    const handleDeleteAward = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa giải thưởng này?')) {
            setAwards(prev => prev.filter(award => award.id !== id));
        }
    };

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
                    {/* Left Sidebar - Navigation */}
                    <ProfileSidebar user={user} />

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

                    {/* Right Sidebar - Completion */}
                    <ProfileCompletionCard
                        completionPercentage={completionPercentage}
                        onAddIntroduction={() => openModal('introduction')}
                        onAddExperience={() => { setSelectedExperience(null); openModal('experience'); }}
                    />
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
                onSave={(formData) => {
                    console.log('Skills saved:', formData);
                    closeModal('skills');
                }}
            />

            <LanguagesModal
                open={modals.languages}
                onOpenChange={(open) => open ? openModal('languages') : closeModal('languages')}
                initialData={null}
                onSave={(formData) => {
                    console.log('Languages saved:', formData);
                    closeModal('languages');
                }}
            />

            <ProjectsModal
                open={modals.projects}
                onOpenChange={(open) => {
                    if (open) openModal('projects');
                    else { closeModal('projects'); setSelectedProject(null); }
                }}
                initialData={selectedProject}
                onSave={(formData) => {
                    console.log('Project saved:', formData);
                    closeModal('projects');
                }}
            />

            <CertificatesModal
                open={modals.certificates}
                onOpenChange={(open) => {
                    if (open) openModal('certificates');
                    else { closeModal('certificates'); setSelectedCertificate(null); }
                }}
                initialData={selectedCertificate}
                onSave={(formData) => {
                    console.log('Certificate saved:', formData);
                    closeModal('certificates');
                }}
            />

            <AwardsModal
                open={modals.awards}
                onOpenChange={(open) => {
                    if (open) openModal('awards');
                    else { closeModal('awards'); setSelectedAward(null); }
                }}
                initialData={selectedAward}
                onSave={(formData) => {
                    console.log('Award saved:', formData);
                    closeModal('awards');
                }}
            />
        </Box>
    );
}
