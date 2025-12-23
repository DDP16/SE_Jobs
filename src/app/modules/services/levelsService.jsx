import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../AxiosInstance";

const apiBaseUrl = "/api/levels";

export const getLevels = createAsyncThunk(
  "levels/getLevels", async (requestData, { rejectWithValue }) => {
  try {
    const response = await api.get(`${apiBaseUrl}/`, { params: requestData });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Something went wrong");
  }
});

const initialState = {
  levels: [],
  status: "idle",
  error: null,
};

const levelsSlice = createSlice({
  name: "levels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLevels.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getLevels.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.levels = action.payload.data || [];
      })
      .addCase(getLevels.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default levelsSlice.reducer;
