import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  issueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Issue"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  message: String
}, { timestamps: true });

export default mongoose.model("Comment", commentSchema);
