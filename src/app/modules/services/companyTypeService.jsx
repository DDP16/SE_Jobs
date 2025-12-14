import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../AxiosInstance";

const apiBaseUrl = "/api/company_types";

export const getCompanyTypes = createAsyncThunk(
    "companyTypes/getCompanyTypes",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const getCompanyType = createAsyncThunk(
    "companyTypes/getCompanyType",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const createCompanyType = createAsyncThunk(
    "companyTypes/createCompanyType",
    async (companyTypeData, { rejectWithValue }) => {
        try {
            const response = await api.post(`${apiBaseUrl}/`, companyTypeData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const updateCompanyType = createAsyncThunk(
    "companyTypes/updateCompanyType",
    async ({ id, companyTypeData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`${apiBaseUrl}/${id}`, companyTypeData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const deleteCompanyType = createAsyncThunk(
    "companyTypes/deleteCompanyType",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.delete(`${apiBaseUrl}/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

const initialState = {
    companyTypes: [],
    companyType: null,
    status: "idle",
    error: null,
};

const companyTypesSlice = createSlice({
    name: "companyTypes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get all company types
            .addCase(getCompanyTypes.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getCompanyTypes.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.companyTypes = action.payload.data || [];
            })
            .addCase(getCompanyTypes.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // get single company type
            .addCase(getCompanyType.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getCompanyType.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.companyType = action.payload.data || null;
            })
            .addCase(getCompanyType.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // create company type
            .addCase(createCompanyType.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createCompanyType.fulfilled, (state, action) => {
                state.status = "succeeded";
                if (action.payload.data) {
                    state.companyTypes.push(action.payload.data);
                }
            })
            .addCase(createCompanyType.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // update company type
            .addCase(updateCompanyType.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateCompanyType.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updated = action.payload.data;
                if (updated) {
                    const idx = state.companyTypes.findIndex((ct) => ct.id === updated.id);
                    if (idx !== -1) {
                        state.companyTypes[idx] = updated;
                    }
                    if (state.companyType && state.companyType.id === updated.id) {
                        state.companyType = updated;
                    }
                }
            })
            .addCase(updateCompanyType.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // delete company type
            .addCase(deleteCompanyType.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteCompanyType.fulfilled, (state, action) => {
                state.status = "succeeded";
                const id = action.meta.arg;
                state.companyTypes = state.companyTypes.filter((ct) => ct.id !== id);
                if (state.companyType && state.companyType.id === id) {
                    state.companyType = null;
                }
            })
            .addCase(deleteCompanyType.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default companyTypesSlice.reducer;
