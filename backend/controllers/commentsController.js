import { Comment } from "../models/comments";

const getCommentsOfBlog = async (req, res) => {
  const { blogId } = req.params;
  const res = await Comment.aggregate([
    {
      $match: {
        blogId,
      },
    },
    {
      $group: {
        _id: "$parentId",
      },
    },
  ]);
};
const createComment = async (req, res) => {
  const { body } = req;
};
