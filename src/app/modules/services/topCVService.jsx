import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../AxiosInstance";

const apiBaseUrl = "/api/topcv";

export const getTopCVJobs = createAsyncThunk(
    "topcv/getTopCVJobs",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/jobs`);
            console.log("TopCVJobs response:", response.data);
            return response.data;
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