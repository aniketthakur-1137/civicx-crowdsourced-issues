// utils/auth.js
// Handles authentication using LocalStorage (same logic as original auth.js)

import axios from "axios";

const base = import.meta.env.VITE_API_URL;

if (!base) {
  throw new Error("❌ VITE_API_URL is not defined in environment variables");
}

const API = axios.create({
  baseURL: `${base}/api`,
});



export const getIssueStats = () => {
  try{
  return API.get("/issues/stats");
  }catch (err) {
    console.error("getIssueStats error:", err);
    return []; // fallback or handle error gracefully
  }
};

export const getMyIssueStats = async () => {
  try{
  const res = await API.get("/issues/my-stats");
  return res.data;
  }catch (err) {
    console.error("getMyIssueStats error:", err);
    return []; // fallback or handle error gracefully
  }
};

export const authorityUpdateIssue = async (id, data) => {
  try{
  const res = await API.put(`/issues/authority/${id}`, data);
  return res.data;
  }catch (err) {
    console.error("authorityUpdateIssue error:", err);
    return []; // fallback or handle error gracefully
  }
};


// Token auto attach
API.interceptors.request.use((req) => {
  try{
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;}catch (err) {
    console.error("API.intercepter.request.user error:", err);
    return []; // fallback or handle error gracefully
  }
});

// 🔐 AUTH
export const registerUser = async (data) => {
  try{
  const res = await API.post("/auth/register", data);
  return res.data;   // ✅ VERY IMPORTANT
  }catch (err) {
    console.error("registerUser error:", err);
    return []; // fallback or handle error gracefully
  }
};

export const loginUser = async (data) => {
  try{
  const res = await API.post("/auth/login", data);
  return res.data;   // ✅ VERY IMPORTANT
  }catch (err) {
    console.error("loginUser error:", err);
    return []; // fallback or handle error gracefully
  }
};

// 👤 USER
export const logoutUser = () => {
  try{
  localStorage.removeItem("token");
  }catch (err) {
    console.error("logoutUser error:", err);
    return []; // fallback or handle error gracefully
  }
};

export const getToken = () => {
  try{
  return localStorage.getItem("token");
  }catch (err) {
    console.error("getToken error:", err);
    return []; // fallback or handle error gracefully
  }
};

// 🏙️ ISSUES
export const createIssue = async (data) => {
  try{
  const res = await API.post("/issues", data);
  return res.data;}catch (err) {
    console.error("createIssue error:", err);
    return []; // fallback or handle error gracefully
  }
};

export const getIssues = async () => {
  try{
  const res = await API.get("/issues");
  return res.data;}
catch (err) {
    console.error("getIssues error:", err);
    return []; // fallback or handle error gracefully
  }
};

export default API;


export const getMyIssues = async () => {
  try{
  const res = await API.get("/issues/my");
  return res.data;}catch (err) {
    console.error("getMyIssues error:", err);
    return []; // fallback or handle error gracefully
  }
};

export const deleteIssue = async (id) => {
  try{
  const res = await API.delete(`/issues/${id}`);
  return res.data;}catch (err) {
    console.error("deleteIssue error:", err);
    return []; // fallback or handle error gracefully
  }
};

export const deleteAccount = async () => {
  try{
  const res = await API.delete("/auth/delete");
  return res.data;}catch (err) {
    console.error("deleteAccount error:", err);
    return []; // fallback or handle error gracefully
  }
};


export const getPublicStats = async () => {
  try{
  const res = await API.get("/issues/public-stats");
  return res.data;
  }catch (err) {
    console.error( err);
    return []; // fallback or handle error gracefully
  }
};


export const addIssueComment = async (issueId, text) => {
  try{
  const res = await API.post(`/issues/${issueId}/comment`, { text });
  return res.data;
  }catch (err) {
    console.error("addIssueComment:", err);
    return []; // fallback or handle error gracefully
  }
};



































