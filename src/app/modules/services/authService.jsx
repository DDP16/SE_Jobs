import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, post } from "../httpHandle";
import { AUTHENTICATED, USER_ID, USER_ROLE } from "src/settings/localVar";

const setAuthStorage = (userId, isAuthenticated, userRole) => {
    localStorage.setItem(AUTHENTICATED, isAuthenticated);
    localStorage.setItem(USER_ID, userId);
    localStorage.setItem(USER_ROLE, userRole);
};

const getAuthStorage = () => {
  return {
    isAuthenticated: localStorage.getItem(AUTHENTICATED),
    userId: localStorage.getItem(USER_ID),
    userRole: localStorage.getItem(USER_ROLE)
  };
};

const clearAuthStorage = () => {
  localStorage.removeItem(AUTHENTICATED);
  localStorage.removeItem(USER_ID);
  localStorage.removeItem(USER_ROLE);
};

export const loginWithEmail = createAsyncThunk(
    "auth/loginWithEmail",
    async ({ email, password }, { rejectWithValue }) => {
        const reqData = { email, password };

        try {
            const result = await new Promise((resolve, reject) => {
                post(
                    "/api/auth/login",
                    reqData,
                    async (res) => {
                        try {
                            const data = await res.json();
                            const isAuthenticated = await res.ok;
                            console.log("Login response:", res);
                            if (isAuthenticated) {
                                const userId = data.data.user.user_id;
                                const userRole = data.data.user.role;
                                setAuthStorage(userId, isAuthenticated, userRole);
                                resolve({ userId, isAuthenticated, userRole });
                            } else {
                                reject("Login failed: " + (data.message || res.status));
                            }
                        } catch (error) {
                            console.error("Login processing error:", error);
                            reject(error.message || "Login processing error");
                        }
                    },
                    async (res) => {
                        try {
                            const data = await res.json();
                            reject(data.message || "Login failed");
                        } catch (error) {
                            reject("Login failed");
                        }
                    }
                );
            });
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async ({ email, password, first_name, last_name }, { rejectWithValue }) => {
        const reqData = {
            email,
            password,
            first_name,
            last_name,
            confirm_password: password,
        };

        try {
            const result = await new Promise((resolve, reject) => {
                post(
                    "/api/auth/register",
                    reqData,
                    async (res) => {
                        try {
                            const data = await res.json();
                            console.log("Register response:", res);
                            if (res.ok) {
                                resolve(data);
                            } else {
                                reject(data.message || "Registration failed");
                            }
                        } catch (error) {
                            console.error("Registration processing error:", error);
                            reject(error.message || "Registration processing error");
                        }
                    },
                    async (res) => {
                        try {
                            const data = await res.json();
                            reject(data.message || "Registration failed");
                        } catch (error) {
                            console.error("Error parsing error response:", error);
                            reject("Registration failed");
                        }
                    }
                );
            });
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getMe = createAsyncThunk(
    "auth/getMe",
    async (_, { rejectWithValue }) => {       
        const result = await new Promise((resolve, reject) => {
            get(
                "/api/auth/me",
                async (res) => {
                    try {
                        const data = await res.json();
                        console.log("GetMe response:", res);
                        if (res.ok) {
                            resolve(data.data || data);
                        } else {
                            reject(data.message || "Failed to fetch user data: " + res.status);
                        }
                    } catch (error) {
                        console.error("GetMe processing error:", error);
                        reject("Failed to parse response: " + error.message);
                    }
                },
                async (res) => {
                    try {
                        const data = await res.json();
                        reject(data.message || "Network error");
                    } catch (error) {
                        console.error("Error parsing error response:", error);
                        reject("Network error: " + error.message);
                    }
                }
            );
        });
        return result;
    }
);

const authStorage = getAuthStorage();

const authSlice = createSlice({
    name: "auth",
    initialState: {
        userId: authStorage.userId || null,
        userRole: authStorage.userRole || null,
        isAuthenticated: authStorage.isAuthenticated || false,
        user: null,
        status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.userId = null;
            state.userRole = null;
            state.isAuthenticated = false;
            state.user = null;
            state.status = "idle";
            state.error = null;
            clearAuthStorage();
        },
        clearError: (state) => {
            state.error = null;
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginWithEmail.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginWithEmail.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.userId = action.payload.userId;
                state.userRole = action.payload.userRole;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginWithEmail.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getMe.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(getMe.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

// Export helper functions if needed
export { setAuthStorage, getAuthStorage, clearAuthStorage };