import api from "../AxiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiBaseUrl = "/api/admin";

export const getAdminDashboard = createAsyncThunk(
    "admin/getAdminDashboard",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/dashboard`, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

const initialState = {
    dashboard: null,
    status: "idle",
    error: null,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // getAdminDashboard
            .addCase(getAdminDashboard.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getAdminDashboard.fulfilled, (state, action) => {
                state.status = "succeeded";
                const dashboardData = action.payload?.data || action.payload || null;
                state.dashboard = dashboardData;
            })
            .addCase(getAdminDashboard.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default adminSlice.reducer;