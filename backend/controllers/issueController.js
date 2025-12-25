import Issue from "../models/Issue.js";


export const getIssueStats = async (req, res) => {
  try {
    const total = await Issue.countDocuments();

    const pending = await Issue.countDocuments({ status: "pending" });
    const inProgress = await Issue.countDocuments({ status: "in-progress" });
    const resolved = await Issue.countDocuments({ status: "resolved" });

    res.status(200).json({
      total,
      pending,
      inProgress,
      resolved,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch issue stats" });
  }
};

export const createIssue = async (req, res) => {
    try{
  const issue = await Issue.create({
    
    title: req.body.title,
      description: req.body.description,
      category: req.body.category || "General",
      location: req.body.location,
     image: req.file ? `/uploads/${req.file.filename}` : null,
   reportedBy: req.user.id || req.user._id

  });
  res.status(201).json(issue);
   } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create issue",
    });
  }
};

export const getIssues = async (req, res) => {
  const issues = await Issue.find().populate("reportedBy", "name");
  res.json(issues);
};

export const updateStatus = async (req, res) => {
  const issue = await Issue.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(issue);
};


export const getMyIssueStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const total = await Issue.countDocuments({ reportedBy: userId });
    const pending = await Issue.countDocuments({
      reportedBy: userId,
      status: "pending",
    });
    const inProgress = await Issue.countDocuments({
      reportedBy: userId,
      status: "in-progress",
    });
    const resolved = await Issue.countDocuments({
      reportedBy: userId,
      status: "resolved",
    });

    res.json({
      total,
      pending,
      inProgress,
      resolved,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user issue stats" });
  }
};

// ✅ Get logged-in user's issues
export const getMyIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ reportedBy: req.user.id })
      .populate("comments.by", "name role") // ✅ VERY IMPORTANT
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch my issues" });
  }
};


// ❌ Delete logged-in user's issue
export const deleteMyIssue = async (req, res) => {
  try {
    const issue = await Issue.findOne({
      _id: req.params.id,
      reportedBy: req.user.id
    });

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    await issue.deleteOne();
    res.json({ message: "Issue deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

// 🌍 Public stats for Home page
export const getPublicStats = async (req, res) => {
  try {
    const total = await Issue.countDocuments();
    const resolved = await Issue.countDocuments({ status: "resolved" });

    const satisfaction =
      total === 0 ? 0 : Math.round((resolved / total) * 100);

    res.json({
      total,
      resolved,
      satisfaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch public stats" });
  }
};


// 📝 Authority adds comment
export const addIssueComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text required" });
    }

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    issue.comments.push({
      text,
      commentedBy: req.user.id, // ✅ CORRECT FIELD
    });

    await issue.save();

    res.json({ message: "Comment added", issue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add comment" });
  }
};


export const authorityUpdateIssue = async (req, res) => {
  try {
    const { status, comment } = req.body;

    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    if (status) {
      issue.status = status;
    }

    if (comment) {
      issue.comments.push({
        text: comment,
        commentedBy: req.user.id,
      });
    }

    await issue.save();
    res.json(issue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Authority update failed" });
  }
};
