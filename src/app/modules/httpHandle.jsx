import { BE_ENPOINT } from "../../settings/localVar";

const HEADERS = {
  "Content-Type": "application/json",
  accept: "application/json",
};

export const get = async (uri, onSuccess, onFail) => {
  try {
    const res = await fetch(BE_ENPOINT + uri, {
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
    const res = await fetch(BE_ENPOINT + uri, {
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
    const res = await fetch(BE_ENPOINT + uri, {
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
    const res = await fetch(BE_ENPOINT + uri, {
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
