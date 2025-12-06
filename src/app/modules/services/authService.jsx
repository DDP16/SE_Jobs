import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, post } from "../httpHandle";
import { AUTHENTICATED, USER_ID, USER_ROLE, AUTH_USER } from "src/settings/localVar";

const setAuthStorage = (userId, isAuthenticated, userRole, user) => {
  localStorage.setItem(AUTHENTICATED, isAuthenticated);
  localStorage.setItem(USER_ID, userId);
  localStorage.setItem(USER_ROLE, userRole);
  localStorage.setItem(AUTH_USER, JSON.stringify(user));
};

const getAuthStorage = () => {
  return {
    isAuthenticated: localStorage.getItem(AUTHENTICATED),
    userId: localStorage.getItem(USER_ID),
    userRole: localStorage.getItem(USER_ROLE),
    user: (() => {
      const raw = localStorage.getItem(AUTH_USER);
      if (!raw || raw === "undefined" || raw === "null") return null;
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    })(),
  };
};

const clearAuthStorage = () => {
  localStorage.removeItem(AUTHENTICATED);
  localStorage.removeItem(USER_ID);
  localStorage.removeItem(USER_ROLE);
  localStorage.removeItem(AUTH_USER);
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
                setAuthStorage(userId, isAuthenticated, userRole, data.data.user);
                resolve({ userId, isAuthenticated, userRole, user: data.data.user });
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

export const getMe = createAsyncThunk("auth/getMe", async (_, { rejectWithValue }) => {
  try {
    const result = await new Promise((resolve, reject) => {
      get(
        "/api/auth/me",
        async (res) => {
          try {
            const data = await res.json();
            console.log("GetMe raw response:", data);
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
            const data = await res.json();
            reject(data.message || "Network error");
          } catch (error) {
            reject("Network error: " + error.message);
          }
        }
      );
    });
    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
});
// export const getMe = createAsyncThunk("auth/getMe", async (_, { rejectWithValue }) => {
//   try {
//     const res = await fetch("/api/auth/me", {
//       method: "GET",
//       credentials: "include",
//     });

//     if (!res.ok) {
//       return rejectWithValue("Failed to load profile");
//     }

//     const data = await res.json();
//     return data.data;
//   } catch (err) {
//     return rejectWithValue("Network error");
//   }
// });

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
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
});

const authStorage = getAuthStorage();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: authStorage.userId || null,
    userRole: authStorage.userRole || null,
    isAuthenticated: authStorage.isAuthenticated || false,
    user: authStorage.user || null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
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
        state.userId = action.payload.userId;
        state.userRole = action.payload.userRole;
        state.isAuthenticated = true;
        state.user = action.payload.user; // <-- set user profile immediately
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
        if (action.payload) {
          setAuthStorage(action.payload.user_id, true, action.payload.role, action.payload);
        }
      })
      .addCase(getMe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
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
        clearAuthStorage();
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;

// Export helper functions if needed
export { setAuthStorage, getAuthStorage, clearAuthStorage };
