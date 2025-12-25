import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorityOnly from "../middleware/authorityOnly.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  createIssue,
  getIssues,
  updateStatus,
  getIssueStats,
  getMyIssueStats,
  getMyIssues,
  deleteMyIssue,
  addIssueComment,
  getPublicStats,
} from "../controllers/issueController.js";

const router = express.Router();

/* =========================
   CITIZEN ROUTES
========================= */
router.post("/", protect, upload.single("image"), createIssue);
router.get("/my", protect, getMyIssues);
router.get("/my-stats", protect, getMyIssueStats);
router.delete("/:id", protect, deleteMyIssue);

/* =========================
   AUTHORITY ROUTES
========================= */
router.put("/:id/status", protect, authorityOnly, updateStatus);
router.post("/:id/comment", protect, authorityOnly, addIssueComment);

/* =========================
   PUBLIC ROUTES
========================= */
router.get("/", getIssues);
router.get("/stats", getIssueStats);
router.get("/public-stats", getPublicStats);

export default router;
