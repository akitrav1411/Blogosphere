import { statusMessages } from "../config/statusMessages.js";
import { Comment } from "../models/comments.js";
import { ObjectId } from "mongodb";

const createComment = async (req, res) => {
  try {
    const { body } = req;
    console.log(body);
    const newComment = new Comment({
      ...body,
      blogId: new ObjectId(body.blogId),
      createdBy: new ObjectId(body.createdBy),
      createdAt: new Date(),
    });
    await newComment.save();
    return { ...newComment.toJSON() };
  } catch (err) {
    console.log(statusMessages.COMMENT_SAVE_FAILURE, err);
    throw err;
  }
};

const getAllComments = async (req, res) => {
  try {
    const { parentId, blogId } = req.query;
    const response = await Comment.find({
      parentId: parentId ? new ObjectId(parentId) : null,
      blogId: blogId ? new ObjectId(blogId) : null,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

const getAllChildComments = async (req, res) => {
  try {
   const {commentId}=req.params;
   const response=await Comment.find({parentId:new ObjectId(commentId)})
   return response
  } catch (err) {
    throw err;
  }
};

export { createComment, getAllComments,getAllChildComments };
