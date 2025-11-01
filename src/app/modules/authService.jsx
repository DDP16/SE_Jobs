import { post } from "./httpHandle";
import CryptoJS from "crypto-js";

export const loginWithEmail = async (email, password, nav) => {
    const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;
    const reqData = { email, password };
    post(
        "/api/auth/login",
        reqData,
        async (res) => {
            const data = await res.json();
            console.log("Login response:", await res);
            const tokenHeader = await res.headers.get("authorization");
            if (!tokenHeader) throw new Error("No token in header");
            const token = tokenHeader.replace("Bearer ", "");
            if (token) {
                localStorage.setItem(
                    "auth_token",
                    CryptoJS.AES.encrypt(token, ENCRYPTION_KEY).toString()
                );
                localStorage.setItem("user_id", data.data.user.user_id);
                nav("/");
            }
        },
        () => {
            alert("Login failed");
            throw new Error("Login failed");
        }
    );
};
