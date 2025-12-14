import api from "../AxiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiBaseUrl = "/api/educations";

export const getEducations = createAsyncThunk(
    "educations/getEducations",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);
// Redux slice and thunks for educations

export const getEducationByStudentId = createAsyncThunk(
  "educations/getEducationByStudentId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${apiBaseUrl}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

export const getEducation = createAsyncThunk(
  "educations/getEducation",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${apiBaseUrl}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

export const createEducation = createAsyncThunk(
  "educations/createEducation",
  async (educationData, { rejectWithValue }) => {
    try {
      const response = await api.post(`${apiBaseUrl}/`, educationData, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

export const updateEducation = createAsyncThunk(
  "educations/updateEducation",
  async ({ id, educationData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${apiBaseUrl}/${id}`, educationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

export const deleteEducation = createAsyncThunk(
  "educations/deleteEducation",
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
  educations: [],
  education: null,
  status: "idle",
  error: null,
};

const educationsSlice = createSlice({
  name: "educations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all by student ID
      .addCase(getEducationByStudentId.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getEducationByStudentId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.educations = action.payload.data || [];
      })
      .addCase(getEducationByStudentId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get single
      .addCase(getEducation.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getEducation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.education = action.payload.data || null;
      })
      .addCase(getEducation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Create
      .addCase(createEducation.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createEducation.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Optionally push to educations
        if (action.payload.data) {
          state.educations.push(action.payload.data);
        }
      })
      .addCase(createEducation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Update
      .addCase(updateEducation.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateEducation.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updated = action.payload.data;
        if (updated) {
          const idx = state.educations.findIndex((e) => e.id === updated.id);
          if (idx !== -1) {
            state.educations[idx] = updated;
          }
          if (state.education && state.education.id === updated.id) {
            state.education = updated;
          }
        }
      })
      .addCase(updateEducation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteEducation.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteEducation.fulfilled, (state, action) => {
        state.status = "succeeded";
        const id = action.meta.arg;
        state.educations = state.educations.filter((e) => e.id !== id);
        if (state.education && state.education.id === id) {
          state.education = null;
        }
      })
      .addCase(deleteEducation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default educationsSlice.reducer;
