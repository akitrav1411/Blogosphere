import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref: "blogs",
  },
  parentId: {
    type: Schema.Types.ObjectId,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: Date,
});
export const Comment = mongoose.model("comments", commentSchema);
