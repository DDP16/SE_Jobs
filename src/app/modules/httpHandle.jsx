import { BE_ENPOINT, PUBLIC_ENPOINT } from "../../settings/localVar";

const productURL = PUBLIC_ENPOINT;
const developmentURL = BE_ENPOINT;

const baseURL = import.meta.env.MODE === "production" ? productURL : developmentURL;

const HEADERS = {
  "Content-Type": "application/json",
  accept: "application/json",
};

export const get = async (uri, onSuccess, onFail) => {
  try {
    const res = await fetch(baseURL + uri, {
      headers: HEADERS,
      credentials: "include",
    });

    if (!res.ok) {
      onFail(res);
      return;
    }

    onSuccess(res);
  } catch (error) {
    onFail({ message: "Network or Server error" });
  }
};

export const post = async (uri, reqData, onSuccess, onFail) => {
  try {
    const res = await fetch(baseURL + uri, {
      method: "POST",
      headers: HEADERS,
      credentials: "include",
      body: JSON.stringify(reqData),
    });

  if (!res.ok) {
    onFail(res);
    return;
  }

    onSuccess(res);
  } catch (error) {
    onFail({ message: "Network or Server error" });
  }
};

export const put = async (uri, reqData, onSuccess, onFail) => {
  try {
    const res = await fetch(baseURL + uri, {
      method: "PUT",
      headers: HEADERS,
      credentials: "include",
      body: JSON.stringify(reqData),
    });

  if (!res.ok) {
    onFail();
    return;
  }

    onSuccess(res);
  } catch (error) {
    onFail({ message: "Network or Server error" });
  }
};

export const del = async (uri, onSuccess, onFail) => {
  try {
    const res = await fetch(baseURL + uri, {
      method: "DELETE",
      headers: HEADERS,
      credentials: "include",
    });

  if (!res.ok) {
    onFail();
    return;
  }

    onSuccess(res);
  } catch (error) {
    onFail({ message: "Network or Server error" });
  }
};
