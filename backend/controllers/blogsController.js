import { statusMessages } from "../config/statusMessages.js";
import { Blog } from "../models/index.js";
import { ObjectId } from "mongodb";
const getAllBlogs = async (req) => {
  try {
    const {
      trending = false,
      isDeleted = false,
      isPublished = true,
    } = req.query;
    const condition = { isDeleted: false, isPublished: true };
    if (JSON.parse(trending)) {
      const result = await Blog.aggregate([
        {
          $match: { ...condition },
        },
        {
          $lookup: {
            from: "users",
            localField: "createdBy",
            foreignField: "_id",
            as: "createdBy",
          },
        },

        {
          $unwind: "$createdBy",
        },
        {
          $addFields: {
            readTime: {
              $ceil: {
                $divide: [{ $size: { $split: ["$content", " "] } }, 238],
              },
            },
            likes: { $size: "$likedBy" },
            isLiked: {
              $cond: [
                { $in: [ObjectId(req.user._id), "$likedBy"] },
                true,
                false,
              ],
            },
          },
        },
        {
          $sort: {
            likes: -1,
          },
        },
        {
          $limit: 6,
        },
      ]);
      return result;
    }
    const { _id } = req.user;
    condition.createdBy = new ObjectId(_id);
    if (JSON.parse(isDeleted)) {
      condition.isDeleted = true;
    }
    if (!JSON.parse(isPublished)) condition.isPublished = false;
    const res = await Blog.aggregate([
      {
        $match: { ...condition },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy",
        },
      },
      {
        $unwind: "$createdBy",
      },
      {
        $addFields: {
          readTime: {
            $ceil: {
              $divide: [{ $size: { $split: ["$content", " "] } }, 238],
            },
          },
        },
      },
      {
        $sort: {
          likedCount: -1,
        },
      },
    ]);
    return res;
  } catch (error) {
    throw error;
  }
};

const createBlog = async (req) => {
  try {
    const { body, user } = req;
    const { _id } = user;
    const { title, content, isPublished, isDeleted, image } = body;
    const newBlog = new Blog({
      title,
      content,
      isDeleted,
      isPublished,
      createdBy: _id,
      createdAt: new Date(),
      likedCount: 0,
      image,
    });
    await newBlog.save();
    return { ...newBlog.toJSON() };
  } catch (err) {
    console.log(err, statusMessages.BLOG_SAVE_FAILURE);
    throw err;
  }
};
const updateBlog = async (req, res) => {
  try {
    const { body } = req;
    const { id } = body;
    const { isDeleted, isPublished } = body;
    const updatedFields = {};
    if (isDeleted !== undefined) updatedFields.isDeleted = isDeleted;
    if (isPublished !== undefined) updatedFields.isPublished = isPublished;
    const savedBlog = await Blog.findOneAndUpdate(
      new ObjectId(id),
      updatedFields,
      {
        new: true,
      }
    );
    return { ...savedBlog.toJSON() };
  } catch (err) {
    console.log(err, statusMessages.BLOG_UPDATE_FAILURE);
    throw err;
  }
};

export const toggleLike = async (req, res) => {
  const { _id } = req.user;
  const hasLiked = db.blogs.findOne({
    _id: documentId,
    $in: [_id, "$likedBy"],
  });
  console.log(hasLiked);
};
export { getAllBlogs, createBlog, updateBlog, toggleLike };
