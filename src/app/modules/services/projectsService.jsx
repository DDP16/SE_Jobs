import api from "../AxiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiBaseUrl = "/api/projects";

// Redux slice and thunks for projects

export const getProjectsByStudentId = createAsyncThunk(
    "projects/getProjectsByStudentId",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const getProject = createAsyncThunk(
    "projects/getProject",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const createProject = createAsyncThunk(
    "projects/createProject",
    async (projectData, { rejectWithValue }) => {
        try {
            const response = await api.post(`${apiBaseUrl}/`, projectData, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const updateProject = createAsyncThunk(
    "projects/updateProject",
    async ({ id, projectData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`${apiBaseUrl}/${id}`, projectData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const deleteProject = createAsyncThunk(
    "projects/deleteProject",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`${apiBaseUrl}/${id}`);
            return id; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

const initialState = {
    projects: [],
    project: null,
    status: "idle",
    error: null,
};

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get all by student ID
            .addCase(getProjectsByStudentId.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getProjectsByStudentId.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.projects = action.payload.data || [];
            })
            .addCase(getProjectsByStudentId.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Get single
            .addCase(getProject.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getProject.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.project = action.payload.data || null;
            })
            .addCase(getProject.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Create
            .addCase(createProject.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.status = "succeeded";
                // Optionally push to projects
                if (action.payload.data) {
                    state.projects.push(action.payload.data);
                }
            })
            .addCase(createProject.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Update
            .addCase(updateProject.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updated = action.payload.data;
                if (updated) {
                    const idx = state.projects.findIndex((p) => p.id === updated.id);
                    if (idx !== -1) {
                        state.projects[idx] = updated;
                    }
                    if (state.project && state.project.id === updated.id) {
                        state.project = updated;
                    }
                }
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Delete
            .addCase(deleteProject.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.status = "succeeded";
                const id = action.meta.arg;
                state.projects = state.projects.filter((p) => p.id !== id);
                if (state.project && state.project.id === id) {
                    state.project = null;
                }
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default projectsSlice.reducer;
