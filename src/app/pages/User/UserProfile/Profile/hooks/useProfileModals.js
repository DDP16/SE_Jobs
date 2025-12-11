import { useState } from 'react';

export const useProfileModals = () => {
    // Modal State
    const [modals, setModals] = useState({
        information: false,
        about: false,
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

    // Modal Helpers
    const openModal = (modalName) => setModals(prev => ({ ...prev, [modalName]: true }));
    const closeModal = (modalName) => setModals(prev => ({ ...prev, [modalName]: false }));

    const resetSelection = (type) => {
        switch (type) {
            case 'education':
                setSelectedEducation(null);
                break;
            case 'experience':
                setSelectedExperience(null);
                break;
            case 'skills':
                setSelectedSkillGroup(null);
                break;
            case 'project':
                setSelectedProject(null);
                break;
            case 'certificate':
                setSelectedCertificate(null);
                break;
            case 'award':
                setSelectedAward(null);
                break;
            default:
                break;
        }
    };

    return {
        modals,
        openModal,
        closeModal,
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
        resetSelection,
    };
};