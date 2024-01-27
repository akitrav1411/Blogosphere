import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userSlice";
import { blogReducer } from "./reducer/blogSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogReducer,
  },
});
export default store;
