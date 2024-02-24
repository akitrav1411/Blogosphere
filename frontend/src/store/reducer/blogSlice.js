import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCalling } from "../../utils";
import { toast } from "react-toastify";

export const trendingBlogs = createAsyncThunk(
  "Blogs/trendingBlogs",
  async (object, { rejectWithValue }) => {
    try {
      const result = await apiCalling("get", "/blogs", {}, { trending: true });
      return result;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
export const userBlogs = createAsyncThunk(
  "Blogs/userBlogs",
  async (object, { rejectWithValue }) => {
    try {
      const result = await apiCalling("get", "/blogs", {}, object);
      return result;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
export const getAllBlogs = createAsyncThunk(
  "Blogs/allBlogs",
  async (object, { rejectWithValue }) => {
    try {
      const res = await apiCalling("get", "/blogs", {}, object);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const saveBlogsToDb = createAsyncThunk(
  "Blogs/saveBlogsToDb",
  async (object, { rejectWithValue }) => {
    try {
      const { blogEntry, onSuccess } = object;
      const result = await apiCalling("post", "/blogs/create", blogEntry);
      toast.success("Blog saved successfully");
      if (onSuccess) onSuccess();
      return result;
    } catch (err) {
      const { response } = err;
      const { data } = response || {};
      toast.error(data || "Something went wrong, try again!");
      return rejectWithValue(err);
    }
  }
);
const blogSlice = createSlice({
  name: "Blogs",
  initialState: {
    trending: [],
    blogs: [],
    blogCount: 0,
  },
  reducers: {
    toggleLike: (state, { payload: { blogId } }) => {
      ["blogs", "trending"].forEach((key) => {
        state[key] = state[key].map((blog) => {
          if (blog._id === blogId) {
            return {
              ...blog,
              isLiked: !blog.isLiked,
              likes: blog.isLiked ? blog.likes - 1 : blog.likes + 1,
            };
          } else {
            return blog;
          }
        });
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(trendingBlogs.fulfilled, (state, { payload }) => {
      state.trending = payload;
    });
    builder.addCase(userBlogs.fulfilled, (state, { payload }) => {
      state.blogs = payload?.res || [];
      state.blogCount = payload?.totalcount || 0;
    });
    builder.addCase(getAllBlogs.fulfilled, (state, { payload }) => {
      state.blogs = payload?.res || [];
      state.blogCount = payload?.totalcount || 0;
      // console.log(state.blogCount);
    });
  },
});
export const { toggleLike } = blogSlice.actions;
export const blogReducer = blogSlice.reducer;
