import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../AxiosInstance";

const apiBaseUrl = "/api/media";

export const uploadMedia = createAsyncThunk(
    "media/uploadMedia",
    async (mediaData, { rejectWithValue }) => {
        try {
            const response = await api.post(`${apiBaseUrl}/upload`, mediaData, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || "Something went wrong");
        }
    }
);

export const uploadMultiMedia = createAsyncThunk(
    "media/uploadMultiMedia",
    async (mediaData, { rejectWithValue }) => {
        try {
            const response = await api.post(`${apiBaseUrl}/uploads`, mediaData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);

export const deleteMedia = createAsyncThunk(
    "media/deleteMedia",
    async (fileName, { rejectWithValue }) => {
        try {
            if (!fileName) {
                return rejectWithValue("fileName is required!");
            }
            const response = await api.delete(`${apiBaseUrl}/delete/${fileName}`, {
                withCredentials: true,
            });

            if (response.data?.success) {
                return {
                    success: true,
                    message: response.data.message,
                    fileName: response.data.fileName,
                };
            } else {
                return rejectWithValue(response.data?.message || "Delete failed!");
            }
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                "Something went wrong"
            );
        }
    }
);

const initialState = {
    media: null,
    mediaItems: [],
    status: "idle",
    error: null,
};

const mediaSlice = createSlice({
    name: "media",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadMedia.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(uploadMedia.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.media = action.payload;
            })
            .addCase(uploadMedia.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(uploadMultiMedia.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(uploadMultiMedia.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.mediaItems = action.payload.data;
            })
            .addCase(uploadMultiMedia.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(deleteMedia.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteMedia.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.mediaItems = state.mediaItems.filter(media => media.fileName !== action.payload.fileName);
            })
            .addCase(deleteMedia.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default mediaSlice.reducer;