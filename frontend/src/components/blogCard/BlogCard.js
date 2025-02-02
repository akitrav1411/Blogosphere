import { useState } from "react";
import { Liked, Read, ThreeDots, Unliked } from "../../assets";
import { Button } from "../button";
import { Image } from "../image";
import classes from "./blogCard.module.css";
import { useDispatch } from "react-redux";
import { toggleLike } from "../../store/reducer/blogSlice";
import { apiCalling, getFormattedDate } from "../../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const BlogCard = (props) => {
  const { blog, action, handleheadingdata } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const {
    createdAt,
    createdBy,
    content,
    title,
    isLiked,
    likes,
    readTime,
    tags: tagsArray,
  } = blog;

  const handleLikeClick = async () => {
    try {
      const res = await apiCalling("put", `/blogs/toggleLike/${blog._id}`);
      if (res.success) dispatch(toggleLike({ blogId: blog._id }));
    } catch (error) {
      console.log("err", error.message);
    }
  };

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
      handleheadingdata();
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    }
  };
  return (
    <>
      <div
        className={`${classes["blog-card"]} ${
          action ? classes["column"] : null
        }`}
      >
        <div
          className={classes["blog-img"]}
          style={{
            backgroundImage: `url(${
              blog.img
                ? blog.img
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-S-3usroBngWIFb_HPtfEsAlCaVzcuRgixmS2EleNTQ&s"
            })`,
          }}
        ></div>
        <div className={classes["blog-content"]}>
          <div className={classes["title-read"]}>
            <h4 className={classes["title"]}>{title}</h4>
            <p className={classes.username}>~{createdBy.username}</p>
          </div>
          <p
            style={{
              textAlign: "left",
              padding: "0 1rem",
              marginTop: "0.5rem",
            }}
          >
            {getFormattedDate(createdAt)}
          </p>
          <p className={classes.content}>{content}</p>
          <div className={`tags-container ${classes["tags-container"]}`}>
            {tagsArray.slice(0, 3).map((tag) => (
              <p key={tag._id} className="single-tag">
                {tag.tag}
              </p>
            ))}
          </div>
          <div className={classes.btnContainer}>
            <div className={classes.info}>
              <button className={classes["btn"]} onClick={handleLikeClick}>
                <Image
                  className={classes["info-img"]}
                  src={isLiked ? Liked : Unliked}
                ></Image>
                <p>
                  {likes > 1000
                    ? (Math.abs(likes) / 1000).toFixed(1) + "k"
                    : likes}
                </p>
              </button>
              <button className={classes["btn"]}>
                <Image className={classes["info-img"]} src={Read}></Image>
                <p>{readTime}min</p>
              </button>
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
            </div>

            <Button
              onClick={() => navigate(`/blog/${blog._id}`)}
              className={classes["read-morebtn"]}
            >
              Read more
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
