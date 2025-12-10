import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMe } from '../../../../../modules/services/authService';

export const useProfileData = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.user);
    const userEducation = useSelector((state) => state.educations.educations);
    const userExperience = useSelector((state) => state.experiences);
    const authStatus = useSelector((state) => state.auth.status);

    console.log('Current User in useProfileData:', userEducation);

    // User Data - Initialize with safe defaults
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '012345679899',
        dateOfBirth: '',
        gender: '',
        currentAddress: '',
        personalLinks: '',
    });

    // Check localStorage for auth data on component mount
    // useEffect(() => {
    //     const isAuthenticated = localStorage.getItem('AUTHENTICATED');
    //     const userId = localStorage.getItem('USER_ID');

    //     // If we have auth data but no user in Redux, fetch user data
    //     if (isAuthenticated && userId && !currentUser && authStatus !== 'loading') {
    //         console.log('Fetching user data after reload...');
    //         dispatch(getMe());
    //     }
    // }, [currentUser, authStatus, dispatch]);

    // Sync user data when currentUser changes (after login or reload)
    useEffect(() => {
        if (currentUser) {
            setUser(prev => ({
                ...prev,
                name: `${currentUser.first_name || ''} ${currentUser.last_name || ''}`.trim() || 'User',
                email: currentUser.email || '', location: currentUser.student_info?.location || '',
                phone: currentUser?.student_info?.phone || '012345678',
                dateOfBirth: currentUser?.student_info?.date_of_birth || '',
                skills: currentUser?.student_info?.skills || [],
            }));
        }
    }, [currentUser]);

    // Profile Data
    const [cvFile, setCvFile] = useState(null);
    const [about, setAbout] = useState('');
    const [experiences, setExperiences] = useState([]);
    const [educations, setEducations] = useState([]);
    const [skills, setSkills] = useState([]);
    // const [languages, setLanguages] = useState([]);
    const [projects, setProjects] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [awards, setAwards] = useState([]);

    // UI State
    const [showAllExperiences, setShowAllExperiences] = useState(false);
    const [showAllEducations, setShowAllEducations] = useState(false);
    const [completionPercentage, setCompletionPercentage] = useState(5);

    // Sync educations with Redux state
    useEffect(() => {
        if (userEducation && Array.isArray(userEducation)) {
            setEducations(userEducation);
        }
    }, [userEducation]);

    // Calculate completion percentage
    useEffect(() => {
        const sections = [
            user.name, user.email, about, user.location,
            experiences.length > 0, educations.length > 0,
            projects.length > 0, certificates.length > 0,
            currentUser?.student_info?.skills?.length > 0
        ];
        const completed = sections.filter(Boolean).length;
        setCompletionPercentage(Math.round((completed / sections.length) * 100));
    }, [user, about, experiences, educations, projects, certificates]);

    return {
        currentUser,
        userEducation,
        userExperience,
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
        // languages,
        // setLanguages,
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
    };
};