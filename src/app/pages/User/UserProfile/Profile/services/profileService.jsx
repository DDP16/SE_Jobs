import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../../modules/AxiosInstance";
import { getUserById, updateUser } from "../../../../modules/services/userService";

// ==================== Initial State ====================
const initialState = {
    profile: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    sections: {
        introduction: null,
        experiences: [],
        educations: [],
        skills: [],
        languages: [],
        projects: [],
        certificates: [],
        awards: [],
    }
};

// ==================== Redux Slice ====================
const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        // Optimistic update for profile
        optimisticUpdateProfile: (state, action) => {
            if (state.profile) {
                state.profile = {
                    ...state.profile,
                    ...action.payload
                };
            }
        },

        // Update specific section locally (before API call)
        updateSectionLocal: (state, action) => {
            const { section, data } = action.payload;
            if (state.sections[section] !== undefined) {
                if (Array.isArray(state.sections[section])) {
                    state.sections[section] = data;
                } else {
                    state.sections[section] = data;
                }
            }
        },

        // Add item to section
        addSectionItem: (state, action) => {
            const { section, item } = action.payload;
            if (Array.isArray(state.sections[section])) {
                state.sections[section].push(item);
            }
        },

        // Update item in section
        updateSectionItem: (state, action) => {
            const { section, itemId, item } = action.payload;
            if (Array.isArray(state.sections[section])) {
                const index = state.sections[section].findIndex(
                    i => i.id === itemId || i._id === itemId
                );
                if (index !== -1) {
                    state.sections[section][index] = { ...state.sections[section][index], ...item };
                }
            }
        },

        // Remove item from section
        removeSectionItem: (state, action) => {
            const { section, itemId } = action.payload;
            if (Array.isArray(state.sections[section])) {
                state.sections[section] = state.sections[section].filter(
                    i => i.id !== itemId && i._id !== itemId
                );
            }
        },

        // Clear profile data
        clearProfileData: (state) => {
            state.profile = null;
            state.sections = initialState.sections;
            state.status = 'idle';
            state.error = null;
        },

        // Rollback optimistic update
        rollbackProfileUpdate: (state, action) => {
            state.profile = action.payload.previousProfile;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get Profile
            .addCase(getProfile.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.status = "succeeded";
                const profileData = action.payload?.data || action.payload;
                state.profile = profileData;

                // Extract sections from profile data if available
                if (profileData) {
                    if (profileData.student_info) {
                        state.sections = {
                            introduction: profileData.student_info.introduction || null,
                            experiences: profileData.student_info.experiences || [],
                            educations: profileData.student_info.educations || [],
                            skills: profileData.student_info.skills || [],
                            languages: profileData.student_info.languages || [],
                            projects: profileData.student_info.projects || [],
                            certificates: profileData.student_info.certificates || [],
                            awards: profileData.student_info.awards || [],
                        };
                    }
                }
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Update Profile
            .addCase(updateProfile.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updatedProfile = action.payload?.data || action.payload;
                if (updatedProfile) {
                    state.profile = {
                        ...state.profile,
                        ...updatedProfile
                    };
                }
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Update Profile Section
            .addCase(updateProfileSection.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateProfileSection.fulfilled, (state, action) => {
                state.status = "succeeded";
                const { section, data } = action.payload;
                if (state.sections[section] !== undefined) {
                    state.sections[section] = data;
                }
            })
            .addCase(updateProfileSection.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Upload CV
            .addCase(uploadCV.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(uploadCV.fulfilled, (state, action) => {
                state.status = "succeeded";
                if (state.profile) {
                    state.profile.cv_url = action.payload?.data?.cv_url || action.payload?.cv_url;
                }
            })
            .addCase(uploadCV.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Delete CV
            .addCase(deleteCV.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteCV.fulfilled, (state) => {
                state.status = "succeeded";
                if (state.profile) {
                    state.profile.cv_url = null;
                }
            })
            .addCase(deleteCV.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

// ==================== Actions ====================
export const {
    optimisticUpdateProfile,
    updateSectionLocal,
    addSectionItem,
    updateSectionItem,
    removeSectionItem,
    clearProfileData,
    rollbackProfileUpdate
} = profileSlice.actions;

// ==================== Data Controller Object ====================
/**
 * Profile Data Controller
 * Provides a clean interface to manage profile data operations
 */
export const profileController = {
    // Get profile data
    getProfile: (dispatch, userId) => {
        return dispatch(getProfile(userId));
    },

    // Update basic profile information
    updateProfile: (dispatch, userId, profileData) => {
        return dispatch(updateProfile({ userId, profileData }));
    },

    // Update a specific section
    updateSection: (dispatch, userId, section, data) => {
        return dispatch(updateProfileSection({ userId, section, data }));
    },

    // Add item to a section (optimistic update)
    addItem: (dispatch, section, item) => {
        dispatch(addSectionItem({ section, item }));
    },

    // Update item in a section (optimistic update)
    updateItem: (dispatch, section, itemId, item) => {
        dispatch(updateSectionItem({ section, itemId, item }));
    },

    // Remove item from a section (optimistic update)
    removeItem: (dispatch, section, itemId) => {
        dispatch(removeSectionItem({ section, itemId }));
    },

    // Upload CV
    uploadCV: (dispatch, userId, file) => {
        return dispatch(uploadCV({ userId, file }));
    },

    // Delete CV
    deleteCV: (dispatch, userId) => {
        return dispatch(deleteCV(userId));
    },

    // Clear all profile data
    clear: (dispatch) => {
        dispatch(clearProfileData());
    },

    // Optimistic update
    optimisticUpdate: (dispatch, profileData) => {
        dispatch(optimisticUpdateProfile(profileData));
    },

    // Rollback update
    rollback: (dispatch, previousProfile) => {
        dispatch(rollbackProfileUpdate({ previousProfile }));
    }
};

export default profileSlice.reducer;
