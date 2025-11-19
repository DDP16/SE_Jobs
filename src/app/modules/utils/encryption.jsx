import { TOKEN } from "../../../settings/localVar";
import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;
let token = '';

export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
};

export const decryptData = (data) => {
    const bytes = CryptoJS.AES.decrypt(data, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};

export const saveToken = (data) => {
    if (!ENCRYPTION_KEY) throw new Error("No encryption key found");
    token = data;
    const enc_data = encryptData(data);
    localStorage.setItem(TOKEN, enc_data);
};

export const getToken = () => {
    if (!ENCRYPTION_KEY) throw new Error("No encryption key found");
    const enc_Token = localStorage.getItem(TOKEN);
    if (!enc_Token) {
        return null;
    }
    try {
        token = decryptData(enc_Token);
        return token;
    } catch (err) {
        console.warn("Failed to decrypt token from localStorage:", err);
        try {
            localStorage.removeItem(TOKEN);
        } catch (e) {
            // ignore
        }
        return null;
    }
}