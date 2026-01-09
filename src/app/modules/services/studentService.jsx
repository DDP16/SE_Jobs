import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../AxiosInstance";

const apiBaseUrl = "/api/students";

export const getStudents = createAsyncThunk(
    "students/getStudents",
    async (params, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/`, {
                params: params,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const getStudent = createAsyncThunk(
    "students/getStudent",
    async (studentId, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/${studentId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

const initialState = {
    student: null,
    students: [],
    pagination: {},
    status: 'idle',
    error: null,
};

const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStudents.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getStudents.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.students = action.payload?.data || action.payload || [];
                state.pagination = action.payload?.pagination || {};
            })
            .addCase(getStudents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getStudent.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getStudent.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.student = action.payload?.data || action.payload || null;
            })
            .addCase(getStudent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default studentSlice.reducer;