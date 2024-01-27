import { useState } from "react";
import { ThreeDots, vk } from "../../assets";
import { Button } from "../button";
import { Image } from "../image";
import classes from "./blogCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userBlogs } from "../../store/reducer/blogSlice";
import { apiCalling } from "../../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function getFormattedDate(dateString) {
  const inputDate = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = inputDate.toLocaleDateString("en-US", options);
  return formattedDate;
}
const showUpdatedData = (heading, dispatch) => {
  heading === "Published"
    ? dispatch(
        userBlogs({
          isPublished: true,
        })
      )
    : heading === "Unpublished"
    ? dispatch(
        userBlogs({
          isPublished: false,
        })
      )
    : dispatch(
        userBlogs({
          isDeleted: true,
        })
      );
};
export const BlogCard = (props) => {
  const { blog, action, heading } = props;
  const { createdAt, createdBy, content } = blog;
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const date = getFormattedDate(createdAt);
  const actionHandler = async (type) => {
    try {
      let payload = { id: blog._id };
      if (type === "Publish") {
        payload.isPublished = true;
        const res = await apiCalling("put", "/blogs", payload);
        if (res.success) toast.success("Published successfully");
      } else if (type === "Delete") {
        payload.isDeleted = true;
        payload.isPublished = false;
        const res = await apiCalling("put", "/blogs", payload);
        if (res.success) toast.success("Deleted successfully");
      } else if (type === "Unpublish") {
        payload.isPublished = false;
        const res = await apiCalling("put", "/blogs", payload);
        if (res.success) toast.success("Unpublished successfully");
      } else if (type === "Restore") {
        payload.isDeleted = false;
        const res = await apiCalling("put", "/blogs", payload);
        if (res.success) toast.success("Restored successfully");
      } else {
        navigate(`/edit/${blog._id}`);
      }
      showUpdatedData(heading, dispatch);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    }
  };
  return (
    <div className={classes["blog-card"]}>
      <div className={classes["blog-img"]}>
        <Image src={blog.img ? blog.img : vk} />
      </div>
      <div className={classes.user}>
        <div className={classes["created-at"]}>{date}</div>
        <div>~{createdBy.username}</div>
      </div>
      <div className={classes.content}>{content.substring(0, 100)} ...</div>
      <div className={classes.btnContainer}>
        {action && (
          <div
            onClick={() => setShowDropdown((prev) => !prev)}
            className={classes["three-dots"]}
          >
            <Image src={ThreeDots} />
            {showDropdown && (
              <div className={classes.dropdown}>
                {action.map((val, index) => (
                  <p key={index} onClick={() => actionHandler(val)}>
                    {val}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        <Button className={classes["read-morebtn"]}>Read more</Button>
      </div>
    </div>
  );
};
