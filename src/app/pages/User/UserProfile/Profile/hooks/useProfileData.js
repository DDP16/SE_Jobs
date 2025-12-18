import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    transformExperienceFromAPI,
    transformEducationFromAPI,
    transformProjectFromAPI,
    transformCertificateFromAPI,
    calculateCompletionPercentage
} from './utils';

export const useProfileData = () => {
    const currentUser = useSelector((state) => state.auth.user);
    const authStatus = useSelector((state) => state.auth.status);

    // User Data - Initialize with safe defaults
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '012345679899',
        dateOfBirth: '',
        gender: '',
        currentAddress: '',
        personalLinks: '',
        openForOpportunities: false,
    });

    // Profile Data
    const [cvFile, setCvFile] = useState(null);
    const [about, setAbout] = useState('');
    const [experiences, setExperiences] = useState([]);
    const [educations, setEducations] = useState([]);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [awards, setAwards] = useState([]);

    // UI State
    const [showAllExperiences, setShowAllExperiences] = useState(false);
    const [showAllEducations, setShowAllEducations] = useState(false);
    const [completionPercentage, setCompletionPercentage] = useState(5);

    // Sync all data from currentUser.student_info when it changes
    useEffect(() => {
        // IMPORTANT: student_info is an ARRAY, not an object!
        const studentInfo = Array.isArray(currentUser?.student_info) 
            ? currentUser.student_info[0] 
            : currentUser?.student_info;
        
        if (studentInfo) {

            // Sync user basic info
            setUser(prev => ({
                ...prev,
                name: `${currentUser.first_name || ''} ${currentUser.last_name || ''}`.trim() || 'User',
                email: currentUser.email || '',
                location: studentInfo?.location || '',
                phone: studentInfo?.phone || '012345678',
                dateOfBirth: studentInfo?.date_of_birth || '',
                openForOpportunities: studentInfo?.open_for_opportunities === true,
            }));

            // Sync about
            setAbout(studentInfo?.about || '');

            // Sync skills
            setSkills(studentInfo?.skills || []);

            // Sync experiences (API returns 'experiences' array - plural)
            const transformedExperiences = (studentInfo?.experiences || [])
                .map(transformExperienceFromAPI)
                .filter(Boolean); // Remove nulls from failed transforms
            setExperiences(transformedExperiences);

            // Sync educations (API returns 'educations' array - plural)
            const transformedEducations = (studentInfo?.educations || [])
                .map(transformEducationFromAPI)
                .filter(Boolean);
            setEducations(transformedEducations);

            // Sync projects (API returns 'projects' array - plural)
            const transformedProjects = (studentInfo?.projects || [])
                .map(transformProjectFromAPI)
                .filter(Boolean);
            setProjects(transformedProjects);

            // Sync certificates (API returns 'certifications' array - plural)
            const transformedCertificates = (studentInfo?.certifications || [])
                .map(transformCertificateFromAPI)
                .filter(Boolean);
            setCertificates(transformedCertificates);
        }
    }, [currentUser]);

    // Calculate completion percentage
    useEffect(() => {
        const percentage = calculateCompletionPercentage(user, about, experiences, educations, projects, certificates, skills);
        setCompletionPercentage(percentage);
    }, [user, about, experiences, educations, projects, certificates, skills]);

    const setOpenForOpportunities = (value) => {
        setUser(prev => ({ ...prev, openForOpportunities: value }));
    };

    return {
        currentUser,
        user,
        setUser,
        cvFile,
        setCvFile,
        about,
        setAbout,
        experiences,
        setExperiences,
        educations,
        setEducations,
        skills,
        setSkills,
        projects,
        setProjects,
        certificates,
        setCertificates,
        awards,
        setAwards,
        showAllExperiences,
        setShowAllExperiences,
        showAllEducations,
        setShowAllEducations,
        completionPercentage,
        openForOpportunities: user.openForOpportunities === true,
        setOpenForOpportunities,
    };
};