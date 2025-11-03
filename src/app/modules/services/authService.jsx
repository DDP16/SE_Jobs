import { get, post } from "../httpHandle";
import { getToken, saveToken } from "../utils/encryption";

export const loginWithEmail = async (email, password) => {
    const reqData = { email, password };
    
    return new Promise((resolve, reject) => {
        post(
            "/api/auth/login",
            reqData,
            async (res) => {
                try {
                    const data = await res.json();
                    console.log("Login response:", res);
                    const tokenHeader = res.headers.get("authorization");
                    if (!tokenHeader) {
                        reject(new Error("No token in header"));
                        return;
                    }
                    const token = tokenHeader.replace("Bearer ", "");
                    if (token) {
                        saveToken(token);
                        localStorage.setItem("user_id", data.data.user.user_id);
                        resolve({
                            status: res.status,
                            user: data.data.user,
                            message: "Login successful"
                        });
                    } else {
                        reject(new Error("Invalid token"));
                    }
                } catch (error) {
                    console.error("Login processing error:", error);
                    reject(error);
                }
            },
            async (res) => {
                const data = await res.json();
                reject(data);
            }
        );
    });
};

export const register = async (email, password, first_name, last_name) => {
    const reqData = { email, password, first_name, last_name, confirm_password: password };
    
    return new Promise((resolve, reject) => {
        post(
            "/api/auth/register",
            reqData,
            async (res) => {
                try {
                    const data = await res.json();
                    console.log("Register response:", res);
                    if (res.ok) {
                        resolve({
                            status: res.status,
                            message: data.message || "Registration successful",
                            success: true,
                            data: data
                        });
                    } else {
                        reject({
                            status: res.status,
                            message: data.message || "Registration failed",
                            success: false,
                            data: data
                        });
                    }
                } catch (error) {
                    console.error("Registration processing error:", error);
                    reject(error);
                }
            },
            async (res) => {
                try {
                    const data = await res.json();
                    reject({
                        status: res.status,
                        message: data.message || "Registration failed",
                        success: false,
                        data: data
                    });
                } catch (error) {
                    console.error("Error parsing error response:", error);
                    reject(new Error("Registration failed"));
                }
            }
        );
    });
};

export const getMe = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const token = await getToken();
            
            if (!token) {
                reject(new Error("Failed to decrypt token"));
                return;
            }
            
            get(
                "/api/auth/me",
                { "Authorization": `Bearer ${token}` },
                async (res) => {
                    try {
                        const data = await res.json();
                        console.log("GetMe response:", res);
                        if (res.ok) {
                            resolve({
                                status: res.status,
                                user: data.data || data,
                                message: "User data fetched successfully",
                                success: true,
                                data: data
                            });
                        } else {
                            reject({
                                status: res.status,
                                message: data.message || `Failed to fetch user data: ${res.status}`,
                                success: false,
                                data: data
                            });
                        }
                    } catch (error) {
                        console.error("GetMe processing error:", error);
                        reject(new Error("Failed to parse response: " + error.message));
                    }
                },
                async (res) => {
                    try {
                        const data = await res.json();
                        reject({
                            status: res.status,
                            message: data.message || "Network error",
                            success: false,
                            data: data
                        });
                    } catch (error) {
                        console.error("Error parsing error response:", error);
                        reject(new Error("Network error: " + error.message));
                    }
                }
            );
        } catch (error) {
            reject(new Error("Token decryption error: " + error.message));
        }
    });
};

export const logout = async () => {
    return new Promise((resolve, reject) => {
        try {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("user_id");
            
            resolve({
                status: 200,
                message: "Logout successful",
                success: true
            });
        } catch (error) {
            console.error("Logout error:", error);
            reject({
                status: 500,
                message: "Logout failed",
                success: false,
                error: error.message
            });
        }
    });
};