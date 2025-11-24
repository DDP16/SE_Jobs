import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../AxiosInstance";

const apiBaseUrl = "/api/address";

export const getProvinces = createAsyncThunk(
    "address/getProvinces",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/provinces`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getWards = createAsyncThunk(
    "address/getWards",
    async (provinceId, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/provinces/${provinceId}/wards`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


const addressSlice = createSlice({
    name: "address",
    initialState: {
        provinces: [],
        wards: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getProvinces.fulfilled, (state, action) => {
            state.provinces = action.payload;
        })
        .addCase(getWards.fulfilled, (state, action) => {
            state.wards = action.payload;
        }); 
    },
});

export default addressSlice.reducer;