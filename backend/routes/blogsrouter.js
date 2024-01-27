import express from "express";
import { handleResponse, verifyToken } from "../utils/index.js";
import { getAllBlogs, createBlog, updateBlog } from "../controllers/index.js";
const router = express.Router();
router.get("/blogs", verifyToken, handleResponse.bind(this, getAllBlogs));
router.post(
  "/blogs/create",
  verifyToken,
  handleResponse.bind(this, createBlog)
);
router.put("/blogs", verifyToken, handleResponse.bind(this, updateBlog));
export default router;
