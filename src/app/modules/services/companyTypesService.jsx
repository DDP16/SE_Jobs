import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../AxiosInstance";

const apiBaseUrl = "/api/company_types";

export const getCompanyTypes = createAsyncThunk("companyTypes/getTypes", async ({ page, limit }, { rejectWithValue }) => {
  try {
    const response = await api.get(`${apiBaseUrl}/`, {
      params: { page: page, limit: limit },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Something went wrong");
  }
});

const initialState = {
  types: [],
  status: "idle",
  error: null,
};

const companyTypesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanyTypes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCompanyTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.types = action.payload.data || [];
      })
      .addCase(getCompanyTypes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default companyTypesSlice.reducer;
