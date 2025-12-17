import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

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
        if (currentUser?.student_info) {
            const studentInfo = currentUser.student_info;

            // Sync user basic info
            setUser(prev => ({
                ...prev,
                name: `${currentUser.first_name || ''} ${currentUser.last_name || ''}`.trim() || 'User',
                email: currentUser.email || '',
                location: studentInfo.location || '',
                phone: studentInfo.phone || '012345678',
                dateOfBirth: studentInfo.date_of_birth || '',
                openForOpportunities: studentInfo.open_for_opportunities === true,
            }));

            // Sync about
            setAbout(studentInfo.about || '');

            // Sync skills
            setSkills(studentInfo.skills || []);

            // Sync experiences (API returns 'experience' array)
            // Transform API format to component format
            const transformedExperiences = (studentInfo.experience || []).map(exp => {
                // Parse start_date to startMonth and startYear
                let startMonth = '';
                let startYear = '';
                if (exp.start_date) {
                    const startDate = new Date(exp.start_date);
                    startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
                    startYear = String(startDate.getFullYear());
                }

                // Parse end_date to endMonth and endYear
                let endMonth = '';
                let endYear = '';
                if (exp.end_date) {
                    const endDate = new Date(exp.end_date);
                    endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
                    endYear = String(endDate.getFullYear());
                }

                return {
                    ...exp,
                    id: exp.id,
                    role: exp.position || exp.role, // API returns 'position', component expects 'role'
                    company: exp.company,
                    location: exp.location,
                    description: exp.description || '', // Ensure description is preserved
                    isCurrentlyWorking: exp.is_current || exp.isCurrentlyWorking || false,
                    startMonth,
                    startYear,
                    endMonth,
                    endYear,
                };
            });
            setExperiences(transformedExperiences);

            // Sync educations (API returns 'education' array)
            // Transform API format to component format
            const transformedEducations = (studentInfo.education || []).map(edu => {
                // Parse start_date to startMonth and startYear
                let startMonth = '';
                let startYear = '';
                if (edu.start_date) {
                    const startDate = new Date(edu.start_date);
                    startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
                    startYear = String(startDate.getFullYear());
                }

                // Parse end_date to endMonth and endYear
                let endMonth = '';
                let endYear = '';
                let isCurrentlyStudying = false;
                if (edu.end_date) {
                    const endDate = new Date(edu.end_date);
                    endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
                    endYear = String(endDate.getFullYear());
                } else {
                    isCurrentlyStudying = true;
                }

                return {
                    ...edu,
                    startMonth,
                    startYear,
                    endMonth,
                    endYear,
                    isCurrentlyStudying,
                };
            });
            setEducations(transformedEducations);

            // Sync projects (API returns 'project' array)
            // Transform API format to component format
            const transformedProjects = (studentInfo.project || []).map(proj => {
                // Parse start_date to startMonth and startYear
                let startMonth = '';
                let startYear = '';
                if (proj.start_date) {
                    const startDate = new Date(proj.start_date);
                    startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
                    startYear = String(startDate.getFullYear());
                }

                // Parse end_date to endMonth and endYear
                let endMonth = '';
                let endYear = '';
                let isCurrentlyWorking = false;
                if (proj.end_date) {
                    const endDate = new Date(proj.end_date);
                    endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
                    endYear = String(endDate.getFullYear());
                } else {
                    isCurrentlyWorking = proj.is_working_on || false;
                }

                return {
                    ...proj,
                    startMonth,
                    startYear,
                    endMonth,
                    endYear,
                    isCurrentlyWorking: proj.is_working_on || isCurrentlyWorking,
                    websiteLink: proj.website_link || proj.websiteLink,
                };
            });
            setProjects(transformedProjects);

            // Sync certificates (API returns 'certification' array)
            // Transform API format to component format
            const transformedCertificates = (studentInfo.certification || []).map(cert => {
                // Parse issue_date to issueMonth and issueYear
                let issueMonth = '';
                let issueYear = '';
                if (cert.issue_date) {
                    const issueDate = new Date(cert.issue_date);
                    issueMonth = String(issueDate.getMonth() + 1).padStart(2, '0');
                    issueYear = String(issueDate.getFullYear());
                }

                return {
                    ...cert,
                    issueMonth,
                    issueYear,
                    certificateUrl: cert.certification_url || cert.certificateUrl || cert.url,
                };
            });
            setCertificates(transformedCertificates);
        }
    }, [currentUser]);

    // Calculate completion percentage
    useEffect(() => {
        const sections = [
            user.name, user.email, about, user.location,
            experiences.length > 0, educations.length > 0,
            projects.length > 0, certificates.length > 0,
            skills.length > 0
        ];
        const completed = sections.filter(Boolean).length;
        setCompletionPercentage(Math.round((completed / sections.length) * 100));
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