import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../AxiosInstance";

const apiBaseUrl = "/api/job-notification-subscriptions";

// GET - Get subscription status
export const getSubscriptionStatus = createAsyncThunk(
    "jobNotificationSubscription/getStatus",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${apiBaseUrl}/`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to get subscription status");
        }
    }
);

// POST - Subscribe to job notifications
export const subscribe = createAsyncThunk(
    "jobNotificationSubscription/subscribe",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.post(`${apiBaseUrl}/`, {
                is_active: true
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to subscribe");
        }
    }
);

// DELETE - Unsubscribe from job notifications
export const unsubscribe = createAsyncThunk(
    "jobNotificationSubscription/unsubscribe",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.delete(`${apiBaseUrl}/`);
            return { is_active: false };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to unsubscribe");
        }
    }
);

// PUT - Toggle subscription status
export const toggleSubscription = createAsyncThunk(
    "jobNotificationSubscription/toggle",
    async (_, { rejectWithValue, getState }) => {
        try {
            const currentState = getState().jobNotificationSubscription.isSubscribed;
            const newState = !currentState;

            const response = await api.put(`${apiBaseUrl}/`, {
                is_active: newState
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to toggle subscription");
        }
    }
);

// PUT - Update subscription with specific value
export const updateSubscription = createAsyncThunk(
    "jobNotificationSubscription/update",
    async (isActive, { rejectWithValue }) => {
        try {
            const response = await api.put(`${apiBaseUrl}/`, {
                is_active: isActive
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update subscription");
        }
    }
);

// Slice
const jobNotificationSubscriptionSlice = createSlice({
    name: "jobNotificationSubscription",
    initialState: {
        subscription: null,
        isSubscribed: false,
        status: "idle", // idle | loading | succeeded | failed
        error: null,
    },
    reducers: {
        resetSubscriptionState: (state) => {
            state.subscription = null;
            state.isSubscribed = false;
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Get subscription status
            .addCase(getSubscriptionStatus.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getSubscriptionStatus.fulfilled, (state, action) => {
                const isSubscribed = action.payload?.is_subscribed ?? false;
                state.status = "succeeded";
                state.subscription = action.payload?.subscription || action.payload;
                state.isSubscribed = isSubscribed;
            })
            .addCase(getSubscriptionStatus.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // Subscribe
            .addCase(subscribe.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(subscribe.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.subscription = action.payload;
                state.isSubscribed = action.payload?.is_active ?? true;
            })
            .addCase(subscribe.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // Unsubscribe
            .addCase(unsubscribe.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(unsubscribe.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.subscription = action.payload;
                state.isSubscribed = action.payload?.is_active ?? false;
            })
            .addCase(unsubscribe.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // Toggle subscription
            .addCase(toggleSubscription.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(toggleSubscription.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.subscription = action.payload;
                state.isSubscribed = action.payload?.is_active || false;
            })
            .addCase(toggleSubscription.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // Update subscription
            .addCase(updateSubscription.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateSubscription.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.subscription = action.payload;
                state.isSubscribed = action.payload?.is_active || false;
            })
            .addCase(updateSubscription.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { resetSubscriptionState } = jobNotificationSubscriptionSlice.actions;
export default jobNotificationSubscriptionSlice.reducer;
