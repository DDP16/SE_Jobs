import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../AxiosInstance";

const apiBaseUrl = "/api/skills";

export const getSkills = createAsyncThunk("skills/getSkills", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(`${apiBaseUrl}/`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Something went wrong");
  }
});

const initialState = {
  skills: [],
  status: "idle",
  error: null,
};

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSkills.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSkills.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.skills = action.payload.data || [];
      })
      .addCase(getSkills.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default skillsSlice.reducer;
