import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../../store/reducer/blogSlice";
import { BlogCard } from "../blogCard";
import classes from "./allBlogs.module.css";
import { AllTags } from "../allTags";
import { Pagination } from "../pagination";

export const AllBlogs = () => {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(1);
  const { blogs, blogCount } = useSelector((state) => state.blogs);
  const pages = Math.ceil(blogCount / 10);
  const handlePageIndex = (val) => {
    setPageIndex((prev) => prev + val);
  };
  useEffect(() => {
    dispatch(
      getAllBlogs({
        isPublished: true,
        isDeleted: false,
        pageIndex,
        pageSize: 10,
        allBlogs: true,
      })
    );
  }, [dispatch, pageIndex]);

  return (
    <div className={`${classes["parent-container"]} wrapper`}>
      <div className={classes.allblogs}>
        {blogs.map((blog) => (
          <BlogCard blog={blog} key={blog._id} />
        ))}
        <Pagination
          pageIndex={pageIndex}
          handlePageIndex={handlePageIndex}
          pages={pages}
        />
      </div>
      <AllTags />
    </div>
  );
};
