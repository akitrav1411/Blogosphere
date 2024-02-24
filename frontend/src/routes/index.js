import { createBrowserRouter } from "react-router-dom";
import {
  CreateBlog,
  HomePage,
  MyBlogs,
  Register,
  SingleBlogPage,
  UserProfile,
} from "../pages";
import Layout from "../components/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Register isLogin />,
      },
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/myblogs",
        element: <MyBlogs />,
      },
      {
        path: "/create",
        element: <CreateBlog />,
      },
      {
        path: "/edit/:id",
        element: <CreateBlog />,
      },
      {
        path: "/blog/:id",
        element: <SingleBlogPage />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
    ],
  },
]);
export default router;
