import React from 'react';
import {
    InformationModal,
    AboutModal,
    ExperienceModal,
    EducationModal,
    LanguagesModal,
    ProjectsModal,
    SkillsModal,
    CertificatesModal,
    AwardsModal,
} from '../../../../../components';

export const ProfileModals = ({
    modals,
    openModal,
    closeModal,
    user,
    skills,
    selectedExperience,
    selectedEducation,
    selectedSkillGroup,
    selectedProject,
    selectedCertificate,
    selectedAward,
    setSelectedExperience,
    setSelectedEducation,
    setSelectedSkillGroup,
    setSelectedProject,
    setSelectedCertificate,
    setSelectedAward,
    handlers,
}) => {
    return (
        <>
            <InformationModal
                open={modals.information}
                onOpenChange={(open) => open ? openModal('information') : closeModal('information')}
                initialData={user}
                onSave={handlers.handleSaveInformation}
            />

            <AboutModal
                open={modals.about}
                onOpenChange={(open) => open ? openModal('about') : closeModal('about')}
                onSave={handlers.handleSaveAbout}
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
                onSave={handlers.handleSaveExperience}
            />

            <EducationModal
                open={modals.education}
                onOpenChange={(open) => {
                    if (open) openModal('education');
                    else { closeModal('education'); setSelectedEducation(null); }
                }}
                initialData={selectedEducation ? (() => {
                    let startMonth = selectedEducation.startMonth || '';
                    let startYear = selectedEducation.startYear || '';
                    let endMonth = selectedEducation.endMonth || '';
                    let endYear = selectedEducation.endYear || '';
                    let isCurrentlyStudying = selectedEducation.isCurrentlyStudying || false;

                    if (selectedEducation.start_date) {
                        const startDate = new Date(selectedEducation.start_date);
                        startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
                        startYear = String(startDate.getFullYear());

                        if (selectedEducation.end_date && selectedEducation.end_date !== null) {
                            const endDate = new Date(selectedEducation.end_date);
                            endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
                            endYear = String(endDate.getFullYear());
                            isCurrentlyStudying = false;
                        } else {
                            // end_date is null means currently studying
                            endMonth = '';
                            endYear = '';
                            isCurrentlyStudying = true;
                        }
                    } else if (selectedEducation.endYear === 'Present') {
                        isCurrentlyStudying = true;
                        endMonth = '';
                        endYear = '';
                    }

                    return {
                        school: selectedEducation.school || selectedEducation.university || '',
                        degree: selectedEducation.degree || '',
                        major: selectedEducation.major || '',
                        startMonth,
                        startYear,
                        endMonth,
                        endYear,
                        isCurrentlyStudying,
                        description: selectedEducation.description || '',
                    };
                })() : null}
                onSave={handlers.handleSaveEducation}
            />

            <SkillsModal
                open={modals.skills}
                onOpenChange={(open) => {
                    if (open) openModal('skills');
                    else { closeModal('skills'); setSelectedSkillGroup(null); }
                }}
                initialData={skills}
                onSave={handlers.handleSaveSkillGroup}
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
        </>
    );
};