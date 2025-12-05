/**
 * Profile Update Handlers
 * Centralized handlers for all profile updates with optimistic UI updates
 */

/**
 * Generic update handler for profile sections
 */
export const createSectionUpdateHandler = ({
    sectionName,
    dispatch,
    userId,
    displayStudentInfo,
    setLocalStudentInfo,
    showSuccess,
    showError,
    closeModal,
    setSelectedItem
}) => {
    return async (formData) => {
        try {
            const updatedData = Array.isArray(formData) ? formData : (formData[sectionName] || []);
            
            // Optimistic update
            setLocalStudentInfo(prev => ({
                ...prev,
                [sectionName]: updatedData
            }));

            if (closeModal) closeModal();
            if (setSelectedItem) setSelectedItem(null);
            showSuccess(`Cập nhật ${getSectionLabel(sectionName)} thành công!`);

            // Background API sync
            const { updateUser } = await import('../../../../../modules/services/userService');
            const updateData = {
                student_info: {
                    ...displayStudentInfo,
                    [sectionName]: updatedData
                }
            };

            dispatch(updateUser({ userId, userData: updateData }))
                .catch((error) => {
                    console.error(`Error updating ${sectionName}:`, error);
                    setLocalStudentInfo(displayStudentInfo);
                    showError('Cập nhật thất bại, vui lòng thử lại');
                });
        } catch (error) {
            console.error(`Error in ${sectionName} update:`, error);
            showError('Có lỗi xảy ra');
        }
    };
};

/**
 * Generic delete handler for profile items
 */
export const createDeleteHandler = ({
    sectionName,
    dispatch,
    userId,
    displayStudentInfo,
    currentData,
    setLocalStudentInfo,
    showSuccess,
    showError
}) => {
    return async (itemId) => {
        try {
            const updatedData = currentData.filter(item => item.id !== itemId);
            
            // Optimistic update
            setLocalStudentInfo(prev => ({
                ...prev,
                [sectionName]: updatedData
            }));

            showSuccess(`Xóa ${getSectionLabel(sectionName)} thành công!`);

            // Background API sync
            const { updateUser } = await import('../../../../../modules/services/userService');
            const updateData = {
                student_info: {
                    ...displayStudentInfo,
                    [sectionName]: updatedData
                }
            };

            dispatch(updateUser({ userId, userData: updateData }))
                .catch((error) => {
                    console.error(`Error deleting ${sectionName}:`, error);
                    setLocalStudentInfo(displayStudentInfo);
                    showError(`Có lỗi xảy ra khi xóa ${getSectionLabel(sectionName)}`);
                });
        } catch (error) {
            console.error(`Error in ${sectionName} deletion:`, error);
            showError('Có lỗi xảy ra');
        }
    };
};

/**
 * Get Vietnamese label for section name
 */
const getSectionLabel = (sectionName) => {
    const labels = {
        experiences: 'kinh nghiệm',
        educations: 'học vấn',
        skills: 'kỹ năng',
        languages: 'ngôn ngữ',
        projects: 'dự án',
        certificates: 'chứng chỉ',
        awards: 'giải thưởng'
    };
    return labels[sectionName] || sectionName;
};

/**
 * Skills-specific handlers (simplified for string array)
 */
export const createSkillsHandlers = (context) => ({
    handleSave: async (skillsArray) => {
        try {
            const updatedSkills = Array.isArray(skillsArray) ? skillsArray : [];

            // Optimistic update
            context.setLocalStudentInfo(prev => ({
                ...prev,
                skills: updatedSkills
            }));

            context.setSelectedSkillGroup(null);
            context.closeModal('skills');
            context.showSuccess('Lưu kỹ năng thành công!');

            // Background sync
            const { updateUser } = await import('../../../../../modules/services/userService');
            const updateData = {
                student_info: {
                    ...context.displayStudentInfo,
                    skills: updatedSkills
                }
            };

            context.dispatch(updateUser({ userId: context.userId, userData: updateData }))
                .catch((error) => {
                    console.error('Error saving skills:', error);
                    context.setLocalStudentInfo(context.displayStudentInfo);
                    context.showError('Cập nhật thất bại, vui lòng thử lại');
                });
        } catch (error) {
            console.error('Error in handleSaveSkillGroup:', error);
            context.showError('Có lỗi xảy ra');
        }
    },

    handleDelete: async (updatedSkills) => {
        try {
            const skillsToSave = Array.isArray(updatedSkills) ? updatedSkills : [];

            // Optimistic update
            context.setLocalStudentInfo(prev => ({
                ...prev,
                skills: skillsToSave
            }));

            // Background sync
            const { updateUser } = await import('../../../../../modules/services/userService');
            const updateData = {
                student_info: {
                    ...context.displayStudentInfo,
                    skills: skillsToSave
                }
            };

            context.dispatch(updateUser({ userId: context.userId, userData: updateData }))
                .catch((error) => {
                    console.error('Error deleting skill:', error);
                    context.setLocalStudentInfo(context.displayStudentInfo);
                    context.showError('Có lỗi xảy ra khi xóa kỹ năng');
                });
        } catch (error) {
            console.error('Error in handleDeleteSkillGroup:', error);
            context.showError('Có lỗi xảy ra');
        }
    }
});
