import { createExperience, updateExperience, deleteExperience } from '../../../../../modules/services/experiencesService';
import { createEducation, updateEducation, deleteEducation } from '../../../../../modules/services/educationsService';
import { createProject, updateProject, deleteProject } from '../../../../../modules/services/projectsService';
import { createCertificate, updateCertificate, deleteCertificate } from '../../../../../modules/services/certificateService';
import { updateUser } from '../../../../../modules/services/userService';
import { getMe } from '../../../../../modules/services/authService';
import {
    transformEducationToAPI,
    transformProjectToAPI,
    transformCertificateToAPI,
    validateEducationForm,
    validateProjectForm,
    validateCertificateForm,
} from './utils';

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
    setOpenForOpportunities,
}) => {
    // Helpers
    const getStudentInfo = () => {
        return Array.isArray(currentUser?.student_info)
            ? currentUser.student_info[0]
            : currentUser?.student_info || null;
    };

    // CV Handlers
    const handleCVFileChange = (file) => {
        setCvFile({
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(2),
            uploadDate: new Date().toLocaleDateString('vi-VN'),
            file: file,
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
    const handleSaveInformation = async (formData) => {
        try {
            if (!currentUser?.user_id) {
                alert('Không tìm thấy người dùng. Vui lòng đăng nhập lại.');
                return;
            }

            const studentInfo = getStudentInfo() || {};
            const userData = {
                userId: currentUser.user_id,
                userData: {
                    first_name: formData.fullName?.split(' ')[0] || '',
                    last_name: formData.fullName?.split(' ').slice(1).join(' ') || '',
                    student_info: {
                        ...studentInfo,
                        phone: formData.phone,
                        date_of_birth: formData.dateOfBirth,
                        location: formData.address,
                    },
                },
            };

            await dispatch(updateUser(userData)).unwrap();
            await dispatch(getMe()).unwrap();
            closeModal('information');
        } catch (error) {
            console.error('Error saving information:', error);
            alert(error?.message || 'Có lỗi xảy ra khi lưu thông tin');
        }
    };

    const handleSaveAbout = async (formData) => {
        try {
            if (!currentUser?.user_id) {
                alert('Không tìm thấy người dùng. Vui lòng đăng nhập lại.');
                return;
            }

            const studentInfo = getStudentInfo() || {};
            const aboutText = formData.about || formData.content || '';
            const userData = {
                userId: currentUser.user_id,
                userData: {
                    student_info: {
                        ...studentInfo,
                        about: aboutText,
                    },
                },
            };

            await dispatch(updateUser(userData)).unwrap();
            await dispatch(getMe()).unwrap();
            closeModal('about');
        } catch (error) {
            console.error('Error saving about:', error);
            alert(error?.message || 'Có lỗi xảy ra khi lưu giới thiệu');
        }
    };

    // Experience Handlers
    const handleSaveExperience = async (formData) => {
        try {
            const startMonth = String(formData.startMonth || '').padStart(2, '0');
            const startDate = `${formData.startYear}-${startMonth}-01`;
            let endDate = null;
            if (!formData.isCurrentlyWorking && formData.endYear && formData.endMonth) {
                const endMonth = String(formData.endMonth).padStart(2, '0');
                endDate = `${formData.endYear}-${endMonth}-01`;
            }

            const experienceData = {
                title: formData.jobTitle || formData.role,
                company: formData.company,
                location: formData.location || '',
                start_date: startDate,
                end_date: endDate,
                is_current: formData.isCurrentlyWorking || false,
                description: formData.description || '',
            };

            if (selectedExperience?.id) {
                await dispatch(updateExperience({ id: selectedExperience.id, experienceData })).unwrap();
            } else {
                await dispatch(createExperience(experienceData)).unwrap();
            }

            await dispatch(getMe()).unwrap();
            setSelectedExperience(null);
            closeModal('experience');
        } catch (error) {
            console.error('Error saving experience:', error);
            alert(error?.message || 'Có lỗi xảy ra khi lưu kinh nghiệm làm việc');
        }
    };

    const handleDeleteExperience = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa thông tin công việc này?')) return;
        try {
            await dispatch(deleteExperience(id)).unwrap();
            await dispatch(getMe()).unwrap();
        } catch (error) {
            console.error('Error deleting experience:', error);
            alert(error?.message || 'Có lỗi xảy ra khi xóa kinh nghiệm');
        }
    };

    // Education Handlers
    const handleSaveEducation = async (formData) => {
        try {
            const validation = validateEducationForm(formData);
            if (!validation.valid) {
                alert(validation.message);
                return;
            }

            const transformedData = transformEducationToAPI(formData);

            if (selectedEducation?.id) {
                await dispatch(updateEducation({ id: selectedEducation.id, educationData: transformedData })).unwrap();
            } else {
                await dispatch(createEducation(transformedData)).unwrap();
            }

            await dispatch(getMe()).unwrap();
            setSelectedEducation(null);
            closeModal('education');
        } catch (error) {
            console.error('Error saving education:', error);
            alert(error?.message || 'Có lỗi xảy ra khi lưu thông tin học vấn');
        }
    };

    const handleDeleteEducation = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa thông tin học vấn này?')) return;
        try {
            await dispatch(deleteEducation(id)).unwrap();
            await dispatch(getMe()).unwrap();
        } catch (error) {
            console.error('Error deleting education:', error);
            alert(error?.message || 'Có lỗi xảy ra khi xóa thông tin học vấn');
        }
    };

    // Skills
    const handleSkills = async (skillsArray = [], { closeAfterSave = true } = {}) => {
        setSkills(skillsArray);

        if (!currentUser?.user_id) {
            alert('Không tìm thấy người dùng. Vui lòng đăng nhập lại.');
            return;
        }

        try {
            const studentInfo = getStudentInfo() || {};
            const userData = {
                userId: currentUser.user_id,
                userData: {
                    student_info: {
                        ...(studentInfo || {}),
                        skills: skillsArray,
                    },
                },
            };

            await dispatch(updateUser(userData)).unwrap();
            await dispatch(getMe()).unwrap();
        } catch (error) {
            console.error('Error updating skills:', error);
            alert(error?.message || 'Có lỗi xảy ra khi cập nhật kỹ năng');
            setSkills(getStudentInfo()?.skills || []);
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
        const nextSkills = (getStudentInfo()?.skills || []).filter((s) => s !== skillToDelete);
        await handleSkills(nextSkills, { closeAfterSave: false });
    };

    // Projects
    const handleSaveProject = async (formData) => {
        try {
            // Basic validation - formData đã được validate trong modal rồi
            if (!formData?.projectName || !formData?.startYear || !formData?.startMonth) {
                alert('Vui lòng điền đầy đủ thông tin bắt buộc');
                return;
            }

            // Ensure websiteLink is included - check all possible field names
            const websiteLinkValue = formData?.websiteLink || formData?.website || formData?.website_link || '';

            const dataToTransform = {
                projectName: formData.projectName || '',
                isCurrentlyWorking: formData.isCurrentlyWorking || false,
                startMonth: formData.startMonth || '',
                startYear: formData.startYear || '',
                endMonth: formData.endMonth || '',
                endYear: formData.endYear || '',
                description: formData.description || '',
                websiteLink: websiteLinkValue,
            };

            const transformedData = transformProjectToAPI(dataToTransform);

            if (selectedProject?.id) {
                await dispatch(updateProject({ id: selectedProject.id, projectData: transformedData })).unwrap();
            } else {
                await dispatch(createProject(transformedData)).unwrap();
            }

            await dispatch(getMe()).unwrap();
            setSelectedProject(null);
            closeModal('projects');
        } catch (error) {
            console.error('Error saving project:', error);
            alert(error?.message || 'Có lỗi xảy ra khi lưu thông tin dự án');
        }
    };

    const handleDeleteProject = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa dự án này?')) return;
        try {
            await dispatch(deleteProject(id)).unwrap();
            await dispatch(getMe()).unwrap();
        } catch (error) {
            console.error('Error deleting project:', error);
            alert(error?.message || 'Có lỗi xảy ra khi xóa dự án');
        }
    };

    // Certificates
    const handleSaveCertificate = async (formData) => {
        try {
            const validation = validateCertificateForm(formData);
            if (!validation.valid) {
                alert(validation.message);
                return;
            }

            const transformedData = transformCertificateToAPI(formData);

            if (selectedCertificate?.id) {
                await dispatch(updateCertificate({ id: selectedCertificate.id, certificateData: transformedData })).unwrap();
            } else {
                await dispatch(createCertificate(transformedData)).unwrap();
            }

            await dispatch(getMe()).unwrap();
            setSelectedCertificate(null);
            closeModal('certificates');
        } catch (error) {
            console.error('Error saving certificate:', error);
            alert(error?.message || 'Có lỗi xảy ra khi lưu chứng chỉ');
        }
    };

    const handleDeleteCertificate = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa chứng chỉ này?')) return;
        try {
            await dispatch(deleteCertificate(id)).unwrap();
            await dispatch(getMe()).unwrap();
        } catch (error) {
            console.error('Error deleting certificate:', error);
            alert(error?.message || 'Có lỗi xảy ra khi xóa chứng chỉ');
        }
    };

    // Awards
    const handleDeleteAward = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa giải thưởng này?')) {
            setAwards((prev) => prev.filter((award) => award.id !== id));
        }
    };

    // Open for Opportunities
    const handleToggleOpenForOpportunities = async (newValue) => {
        setOpenForOpportunities(newValue);
        if (!currentUser?.user_id) {
            alert('Không tìm thấy người dùng. Vui lòng đăng nhập lại.');
            return;
        }

        try {
            const currentStudentInfo = getStudentInfo() || {};
            await dispatch(
                updateUser({
                    userId: currentUser.user_id,
                    userData: {
                        student_info: {
                            ...currentStudentInfo,
                            open_for_opportunities: newValue,
                        },
                    },
                })
            ).unwrap();

            await dispatch(getMe()).unwrap();
        } catch (error) {
            console.error('Error updating open for opportunities:', error);
            alert(error?.message || 'Có lỗi xảy ra khi cập nhật trạng thái');
            setOpenForOpportunities(getStudentInfo()?.open_for_opportunities === true);
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
        handleToggleOpenForOpportunities,
    };
};