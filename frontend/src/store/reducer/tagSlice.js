import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCalling } from "../../utils";

export const allTags = createAsyncThunk(
  "allTags/tagSlice",
  async (object, { rejectWithValue }) => {
    try {
      const res = apiCalling("get", "/tags");
      return res;
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);
const tagSlice = createSlice({
  name: "tags",
  initialState: {
    tags: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allTags.fulfilled, (state, { payload }) => {
      state.tags = payload;
    });
  },
});
export const tagReducer = tagSlice.reducer;
