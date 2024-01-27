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
    blogs: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(trendingBlogs.fulfilled, (state, action) => {
      const { payload } = action;
      state.blogs.trending = payload;
    });
    builder.addCase(trendingBlogs.rejected, (state, action) => {});
    builder.addCase(trendingBlogs.pending, (state, action) => {});
    builder.addCase(userBlogs.fulfilled, (state, action) => {
      const { payload } = action;
      state.blogs.userBlog = payload;
    });
    builder.addCase(userBlogs.rejected, (state, action) => {});
    builder.addCase(userBlogs.pending, (state, action) => {});
    // builder.addCase(saveBlogsToDb.fulfilled, (state, action) => {
    //   const { payload } = action;
    //   console.log(payload);
    // });
  },
});
export const blogReducer = blogSlice.reducer;
