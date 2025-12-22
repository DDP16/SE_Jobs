import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../AxiosInstance";

const apiBaseUrl = "/api/categories";

export const getCategories = createAsyncThunk(
  "categories/getCategories", async (requestData, { rejectWithValue }) => {
  try {
    const response = await api.get(`${apiBaseUrl}/`, { params: requestData });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Something went wrong");
  }
});

const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        // console.log("Fulfilled payload:", action.payload);
        // console.log("Data to store:", action.payload.data);
        state.status = "succeeded";
        state.categories = action.payload.data || [];
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
