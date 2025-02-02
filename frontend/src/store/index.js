import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userSlice";
import { blogReducer } from "./reducer/blogSlice";
import { tagReducer } from "./reducer/tagSlice";
import { commentReducer } from "./reducer/commentSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogReducer,
    tags: tagReducer,
    comments: commentReducer,
  },
});
export default store;
