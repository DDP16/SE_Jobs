import { createEducation, updateEducation, deleteEducation, getEducationByStudentId } from '../../../../../modules/services/educationsService';

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
    dispatch,
    currentUser,
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
    const handleSaveEducation = async (formData) => {
        try {
            // Validate required fields
            if (!formData.school || !formData.degree || !formData.major || !formData.startYear || !formData.startMonth) {
                alert('Vui lòng điền đầy đủ thông tin bắt buộc');
                return;
            }

            // Validate student_id exists before proceeding
            if (!currentUser?.student_info?.id) {
                alert('Không tìm thấy thông tin sinh viên. Vui lòng đăng nhập lại.');
                return;
            }

            const startMonth = String(formData.startMonth || '').padStart(2, '0');
            const startDate = `${formData.startYear}-${startMonth}-01`;
            let endDate = null;
            if (!formData.isCurrentlyStudying && formData.endYear && formData.endMonth) {
                const endMonth = String(formData.endMonth).padStart(2, '0');
                endDate = `${formData.endYear}-${endMonth}-01`;
            }

            // Prepare data for API 
            // Note: Backend gets student_id from authenticated session, not from request body
            const educationData = {
                school: formData.school || '',
                degree: formData.degree || '',
                major: formData.major || '',
                start_date: startDate,
                end_date: endDate, // null if currently studying
                description: formData.description || '',
            };

            // Debug log
            console.log('Sending education data:', educationData);

            let result;
            if (selectedEducation && selectedEducation.id) {
                // Update existing education
                result = await dispatch(updateEducation({
                    id: selectedEducation.id,
                    educationData
                })).unwrap();
            } else {
                // Create new education 
                result = await dispatch(createEducation(educationData)).unwrap();
            }

            // Refresh education list from backend
            if (currentUser?.student_info?.id) {
                await dispatch(getEducationByStudentId()).unwrap();
            }

            setSelectedEducation(null);
            closeModal('education');
        } catch (error) {
            console.error('Error saving education:', error);
            const errorMessage = typeof error === 'string' ? error : (error?.message || 'Có lỗi xảy ra khi lưu thông tin học vấn');
            alert(errorMessage);
        }
    };

    const handleDeleteEducation = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa thông tin học vấn này?')) {
            try {
                await dispatch(deleteEducation(id)).unwrap();

                // Refresh education list from backend
                if (currentUser?.student_info?.id) {
                    await dispatch(getEducationByStudentId()).unwrap();
                }
            } catch (error) {
                console.error('Error deleting education:', error);
                alert(error || 'Có lỗi xảy ra khi xóa thông tin học vấn');
            }
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