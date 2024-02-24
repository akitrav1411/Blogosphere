import { useEffect, useState } from "react";
import { Liked, vk } from "../../assets";
import { Image, Loader } from "../../components";
import { apiCalling, getFormattedDate } from "../../utils";
import classes from "./UserProfile.module.css";
import { useSelector } from "react-redux";
export const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({});
  const { userDetail, userBlogs } = userInfo;
  const {
    user: { _id },
  } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await apiCalling("get", `/user/${_id}`);
        setUserInfo(res);
        return;
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserDetails();
  }, [_id]);

  return userDetail ? (
    <div className={`${classes["profile-container"]} wrapper`}>
      <div className={classes["side-bar"]}>
        <div className={classes["profile-image-container"]}>
          <Image className={classes["image"]} src={vk} />
        </div>
        <h3 className={classes["user-info"]}>{userDetail.username}</h3>
        <h3 className={classes["user-info"]}>{userDetail.email}</h3>
        <h3 className={classes["user-info"]}>
          {getFormattedDate(userDetail.dob)}
        </h3>
        <div className={classes["popular-blogs-container"]}>
          <h2 className={classes["blog-title"]}>Popular Blogs</h2>
          <div className={classes["popular-blogs"]}>
            {userBlogs.map((blog) => (
              <div className={classes["popular-blog"]} key={blog._id}>
                <h3 className={classes["popular-blog-title"]}>{blog.title}</h3>
                <div className={classes["Liked-btn"]}>
                  <Image className={classes["info-img"]} src={Liked}></Image>
                  <p>
                    {blog.likes > 1000
                      ? (Math.abs(blog.likes) / 1000).toFixed(1) + "k"
                      : blog.likes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={classes["profile-details"]}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
            alignItems: "center ",
          }}
        >
          <hr></hr>
          <hr></hr>
        </div>
        <h2
          className={classes["user-info"]}
        >{`${userDetail.firstname} ${userDetail.lastname}`}</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
            alignItems: "center ",
          }}
        >
          <hr></hr>
          <hr></hr>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};
