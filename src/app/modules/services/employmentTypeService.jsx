import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../AxiosInstance";

const apiBaseUrl = "/api/employment-types";

export const getEmploymentTypes = createAsyncThunk(
  "employmentTypes/getEmploymentTypes",
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await api.get(`${apiBaseUrl}/`, { params: requestData });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

const initialState = {
  employmentTypes: [],
  status: "idle",
  error: null,
};

const employmentTypesSlice = createSlice({
  name: "employmentTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmploymentTypes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getEmploymentTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employmentTypes = action.payload.data || [];
      })
      .addCase(getEmploymentTypes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default employmentTypesSlice.reducer;
