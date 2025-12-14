import { createEducation, updateEducation, deleteEducation } from '../../../../../modules/services/educationsService';
import { createProject, updateProject, deleteProject } from '../../../../../modules/services/projectsService';
import { createCertificate, updateCertificate, deleteCertificate } from '../../../../../modules/services/certificateService';
import { updateUser } from '../../../../../modules/services/userService';
import { getMe } from '../../../../../modules/services/authService';

export const useProfileHandlers = ({
    setUser,
    setCvFile,
    setAbout,
    setExperiences,
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
    selectedProject,
    selectedCertificate,
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
            if (!formData.school || !formData.degree || !formData.major || !formData.startYear || !formData.startMonth) {
                alert('Vui lòng điền đầy đủ thông tin bắt buộc');
                return;
            }

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

            const educationData = {
                school: formData.school || '',
                degree: formData.degree || '',
                major: formData.major || '',
                start_date: startDate,
                end_date: endDate, // null if currently studying
                description: formData.description || '',
            };

            if (selectedEducation?.id) {
                await dispatch(updateEducation({ id: selectedEducation.id, educationData })).unwrap();
            } else {
                await dispatch(createEducation(educationData)).unwrap();
            }

            // Refresh user data to get updated education list
            await dispatch(getMe()).unwrap();

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

                // Refresh user data to get updated education list
                await dispatch(getMe()).unwrap();
            } catch (error) {
                console.error('Error deleting education:', error);
                alert(error || 'Có lỗi xảy ra khi xóa thông tin học vấn');
            }
        }
    };

    const handleSkills = async (skillsArray = [], { closeAfterSave = true } = {}) => {
        setSkills(skillsArray);

        if (!currentUser?.user_id) {
            alert('Không tìm thấy người dùng. Vui lòng đăng nhập lại.');
            return;
        }
        try {
            await dispatch(updateUser({
                userId: currentUser.user_id,
                userData: {
                    student_info: {
                        ...(currentUser?.student_info || {}),
                        skills: skillsArray,
                    },
                },
            })).unwrap();

            await dispatch(getMe()).unwrap();
        } catch (error) {
            console.error('Error updating skills:', error);
            const message = typeof error === 'string' ? error : (error?.message || 'Có lỗi xảy ra khi cập nhật kỹ năng');
            alert(message);
            setSkills(currentUser?.student_info?.skills || []);
        } finally {
            if (closeAfterSave) {
                setSelectedSkillGroup(null);
                closeModal('skills');
            }
        }
    };

    const handleSaveSkillGroup = async (skillsArray = []) => {
        await handleSkills(skillsArray, { closeAfterSave: true });
    };

    const handleDeleteSkillGroup = async (skillToDelete) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa kỹ năng này?')) return;

        const nextSkills = (prevSkills => prevSkills.filter(skill => skill !== skillToDelete))(currentUser?.student_info?.skills || []);
        await handleSkills(nextSkills, { closeAfterSave: false });
    };

    // Projects Handlers
    const handleSaveProject = async (formData) => {
        try {
            if (!formData.projectName || !formData.startYear || !formData.startMonth) {
                alert('Vui lòng điền đầy đủ thông tin bắt buộc');
                return;
            }

            if (!currentUser?.student_info?.id) {
                alert('Không tìm thấy thông tin sinh viên. Vui lòng đăng nhập lại.');
                return;
            }

            const startMonth = String(formData.startMonth || '').padStart(2, '0');
            const startDate = `${formData.startYear}-${startMonth}-01`;
            let endDate = null;
            if (!formData.isCurrentlyWorking && formData.endYear && formData.endMonth) {
                const endMonth = String(formData.endMonth).padStart(2, '0');
                endDate = `${formData.endYear}-${endMonth}-01`;
            }

            const projectData = {
                name: formData.projectName || '',
                start_date: startDate,
                end_date: endDate, // null if currently working
                description: formData.description || '',
                website: formData.websiteLink || '',
            };

            if (selectedProject?.id) {
                await dispatch(updateProject({ id: selectedProject.id, projectData })).unwrap();
            } else {
                await dispatch(createProject(projectData)).unwrap();
            }

            // Refresh user data to get updated projects list
            await dispatch(getMe()).unwrap();

            setSelectedProject(null);
            closeModal('projects');
        } catch (error) {
            console.error('Error saving project:', error);
            const errorMessage = typeof error === 'string' ? error : (error?.message || 'Có lỗi xảy ra khi lưu thông tin dự án');
            alert(errorMessage);
        }
    };

    const handleDeleteProject = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
            try {
                await dispatch(deleteProject(id)).unwrap();

                // Refresh user data to get updated projects list
                await dispatch(getMe()).unwrap();
            } catch (error) {
                console.error('Error deleting project:', error);
                alert(error || 'Có lỗi xảy ra khi xóa dự án');
            }
        }
    };

    // Certificates Handlers
    const handleSaveCertificate = async (formData) => {
        try {
            if (!formData.certificateName || !formData.organization || !formData.issueYear || !formData.issueMonth) {
                alert('Vui lòng điền đầy đủ thông tin bắt buộc');
                return;
            }

            if (!currentUser?.student_info?.id) {
                alert('Không tìm thấy thông tin sinh viên. Vui lòng đăng nhập lại.');
                return;
            }

            const issueMonth = String(formData.issueMonth || '').padStart(2, '0');
            const issueDate = `${formData.issueYear}-${issueMonth}-01`;

            const certificateData = {
                name: formData.certificateName || '',
                organization: formData.organization || '',
                issue_date: issueDate,
                url: formData.certificateUrl || '',
                description: formData.description || '',
            };

            if (selectedCertificate?.id) {
                await dispatch(updateCertificate({ id: selectedCertificate.id, certificateData })).unwrap();
            } else {
                await dispatch(createCertificate(certificateData)).unwrap();
            }

            // Refresh user data to get updated certificates list
            await dispatch(getMe()).unwrap();

            setSelectedCertificate(null);
            closeModal('certificates');
        } catch (error) {
            console.error('Error saving certificate:', error);
            const errorMessage = typeof error === 'string' ? error : (error?.message || 'Có lỗi xảy ra khi lưu thông tin chứng chỉ');
            alert(errorMessage);
        }
    };

    const handleDeleteCertificate = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa chứng chỉ này?')) {
            try {
                await dispatch(deleteCertificate(id)).unwrap();

                // Refresh user data to get updated certificates list
                await dispatch(getMe()).unwrap();
            } catch (error) {
                console.error('Error deleting certificate:', error);
                alert(error || 'Có lỗi xảy ra khi xóa chứng chỉ');
            }
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
        handleSaveProject,
        handleDeleteProject,
        handleSaveCertificate,
        handleDeleteCertificate,
        handleDeleteAward,
    };
};