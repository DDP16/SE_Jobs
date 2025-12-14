import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../AxiosInstance";

const apiBaseUrl = "/api/company-branches";

export const getCompanyBranches = createAsyncThunk(
  "companyBranches/getAll",
  async ({ page = 1, limit = 10, companyId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${apiBaseUrl}?page=${page}&limit=${limit}` + (companyId ? `&company_id=${companyId}` : ""));
      console.log('Fetched branches:', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getCompanyBranch = createAsyncThunk(
  "companyBranches/getOne",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${apiBaseUrl}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createCompanyBranch = createAsyncThunk(
  "companyBranches/create",
  async (branchData, { rejectWithValue }) => {
    try {
      const response = await api.post(apiBaseUrl, branchData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateCompanyBranch = createAsyncThunk(
  "companyBranches/update",
  async ({ id, branchData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${apiBaseUrl}/${id}`, branchData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteCompanyBranch = createAsyncThunk(
  "companyBranches/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${apiBaseUrl}/${id}`);
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  branches: [],
  branch: null,
  status: "idle",
  error: null,
};

const companyBranchesSlide = createSlice({
  name: "companyBranches",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanyBranches.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCompanyBranches.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.branches = action.payload.data;
      })
      .addCase(getCompanyBranches.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getCompanyBranch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCompanyBranch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.branch = action.payload;
      })
      .addCase(getCompanyBranch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createCompanyBranch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCompanyBranch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.branches.push(action.payload);
      })
      .addCase(createCompanyBranch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateCompanyBranch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCompanyBranch.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.branches.findIndex(branch => branch.id === action.payload.id);
        if (index !== -1) {
          state.branches[index] = action.payload;
        }
      })
      .addCase(updateCompanyBranch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteCompanyBranch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCompanyBranch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.branches = state.branches.filter(branch => branch.id !== action.payload.id);
      })
      .addCase(deleteCompanyBranch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default companyBranchesSlide.reducer;