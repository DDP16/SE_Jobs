import { useState, useCallback } from 'react';

/**
 * Custom hook for managing modal states
 */
export const useModals = () => {
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

    const openModal = useCallback((modalName) => {
        setModals(prev => ({ ...prev, [modalName]: true }));
    }, []);

    const closeModal = useCallback((modalName) => {
        setModals(prev => ({ ...prev, [modalName]: false }));
    }, []);

    return { modals, openModal, closeModal };
};

/**
 * Custom hook for managing selected items for editing
 */
export const useSelectedItems = () => {
    const [selectedEducation, setSelectedEducation] = useState(null);
    const [selectedExperience, setSelectedExperience] = useState(null);
    const [selectedSkillGroup, setSelectedSkillGroup] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [selectedAward, setSelectedAward] = useState(null);

    const clearSelection = useCallback((itemType) => {
        const setters = {
            education: setSelectedEducation,
            experience: setSelectedExperience,
            skills: setSelectedSkillGroup,
            project: setSelectedProject,
            certificate: setSelectedCertificate,
            award: setSelectedAward,
        };
        setters[itemType]?.(null);
    }, []);

    return {
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
        clearSelection,
    };
};
