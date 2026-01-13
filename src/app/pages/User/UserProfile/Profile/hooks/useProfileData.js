import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    transformExperienceFromAPI,
    transformEducationFromAPI,
    transformProjectFromAPI,
    transformCertificateFromAPI,
    calculateCompletionPercentage,
    mapGenderFromBackend
} from './utils';
import { getCvsByStudentId } from '../../../../../modules/services/cvService';

export const useProfileData = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.user);
    const authStatus = useSelector((state) => state.auth.status);
    const cvsFromStore = useSelector((state) => state.cvs?.cvs || []);

    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        desiredPositions: [],
        currentAddress: '',
        personalLinks: '',
        openForOpportunities: false,
    });

    const [cvs, setCvs] = useState([]);
    const [about, setAbout] = useState('');
    const [experiences, setExperiences] = useState([]);
    const [educations, setEducations] = useState([]);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [awards, setAwards] = useState([]);

    const [showAllExperiences, setShowAllExperiences] = useState(false);
    const [showAllEducations, setShowAllEducations] = useState(false);
    const [completionPercentage, setCompletionPercentage] = useState(5);

    useEffect(() => {
        const studentInfo = Array.isArray(currentUser?.student_info)
            ? currentUser.student_info[0]
            : currentUser?.student_info;

        if (studentInfo) {
            setUser(prev => ({
                ...prev,
                name: `${currentUser.last_name || ''} ${currentUser.first_name || ''}`.trim() || 'User',
                email: currentUser.email || '',
                location: studentInfo?.location || '',
                phone: studentInfo?.phone_number || studentInfo?.phone || '',
                dateOfBirth: studentInfo?.date_of_birth || '',
                gender: mapGenderFromBackend(studentInfo?.gender),
                desiredPositions: Array.isArray(studentInfo?.desired_positions)
                    ? studentInfo.desired_positions
                    : studentInfo?.desired_positions
                        ? [studentInfo.desired_positions]
                        : [],
                openForOpportunities: studentInfo?.open_for_opportunities === true,
            }));

            setAbout(studentInfo?.about || '');
            setSkills(studentInfo?.skills || []);

            const transformedExperiences = (studentInfo?.experiences || [])
                .map(transformExperienceFromAPI)
                .filter(Boolean);
            setExperiences(transformedExperiences);

            const transformedEducations = (studentInfo?.educations || [])
                .map(transformEducationFromAPI)
                .filter(Boolean);
            setEducations(transformedEducations);

            const transformedProjects = (studentInfo?.projects || [])
                .map(transformProjectFromAPI)
                .filter(Boolean);
            setProjects(transformedProjects);

            const transformedCertificates = (studentInfo?.certifications || [])
                .map(transformCertificateFromAPI)
                .filter(Boolean);
            setCertificates(transformedCertificates);
        }
    }, [currentUser]);

    useEffect(() => {
        const studentInfo = Array.isArray(currentUser?.student_info)
            ? currentUser.student_info[0]
            : currentUser?.student_info;
        const studentId = studentInfo?.id || studentInfo?.student_id;

        if (studentId) {
            dispatch(getCvsByStudentId({ studentId }));
        }
    }, [currentUser, dispatch]);

    useEffect(() => {
        const validCvs = Array.isArray(cvsFromStore)
            ? cvsFromStore.filter(cv => cv != null)
            : [];
        setCvs(validCvs);
    }, [cvsFromStore]);

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
        cvs,
        setCvs,
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