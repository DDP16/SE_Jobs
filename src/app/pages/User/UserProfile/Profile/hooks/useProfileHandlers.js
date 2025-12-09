export const useProfileHandlers = ({
    setUser,
    setCvFile,
    setAbout,
    setExperiences,
    setEducations,
    setSkills,
    setProjects,
    setCertificates,
    setAwards,
    closeModal,
    setSelectedExperience,
    setSelectedEducation,
    setSelectedSkillGroup,
    setSelectedProject,
    setSelectedCertificate,
    setSelectedAward,
    selectedExperience,
    selectedEducation,
    selectedSkillGroup,
}) => {
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

    const handleViewCV = (cvFile) => {
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

    const handleSaveAbout = (formData) => {
        setAbout(formData.about || formData.content || '');
        closeModal('about');
    };

    // Experience Handlers
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
    const handleSaveSkillGroup = (formData) => {
        const skillGroupData = {
            id: selectedSkillGroup?.id || Date.now(),
            groupName: formData.groupName || formData.name || 'Core Skills',
            name: formData.groupName || formData.name || 'Core Skills',
            skills: formData.skills || [],
        };

        if (selectedSkillGroup) {
            setSkills(prev => prev.map(group => group.id === selectedSkillGroup.id ? skillGroupData : group));
        } else {
            setSkills(prev => [...prev, skillGroupData]);
        }

        setSelectedSkillGroup(null);
        closeModal('skills');
    };

    const handleDeleteSkillGroup = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa nhóm kỹ năng này?')) {
            setSkills(prev => prev.filter(skill => skill.id !== id));
        }
    };

    // Projects Handlers
    const handleDeleteProject = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
            setProjects(prev => prev.filter(proj => proj.id !== id));
        }
    };

    // Certificates Handlers
    const handleDeleteCertificate = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa chứng chỉ này?')) {
            setCertificates(prev => prev.filter(cert => cert.id !== id));
        }
    };

    // Awards Handlers
    const handleDeleteAward = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa giải thưởng này?')) {
            setAwards(prev => prev.filter(award => award.id !== id));
        }
    };

    return {
        handleCVFileChange,
        handleDeleteCV,
        handleViewCV,
        handleSaveInformation,
        handleSaveAbout,
        handleSaveExperience,
        handleDeleteExperience,
        handleSaveEducation,
        handleDeleteEducation,
        handleSaveSkillGroup,
        handleDeleteSkillGroup,
        handleDeleteProject,
        handleDeleteCertificate,
        handleDeleteAward,
    };
};