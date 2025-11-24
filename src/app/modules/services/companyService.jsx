import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../AxiosInstance";

const apiBaseUrl = "/api/companies";

export const getCompanies = createAsyncThunk(
    "companies/getCompanies",
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/`, {
                params: { page: page, limit: limit },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        } 
    });
    
export const getCompany = createAsyncThunk(
    "companies/getCompany",
    async (companyId, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/${companyId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const createCompany = createAsyncThunk(
    "companies/createCompany",
    async (companyData, { rejectWithValue }) => {
        try {
            const response = await api.post(`${apiBaseUrl}/`, companyData, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const updateCompany = createAsyncThunk(
    "companies/updateCompany",
    async ({ companyId, companyData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`${apiBaseUrl}/${companyId}`, companyData, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const deleteCompany = createAsyncThunk(
    "companies/deleteCompany",
    async (companyId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`${apiBaseUrl}/${companyId}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

const initialState = {
    company: null,
    companies: [],
    status: "idle",
    error: null,
}

const companiesSlice = createSlice({
    name: "companies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // getCompanies
            .addCase(getCompanies.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getCompanies.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.companies = action.payload?.data ?? action.payload ?? [];
            })
            .addCase(getCompanies.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // getCompany
            .addCase(getCompany.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getCompany.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.company = action.payload?.data ?? action.payload ?? null;
            })
            .addCase(getCompany.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // createCompany
            .addCase(createCompany.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createCompany.fulfilled, (state, action) => {
                state.status = "succeeded";
                const newCompany = action.payload?.data ?? action.payload;
                if (newCompany) state.companies.push(newCompany);
            })
            .addCase(createCompany.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // updateCompany
            .addCase(updateCompany.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateCompany.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updated = action.payload?.data ?? action.payload;
                if (updated) {
                    const idx = state.companies.findIndex(c => c.id === (updated.id || updated.company_id || updated.companyId));
                    if (idx !== -1) state.companies[idx] = updated;
                }
            })
            .addCase(updateCompany.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // deleteCompany
            .addCase(deleteCompany.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteCompany.fulfilled, (state, action) => {
                state.status = "succeeded";
                const payload = action.payload ?? {};
                const deletedId = payload?.data?.id ?? payload?.id ?? payload?.companyId ?? payload?.company_id ?? null;
                if (deletedId) {
                    state.companies = state.companies.filter(c => c.id !== deletedId && c.company_id !== deletedId && c.companyId !== deletedId);
                }
            })
            .addCase(deleteCompany.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default companiesSlice.reducer;
