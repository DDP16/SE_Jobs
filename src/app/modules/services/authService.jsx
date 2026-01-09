import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, post } from "../httpHandle";
import { AUTHENTICATED, USER_ID, USER_ROLE, AUTH_USER } from "src/settings/localVar";

const setAuthStorage = (userId, isAuthenticated) => {
  localStorage.setItem(AUTHENTICATED, isAuthenticated);
  localStorage.setItem(USER_ID, userId);
};

const getAuthStorage = () => {
  return {
    isAuthenticated: localStorage.getItem(AUTHENTICATED),
    userId: localStorage.getItem(USER_ID),
  };
};

const clearAuthStorage = () => {
  localStorage.removeItem(AUTHENTICATED);
  localStorage.removeItem(USER_ID);
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
                setAuthStorage(userId, isAuthenticated);
                resolve(data.data.user);
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
  async (
    {
      email,
      password,
      first_name,
      last_name,
      confirm_password,
      role = 'Student',
      company,
      company_branches,
    },
    { rejectWithValue }
  ) => {
    const reqData = {
      email,
      password,
      first_name,
      last_name,
      confirm_password,
      role,
      company,
      company_branches,
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

export const getMe = createAsyncThunk("auth/getMe", async (_, { rejectWithValue, dispatch }) => {
  try {
    const result = await new Promise((resolve, reject) => {
      get(
        "/api/auth/me",
        async (res) => {
          try {
            const data = await res.json();
            if (res.ok && data.success) {
              resolve(data.data);
            } else {
              reject(data.message || "Failed to fetch user data: " + res.status);
            }
          } catch (error) {
            reject("Failed to parse response: " + error.message);
          }
        },
        async (res) => {
          try {
            // Check if token is expired (401 Unauthorized)
            if (res && res.status === 401) {
              // Automatically logout when token expires
              dispatch(logout());
              reject("Token expired");
              return;
            }
            const data = await res.json();
            reject(data.message || "Network error");
          } catch (error) {
            // If response doesn't have status, check if it's a network error
            if (res && res.status === 401) {
              dispatch(logout());
              reject("Token expired");
              return;
            }
            reject("Network error: " + error.message);
          }
        }
      );
    });
    return result;
  } catch (error) {
    // If error indicates token expiration, logout
    if (error === "Token expired" || (error.message && error.message.includes("401"))) {
      dispatch(logout());
    }
    return rejectWithValue(error);
  }
});

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const result = await new Promise((resolve, reject) => {
        post(
          "/api/auth/logout",
          {},
          async (res) => {
            try {
              const data = await res.json();
              if (res.ok) {
                resolve(data);
                clearAuthStorage();
              } else {
                reject(data.message || "Logout failed");
              }
            } catch (error) {
              reject(error.message || "Logout processing error");
            }
          },
          async (res) => {
            try {
              const data = await res.json();
              reject(data.message || "Logout failed");
            } catch (error) {
              reject("Logout failed");
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

export const requestPasswordReset = createAsyncThunk(
  "auth/requestPasswordReset",
  async ({ email }, { rejectWithValue }) => {
    const reqData = { email };

    try {
      const result = await new Promise((resolve, reject) => {
        post(
          "/api/auth/password/forgot",
          reqData,
          async (res) => {
            try {
              const data = await res.json();
              if (res.ok) {
                resolve(data);
              } else {
                reject(data.message || "Request password reset failed");
              }
            } catch (error) {
              reject(error.message || "Request password reset processing error");
            }
          },
          async (res) => {
            try {
              const data = await res.json();
              reject(data.message || "Request password reset failed");
            } catch (error) {
              reject("Request password reset failed");
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

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, otp, new_password }, { rejectWithValue }) => {
    const reqData = { email, otp, new_password };

    try {
      const result = await new Promise((resolve, reject) => {
        post(
          "/api/auth/password/reset",
          reqData,
          async (res) => {
            try {
              const data = await res.json();
              if (res.ok) {
                resolve(data);
              } else {
                reject(data.message || "Reset password failed");
              }
            } catch (error) {
              reject(error.message || "Reset password processing error");
            }
          },
          async (res) => {
            try {
              const data = await res.json();
              reject(data.message || "Reset password failed");
            } catch (error) {
              reject("Reset password failed");
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

export const changePassword = createAsyncThunk(
  "auth/password/change",
  async ({ old_password, new_password }, { rejectWithValue }) => {
    const reqData = { old_password, new_password };
    try {
      const result = await new Promise((resolve, reject) => {
        post(
          "/api/auth/password/change",
          reqData,
          async (res) => {
            try {
              const data = await res.json();
              if (res.ok) {
                resolve(data);
              } else {
                reject(data.message || "Change password failed");
              }
            } catch (error) {
              reject(error.message || "Change password processing error");
            }
          },
          async (res) => {
            try {
              const data = await res.json();
              reject(data.message || "Change password failed");
            } catch (error) {
              reject("Change password failed");
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

const authStorage = getAuthStorage();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: authStorage.userId || null,
    userRole: null,
    isAuthenticated: authStorage.isAuthenticated || false,
    user: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    isLoadingGetMe: false,
    error: null,
  },
  reducers: {
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
        state.userId = action.payload.user_id;
        state.userRole = action.payload.role;
        state.isAuthenticated = true;
        state.user = action.payload;
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
        state.isLoadingGetMe = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoadingGetMe = false;
        state.user = action.payload;
        state.userId = action.payload.user_id;
        state.userRole = action.payload.role;
        state.isAuthenticated = true;
        state.error = null;
        if (action.payload) {
          setAuthStorage(action.payload.user_id, true);
        }
      })
      .addCase(getMe.rejected, (state, action) => {
        state.status = "failed";
        state.isLoadingGetMe = false;
        state.error = action.payload;
        // If token expired, clear auth state
        if (action.payload === "Token expired" || (typeof action.payload === "string" && action.payload.includes("401"))) {
          state.userId = null;
          state.userRole = null;
          state.isAuthenticated = false;
          state.user = null;
          clearAuthStorage();
        }
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userId = null;
        state.userRole = null;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
        state.isLoadingGetMe = false;
        clearAuthStorage();
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Reset Password
      .addCase(requestPasswordReset.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;

// Export helper functions if needed
export { setAuthStorage, getAuthStorage, clearAuthStorage };
