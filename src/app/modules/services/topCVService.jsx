import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../AxiosInstance";

const apiBaseUrl = "/api/topcv";

export const getTopCVJobs = createAsyncThunk(
    "topcv/getTopCVJobs",
    async (params = {}, { rejectWithValue }) => {
        try {
            const { page = 1, limit = 10 } = params;
            const response = await api.get(`${apiBaseUrl}/jobs`, {
                params: { page, per_page: limit }  // Backend expects 'per_page' not 'limit'
            });

            // Transform backend response to match frontend expectations
            const backendData = response.data;
            return {
                data: backendData.data || [],
                pagination: backendData.pagination ? {
                    currentPage: backendData.pagination.currentPage || page,
                    totalPages: Math.ceil(
                        (backendData.pagination.total || 0) /
                        (backendData.pagination.perPage || limit)
                    ),
                    totalItems: backendData.pagination.total || 0,
                    limit: backendData.pagination.perPage || limit
                } : null
            };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const getTopCVJobById = createAsyncThunk(
    "topcv/getTopCVJobById",
    async (jobId, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/jobs/${jobId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const getTopCVRecommendJobs = createAsyncThunk(
    "topcv/getTopCVRecommendJobs",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/jobs/recommend`);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

const topCVSlice = createSlice({
    name: "topCVJobs",
    initialState: {
        jobs: [],
        pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            limit: 10
        },
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTopCVJobs.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getTopCVJobs.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.jobs = action.payload?.data || [];
                // Update pagination info (already transformed in thunk)
                if (action.payload?.pagination) {
                    state.pagination = action.payload.pagination;
                } else {
                    // Reset pagination if no data
                    state.pagination = {
                        currentPage: 1,
                        totalPages: 1,
                        totalItems: 0,
                        limit: 10
                    };
                }
            })
            .addCase(getTopCVJobs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getTopCVJobById.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getTopCVJobById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.job = action.payload?.data;
            })
            .addCase(getTopCVJobById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getTopCVRecommendJobs.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getTopCVRecommendJobs.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.recommendJobs = action.payload?.data;
            })
            .addCase(getTopCVRecommendJobs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    }
});

export default topCVSlice.reducer;