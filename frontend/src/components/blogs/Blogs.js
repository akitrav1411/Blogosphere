import classes from "./Blogs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { BlogCard, Header, NotFound, Pagination } from "../../components";
import { Published, Deleted, Unpublished } from "../../assets";
import { useCallback, useEffect, useState } from "react";
import { userBlogs } from "../../store/reducer/blogSlice";

export const Blogs = (props) => {
  const { heading } = props;

  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(1);
  const { blogs, blogCount } = useSelector((state) => state.blogs);
  const pages = Math.ceil(blogCount / 10);
  const handlePageIndex = (val) => {
    setPageIndex((prev) => prev + val);
  };
  const handleheadingdata = useCallback(() => {
    heading === "Published"
      ? dispatch(
          userBlogs({
            isPublished: true,
            isDeleted: false,
            pageIndex,
            pageSize: 10,
          })
        )
      : heading === "Unpublished"
      ? dispatch(
          userBlogs({
            isPublished: false,
            isDeleted: false,
            pageIndex,
            pageSize: 10,
          })
        )
      : dispatch(
          userBlogs({
            isDeleted: true,
            isPublished: false,
            pageIndex,
            pageSize: 10,
          })
        );
  }, [heading, dispatch, pageIndex]);

  useEffect(() => {
    handleheadingdata();
  }, [handleheadingdata]);

  return (
    <div className={`${classes["trending"]} wrapper`}>
      <Header
        imgsrc={
          props.heading === "Published"
            ? `${Published}`
            : props.heading === "Unpublished"
            ? `${Unpublished}`
            : `${Deleted}`
        }
        content={props.heading}
      />

      <div className={`${classes["blogs-container"]}`}>
        {blogs ? (
          blogs.map((blog, index) => (
            <BlogCard
              key={index}
              blogCount={blogCount}
              blog={blog}
              index={index}
              heading={heading}
              handleheadingdata={handleheadingdata}
              action={
                heading === "Unpublished"
                  ? ["Publish", "Delete", "Edit"]
                  : heading === "Published"
                  ? ["Unpublish", "Delete"]
                  : ["Restore"]
              }
            />
          ))
        ) : (
          <NotFound heading="Blogs"></NotFound>
        )}
      </div>
      {!!blogs.length && (
        <Pagination
          pageIndex={pageIndex}
          handlePageIndex={handlePageIndex}
          pages={pages}
        />
      )}
    </div>
  );
};
