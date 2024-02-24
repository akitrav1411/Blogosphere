import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userSlice";
import { blogReducer } from "./reducer/blogSlice";
import { tagReducer } from "./reducer/tagSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogReducer,
    tags: tagReducer,
  },
});
export default store;
