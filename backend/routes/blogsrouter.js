import express from "express";
import { handleResponse, verifyToken } from "../utils/index.js";
import {
  getAllBlogs,
  createBlog,
  updateBlog,
  toggleLike,
  getBlogDataById,
} from "../controllers/index.js";
const router = express.Router();
router.get("/blogs", verifyToken, handleResponse.bind(this, getAllBlogs));
router.post(
  "/blogs/create",
  verifyToken,
  handleResponse.bind(this, createBlog)
);
router.put("/blogs", verifyToken, handleResponse.bind(this, updateBlog));
router.put(
  "/blogs/toggleLike/:blogId",
  verifyToken,
  handleResponse.bind(this, toggleLike)
);
router.get(
  "/blogs/:blogId",
  handleResponse.bind(this, getBlogDataById)
);
export default router;
