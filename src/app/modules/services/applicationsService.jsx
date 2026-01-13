import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../AxiosInstance";

const apiBaseUrl = "/api/applications";
const companyApiBaseUrl = apiBaseUrl + "/company";

// Service applications for the company
export const getCompanyApplications = createAsyncThunk(
    "applications/getCompanyApplications",
    async (params = {}, { rejectWithValue }) => {
        try {
            const queryParams = Object.fromEntries(
                Object.entries(params).filter(
                    ([, value]) => value !== undefined && value !== null && value !== ""
                )
            );
            const response = await api.get(`${companyApiBaseUrl}/list`, {
                params: queryParams,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const getCompanyApplicationsByJobId = createAsyncThunk(
    "applications/getCompanyApplicationsByJobId",
    async ({ jobId, params = {} }, { rejectWithValue }) => {
        try {
            let queryParams = Object.fromEntries(
                Object.entries(params).filter(
                    ([, value]) => value !== undefined && value !== null && value !== ""
                )
            );
            queryParams.job_id = jobId;
            const response = await api.get(`${companyApiBaseUrl}/list`, {
                params: queryParams,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const getCompanyApplicationDetail = createAsyncThunk(
    "applications/getCompanyApplicationDetail",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`${companyApiBaseUrl}/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const updateCompanyApplication = createAsyncThunk(
    "applications/updateCompanyApplication",
    async ({ id, data = {} }, { rejectWithValue }) => {
        try {
            const ApplicationData = Object.fromEntries(
                Object.entries(data).filter(
                    ([, value]) => value !== undefined && value !== null
                )
            )
            const response = await api.put(`${companyApiBaseUrl}/${id}`, ApplicationData, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

// Service applications for Students/Users
export const getApplications = createAsyncThunk(
    "applications/getApplications",
    async (params = {}, { rejectWithValue }) => {
        try {
            const queryParams = Object.fromEntries(
                Object.entries(params).filter(
                    ([, value]) => value !== undefined && value !== null && value !== ""
                )
            );
            const response = await api.get(`${apiBaseUrl}/`, {
                params: queryParams
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const getApplicationDetail = createAsyncThunk(
    "applications/getApplicationDetail",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const createApplication = createAsyncThunk(
    "applications/createApplication",
    async (applicationData, { rejectWithValue }) => {
        try {
            const response = await api.post(`${apiBaseUrl}/`, applicationData, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const updateApplication = createAsyncThunk(
    "applications/updateApplication",
    async ({ id, applicationData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`${apiBaseUrl}/${id}`, applicationData, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

const initialState = {
    application: null,
    applications: [],
    applicationsByJobId: [],
    pagination: null,
    paginationByJobId: null,
    status: "idle",
    error: null,
};

const applicationsSlice = createSlice({
    name: "applications",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCompanyApplications.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getCompanyApplications.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.applications = action.payload.data || [];
                state.pagination = action.payload.pagination || null;
            })
            .addCase(getCompanyApplications.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to fetch applications";
            })
            .addCase(getCompanyApplicationsByJobId.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getCompanyApplicationsByJobId.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.applicationsByJobId = action.payload.data || [];
                state.paginationByJobId = action.payload.pagination || null;
            })
            .addCase(getCompanyApplicationsByJobId.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to fetch applications";
            })
            .addCase(getCompanyApplicationDetail.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getCompanyApplicationDetail.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.application = action.payload.data || null;
            })
            .addCase(getCompanyApplicationDetail.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to fetch application detail";
            })
            .addCase(updateCompanyApplication.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateCompanyApplication.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.applications.findIndex(app => app.id === action.payload.data.id);
                if (index !== -1) {
                    state.applications[index] = action.payload.data;
                }
                state.application = action.payload.data;
            })
            .addCase(updateCompanyApplication.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to update application";
            })
            .addCase(getApplications.pending, (state) => {
                state.status = "loading";
                state.error = null;
                state.pagination = null;
            })
            .addCase(getApplications.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.applications = action.payload.data || [];
                state.pagination = action.payload.pagination || null;
            })
            .addCase(getApplications.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to fetch applications";
                state.pagination = null;
            })
            .addCase(getApplicationDetail.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getApplicationDetail.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.application = action.payload.data || null;
            })
            .addCase(getApplicationDetail.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to fetch application detail";
            })
            .addCase(createApplication.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createApplication.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.applications.push(action.payload.data);
            })
            .addCase(createApplication.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to create application";
            })
            .addCase(updateApplication.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateApplication.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.applications.findIndex(app => app.id === action.payload.data.id);
                if (index !== -1) {
                    state.applications[index] = action.payload.data;
                }
            })
            .addCase(updateApplication.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to update application";
            });
    },
});

export default applicationsSlice.reducer;