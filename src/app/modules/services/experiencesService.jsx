import api from "../AxiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiBaseUrl = "/api/experiences";

/**
 * Get list of all experiences with pagination (public, no auth required)
 * @param {Object} params - { page: number, limit: number }
 */
export const getExperiences = createAsyncThunk(
    "experiences/getExperiences",
    async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/`, {
                params: { page, limit }
            });
            // Response structure: { success: true, data: [...], pagination: {...} }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

/**
 * Get list of current user's experiences with pagination (auth required, role Student)
 * GET /api/experiences/student/me
 * @param {Object} params - { page: number, limit: number }
 */
export const getExperiencesByStudentId = createAsyncThunk(
    "experiences/getExperiencesByStudentId",
    async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/student/me`, {
                params: { page, limit }
            });
            // Response structure: { success: true, data: [...], pagination: {...} }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

/**
 * Get a single experience by ID
 * @param {number} id - Experience ID
 */
export const getExperienceById = createAsyncThunk(
    "experiences/getExperienceById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/${id}`);
            // Response structure: { success: true, data: {...} }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Experience not found");
        }
    }
);

/**
 * Create a new experience
 * @param {Object} experienceData - Experience data (title, company, location, start_date, end_date, is_current, description)
 */
export const createExperience = createAsyncThunk(
    "experiences/createExperience",
    async (experienceData, { rejectWithValue }) => {
        try {
            const response = await api.post(`${apiBaseUrl}/`, experienceData);
            // Response structure: { success: true, data: {...} }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to create experience");
        }
    }
);

/**
 * Update an existing experience
 * @param {Object} params - { id: number, experienceData: Object }
 */
export const updateExperience = createAsyncThunk(
    "experiences/updateExperience",
    async ({ id, experienceData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`${apiBaseUrl}/${id}`, experienceData);
            // Response structure: { success: true, data: {...} }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update experience");
        }
    }
);

/**
 * Delete an experience
 * @param {number} id - Experience ID
 */
export const deleteExperience = createAsyncThunk(
    "experiences/deleteExperience",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`${apiBaseUrl}/${id}`);
            // Response (204): empty body on success
            return id; // Return the deleted ID for state update
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete experience");
        }
    }
);

const experiencesSlice = createSlice({
    name: "experiences",
    initialState: {
        experiences: [],
        currentExperience: null,
        pagination: {
            page: 1,
            limit: 10,
            total: 0
        },
        status: 'idle',
        error: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearCurrentExperience: (state) => {
            state.currentExperience = null;
        }
    },
    extraReducers: (builder) => {
        // Get all experiences list with pagination (public)
        builder
            .addCase(getExperiences.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getExperiences.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Extract data and pagination from response
                state.experiences = action.payload?.data || action.payload || [];
                if (action.payload?.pagination) {
                    state.pagination = action.payload.pagination;
                }
            })
            .addCase(getExperiences.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        // Get current student's experiences list with pagination (auth required)
        builder
            .addCase(getExperiencesByStudentId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getExperiencesByStudentId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Extract data and pagination from response
                state.experiences = action.payload?.data || action.payload || [];
                if (action.payload?.pagination) {
                    state.pagination = action.payload.pagination;
                }
            })
            .addCase(getExperiencesByStudentId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        // Get single experience by ID
        builder
            .addCase(getExperienceById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getExperienceById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentExperience = action.payload?.data || action.payload;
            })
            .addCase(getExperienceById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        // Create experience
        builder
            .addCase(createExperience.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createExperience.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Extract data from response
                const newExperience = action.payload?.data || action.payload;
                state.experiences.push(newExperience);
                state.pagination.total += 1;
            })
            .addCase(createExperience.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        // Update experience
        builder
            .addCase(updateExperience.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateExperience.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Extract data from response
                const updatedExperience = action.payload?.data || action.payload;
                const index = state.experiences.findIndex(exp => exp.id === updatedExperience.id);
                if (index !== -1) {
                    state.experiences[index] = updatedExperience;
                }
                // Update current experience if it's the same
                if (state.currentExperience?.id === updatedExperience.id) {
                    state.currentExperience = updatedExperience;
                }
            })
            .addCase(updateExperience.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        // Delete experience
        builder
            .addCase(deleteExperience.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteExperience.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // action.payload contains the deleted ID
                state.experiences = state.experiences.filter(exp => exp.id !== action.payload);
                state.pagination.total -= 1;
                // Clear current experience if it was deleted
                if (state.currentExperience?.id === action.payload) {
                    state.currentExperience = null;
                }
            })
            .addCase(deleteExperience.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { clearError, clearCurrentExperience } = experiencesSlice.actions;
export default experiencesSlice.reducer; 