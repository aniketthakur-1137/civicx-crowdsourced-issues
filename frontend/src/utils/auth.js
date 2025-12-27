// utils/auth.js
// Handles authentication using LocalStorage (same logic as original auth.js)

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


export const getIssueStats = () => {
  return API.get("/issues/stats");
};

export const getMyIssueStats = async () => {
  const res = await API.get("/issues/my-stats");
  return res.data;
};

export const authorityUpdateIssue = async (id, data) => {
  const res = await API.put(`/issues/authority/${id}`, data);
  return res.data;
};


// Token auto attach
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// 🔐 AUTH
export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;   // ✅ VERY IMPORTANT
};

export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;   // ✅ VERY IMPORTANT
};

// 👤 USER
export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

// 🏙️ ISSUES
export const createIssue = async (data) => {
  const res = await API.post("/issues", data);
  return res.data;
};

export const getIssues = async () => {
  const res = await API.get("/issues");
  return res.data;
};

export default API;


export const getMyIssues = async () => {
  const res = await API.get("/issues/my");
  return res.data;
};

export const deleteIssue = async (id) => {
  const res = await API.delete(`/issues/${id}`);
  return res.data;
};

export const deleteAccount = async () => {
  const res = await API.delete("/auth/delete");
  return res.data;
};


export const getPublicStats = async () => {
  const res = await API.get("/issues/public-stats");
  return res.data;
};


export const addIssueComment = async (issueId, text) => {
  const res = await API.post(`/issues/${issueId}/comment`, { text });
  return res.data;
};



































