import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../AxiosInstance";
import { Exposure } from "@mui/icons-material";

const apiBaseUrl = "/api/jobs";

export const getJobs = createAsyncThunk(
    "jobs/getJobs",
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/`, {
                params: { page: page, limit: limit },
                // withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    });

export const getJobById = createAsyncThunk(
    "jobs/getJobById",
    async (jobId, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/${jobId}`, {
                // withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    });

export const createJob = createAsyncThunk(
    "jobs/createJob",
    async (jobData, { rejectWithValue }) => {
        try {
            const response = await api.post(`${apiBaseUrl}/`, jobData, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    });

export const updateJob = createAsyncThunk(
    "jobs/updateJob",
    async ({ jobId, jobData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`${apiBaseUrl}/${jobId}`, jobData, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    });

export const deleteJob = createAsyncThunk(
    "jobs/deleteJob",
    async (jobId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`${apiBaseUrl}/${jobId}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    });

const initialState = {
    job: null,
    jobs: [],
    status: "idle",
    error: null,
}

const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getJobs.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getJobs.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.jobs = action.payload.data;
            })
            .addCase(getJobs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getJobById.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getJobById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.job = action.payload.data;
            })
            .addCase(getJobById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(createJob.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createJob.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.jobs.push(action.payload.data);
            })
            .addCase(createJob.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updateJob.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateJob.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.jobs.findIndex(job => job.job_id === action.payload.data.job_id);
                if (index !== -1) {
                    state.jobs[index] = action.payload.data;
                }
            })  
            .addCase(updateJob.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(deleteJob.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteJob.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.jobs = state.jobs.filter(job => job.job_id !== action.payload.response.jobId);
            })
            .addCase(deleteJob.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default jobsSlice.reducer;