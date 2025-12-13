import api from "../AxiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiBaseUrl = "/api/certifications";

// Redux slice and thunks for certificates

export const getCertificatesByStudentId = createAsyncThunk(
    "certificates/getCertificatesByStudentId",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const getCertificate = createAsyncThunk(
    "certificates/getCertificate",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const createCertificate = createAsyncThunk(
    "certificates/createCertificate",
    async (certificateData, { rejectWithValue }) => {
        try {
            const response = await api.post(`${apiBaseUrl}/`, certificateData, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const updateCertificate = createAsyncThunk(
    "certificates/updateCertificate",
    async ({ id, certificateData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`${apiBaseUrl}/${id}`, certificateData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const deleteCertificate = createAsyncThunk(
    "certificates/deleteCertificate",
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
    certificates: [],
    certificate: null,
    status: "idle",
    error: null,
};

const certificatesSlice = createSlice({
    name: "certificates",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get all by student ID
            .addCase(getCertificatesByStudentId.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getCertificatesByStudentId.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.certificates = action.payload.data || [];
            })
            .addCase(getCertificatesByStudentId.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Get single
            .addCase(getCertificate.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getCertificate.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.certificate = action.payload.data || null;
            })
            .addCase(getCertificate.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Create
            .addCase(createCertificate.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createCertificate.fulfilled, (state, action) => {
                state.status = "succeeded";
                if (action.payload.data) {
                    state.certificates.push(action.payload.data);
                }
            })
            .addCase(createCertificate.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Update
            .addCase(updateCertificate.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateCertificate.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updated = action.payload.data;
                if (updated) {
                    const idx = state.certificates.findIndex((c) => c.id === updated.id);
                    if (idx !== -1) {
                        state.certificates[idx] = updated;
                    }
                    if (state.certificate && state.certificate.id === updated.id) {
                        state.certificate = updated;
                    }
                }
            })
            .addCase(updateCertificate.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Delete
            .addCase(deleteCertificate.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteCertificate.fulfilled, (state, action) => {
                state.status = "succeeded";
                const id = action.meta.arg;
                state.certificates = state.certificates.filter((c) => c.id !== id);
                if (state.certificate && state.certificate.id === id) {
                    state.certificate = null;
                }
            })
            .addCase(deleteCertificate.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default certificatesSlice.reducer;
