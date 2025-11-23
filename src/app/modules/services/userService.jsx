import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../AxiosInstance";

const apiBaseUrl = "/api/users";

export const getUsers = createAsyncThunk(
    "user/getUsers",
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/`, {
                params: { page: page, limit: limit },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const getUserById = createAsyncThunk(
    "user/getUserById",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/${userId}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const createUser = createAsyncThunk(
    "user/createUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post(`${apiBaseUrl}/`, userData, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async ({ userId, userData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`${apiBaseUrl}/${userId}`, userData, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`${apiBaseUrl}/${userId}`, {
                withCredentials: true,
            });
            return { response: response.data, userId };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

const initialState = {
    user: null,
    userItems: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.userItems = action.payload.data;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getUserById.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.data;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(createUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.data;
                state.userItems.push(action.payload.data);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.data;
                const index = state.userItems.findIndex(user => user.user_id === action.payload.data.user_id);
                if (index !== -1) {
                    state.userItems[index] = action.payload.data;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.userItems = state.userItems.filter(user => user.user_id !== action.payload.userId);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;