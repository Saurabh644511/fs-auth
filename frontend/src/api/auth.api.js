const BASE = "http://localhost:5000/api";

export const apiPost = async (path, body) => {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
};

export const apiGet = async (path, token) => {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
};

export const apiGetVerify = async (token) => {
  const res = await fetch(`${BASE}/auth/verify/${token}`);
  const data = await res.json();
  return { ok: res.ok, data };
};
