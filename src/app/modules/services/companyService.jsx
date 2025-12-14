import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../AxiosInstance";

const apiBaseUrl = "/api/companies";

export const getCompanies = createAsyncThunk(
    "companies",
    async (query, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/`, {
                params: query,
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
            const isFormData = companyData instanceof FormData;
            let config = { withCredentials: true };
            if (isFormData) {
                config.headers = { 'Content-Type': 'multipart/form-data' };
            }
            const response = await api.put(
                `${apiBaseUrl}/${companyId}`,
                companyData,
                config
            );
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
    pagination: {}
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
                state.pagination = action.payload?.pagination || {};
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
                state.status = "succeeded"
                const companyData = action.payload?.data || action.payload || null;
                state.company = companyData;
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
                    const updatedId = updated.id || updated.company_id || updated.companyId;
                    // Update in companies array
                    const idx = state.companies.findIndex(c => c.id === updatedId || c.company_id === updatedId || c.companyId === updatedId);
                    if (idx !== -1) state.companies[idx] = updated;
                    // Update current company if it matches
                    if (state.company && (state.company.id === updatedId || state.company.company_id === updatedId || state.company.companyId === updatedId)) {
                        state.company = updated;
                    }
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
