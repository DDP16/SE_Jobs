import { BE_ENPOINT } from "../../settings/localVar";

const HEADERS = {
  "Content-Type": "application/json",
  accept: "application/json",
};

export const get = async (uri, onSuccess, onFail) => {
  const res = await fetch(BE_ENPOINT + uri, {
    headers: HEADERS,
  });

  if (!res.ok) {
    onFail();
    return;
  }

  const data = await res.json();
  onSuccess(data);
};

export const post = async (uri, reqData, onSuccess, onFail) => {
  const res = await fetch(BE_ENPOINT + uri, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(reqData),
  });

  if (!res.ok) {
    onFail();
    return;
  }

  onSuccess(res);
};

export const put = async (uri, reqData, onSuccess, onFail) => {
  const res = await fetch(BE_ENPOINT + uri, {
    method: "PUT",
    headers: HEADERS,
    body: JSON.stringify(reqData),
  });

  if (!res.ok) {
    onFail();
    return;
  }

  const data = await res.json();
  onSuccess(data);
};

export const del = async (uri, onSuccess, onFail) => {
  const res = await fetch(BE_ENPOINT + uri, {
    method: "DELETE",
    headers: HEADERS,
  });

    if (!res.ok) {
    onFail();
    return;
  }

  const data = await res.json();
  onSuccess(data);
};
