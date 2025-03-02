import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCalling } from "../../utils";
import { toast } from "react-toastify";

export const getComments = createAsyncThunk(
  "Comments/getComments",
  async (object, { rejectWithValue }) => {
    try {
      const result = await apiCalling("get", "/comments", null, object);
      return { res: result };
    } catch (err) {
      const { response } = err;
      const { data } = response || {};
      toast.error(data || "Something went wrong, try again!");
      return rejectWithValue(err);
    }
  }
);

export const saveCommentToDb = createAsyncThunk(
  "Comments/saveCommentToDb",
  async (object, { rejectWithValue }) => {
    try {
      const { commentEntry, onSuccess } = object || {};
      const result = await apiCalling("post", "/comments", commentEntry, null);
      toast.success("Comment saved successfully");
      if (onSuccess) onSuccess();
    } catch (err) {
      const { response } = err;
      const { data } = response || {};
      toast.error(data || "Something went wrong, try again!");
      return rejectWithValue(err);
    }
  }
);
const commentSlice = createSlice({
  name: "Comments",
  initialState: {
    comments: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getComments.fulfilled, (state, { payload }) => {
      state.comments = payload?.res || [];
    });
  },
});

export const commentReducer = commentSlice.reducer;
