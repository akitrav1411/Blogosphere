import { statusCodes } from "../config/statusCodes.js";
import { statusMessages } from "../config/statusMessages.js";
import { Blog, User } from "../models/index.js";
import { ObjectId } from "mongodb";
import { base64ToImage } from "../utils/others.js";
import { Comment } from "../models/comments.js";

const imagePath = "public/blogs/";

const parsedQuery = (query) => {
  let parsed = {};
  for (let key in query) {
    parsed[key] = JSON.parse(query[key]);
  }
  return parsed;
};
const addFields = (titleLength, contentLength, userID) => ({
  readTime: {
    $ceil: {
      $divide: [{ $size: { $split: ["$content", " "] } }, 238],
    },
  },
  content: {
    $cond: {
      if: { $gt: [{ $strLenCP: "$content" }, contentLength] },
      then: { $concat: [{ $substrCP: ["$content", 0, contentLength] }, "..."] },
      else: "$content",
    },
  },
  title: {
    $cond: {
      if: { $gt: [{ $strLenCP: "$title" }, titleLength] },
      then: { $concat: [{ $substrCP: ["$title", 0, titleLength] }, "..."] },
      else: "$title",
    },
  },
  likes: { $size: "$likedBy" },
  isLiked: {
    $cond: [{ $in: [new ObjectId(userID), "$likedBy"] }, true, false],
  },
});

const getAllBlogs = async (req) => {
  try {
    const query = parsedQuery(req.query);
    const {
      trending = false,
      isDeleted = false,
      isPublished = true,
      pageSize,
      pageIndex,
      allBlogs = false,
    } = query;
    const condition = { isDeleted: false, isPublished: true };
    if (trending) {
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
          $lookup: {
            from: "tags",
            localField: "tags",
            foreignField: "_id",
            as: "tags",
          },
        },
        {
          $addFields: addFields(100, 250, req.user._id),
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
    if (!allBlogs) {
      const { _id } = req.user;
      condition.createdBy = new ObjectId(_id);
    }
    if (isDeleted) {
      condition.isDeleted = true;
    }
    if (!isPublished) condition.isPublished = false;
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
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "_id",
          as: "tags",
        },
      },
      {
        $addFields: addFields(15, 200, req.user._id),
      },
      {
        $skip: (pageIndex - 1) * pageSize,
      },
      {
        $limit: pageSize,
      },
    ]);
    const totalcount = await Blog.countDocuments(condition);
    return { res, totalcount };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createBlog = async (req) => {
  try {
    const { body, user } = req;
    const { _id } = user;
    const { title, content, isPublished, isDeleted, image, tags } = body;
    const newBlog = new Blog({
      title,
      content,
      isDeleted,
      isPublished,
      createdBy: _id,
      createdAt: new Date(),
      likedCount: 0,
      tags,
    });
    const blogId = newBlog._id;
    const imageName = base64ToImage(image, blogId, imagePath);
    if (imageName) newBlog.image = imageName;
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

const toggleLike = async (req, res) => {
  try {
    const { _id } = req.user;
    const { blogId } = req.params;
    const { likedBy } = await Blog.findOne(
      {
        _id: new ObjectId(blogId),
      },
      { likedBy: 1 }
    );
    if (!likedBy)
      throw {
        status: statusCodes.INTERNAL_SERVER_ERROR,
        message: statusMessages.SERVER_ERROR,
      };
    let updatedLikedBy = [];
    if (likedBy.includes(_id)) {
      updatedLikedBy = likedBy.filter((userId) => userId != _id);
    } else {
      updatedLikedBy = [...likedBy, _id];
    }
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: new ObjectId(blogId) },
      { likedBy: updatedLikedBy }
    );
    return { ...updatedBlog.toJSON() };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getBlogDataById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blogRes = await Blog.findById(blogId).populate("createdBy");
    const blogComments = await Comment.find({
      blogId: blogId ? new ObjectId(blogId) : null,
    });
    return { ...blogRes?.toJSON(), blogComments };
  } catch (error) {
    console.log(error, statusMessages.FETCH_SINGLE_BLOG_FAILURE);
    throw error;
  }
};

export { getAllBlogs, createBlog, updateBlog, toggleLike, getBlogDataById };
