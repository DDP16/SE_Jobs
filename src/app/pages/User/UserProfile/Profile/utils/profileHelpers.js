/**
 * Profile Helper Functions
 * Utility functions for profile data transformation and updates
 */

/**
 * Create optimistic update handler
 * @param {Function} setLocalState - State setter function
 * @param {Function} dispatch - Redux dispatch
 * @param {Function} updateAction - Update action creator
 * @param {Object} params - Update parameters
 * @returns {Promise}
 */
export const createOptimisticUpdate = async ({
    localStateSetter,
    updateData,
    dispatch,
    userId,
    onSuccess,
    onError,
    showSuccess,
    showError,
    fallbackData
}) => {
    try {
        // Optimistic update - update UI immediately
        localStateSetter(prev => ({ ...prev, ...updateData }));
        
        // Show success message
        if (onSuccess) onSuccess();
        if (showSuccess) showSuccess();

        // Send to API in background
        const { updateUser } = await import('../../../../../modules/services/userService');
        dispatch(updateUser({ userId, userData: updateData }))
            .catch((error) => {
                console.error('Background sync error:', error);
                // Rollback on error
                if (fallbackData) {
                    localStateSetter(fallbackData);
                }
                if (showError) showError();
            });
    } catch (error) {
        console.error('Optimistic update error:', error);
        if (fallbackData) {
            localStateSetter(fallbackData);
        }
        if (showError) showError();
    }
};

/**
 * Calculate profile completion percentage
 */
export const calculateCompletionPercentage = (sections) => {
    const completed = sections.filter(Boolean).length;
    return Math.round((completed / sections.length) * 100);
};

/**
 * Map profile data to user object
 */
export const mapUserData = (displayData, displayStudentInfo) => ({
    name: `${displayData?.first_name || ''} ${displayData?.last_name || ''}`.trim(),
    email: displayData?.email || '',
    phone: displayData?.phone || '',
    dateOfBirth: displayStudentInfo?.date_of_birth || '',
    gender: displayStudentInfo?.gender || '',
    currentAddress: displayStudentInfo?.address || '',
    personalLinks: displayStudentInfo?.personal_links || '',
});

/**
 * Extract profile sections from student info
 */
export const extractProfileSections = (displayStudentInfo) => ({
    cvFile: displayStudentInfo?.cv_url ? {
        name: 'CV.pdf',
        url: displayStudentInfo.cv_url
    } : null,
    introduction: displayStudentInfo?.about || '',
    experiences: displayStudentInfo?.experiences || [],
    educations: displayStudentInfo?.educations || [],
    skills: displayStudentInfo?.skills || [],
    languages: displayStudentInfo?.languages || [],
    projects: displayStudentInfo?.projects || [],
    certificates: displayStudentInfo?.certificates || [],
    awards: displayStudentInfo?.awards || [],
});

/**
 * Create update data for student info
 */
export const createStudentInfoUpdate = (displayStudentInfo, updates) => ({
    student_info: {
        ...displayStudentInfo,
        ...updates
    }
});
