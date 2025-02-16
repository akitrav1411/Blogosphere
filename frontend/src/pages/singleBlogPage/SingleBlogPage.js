import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments, saveCommentToDb } from "../../store/reducer/commentSlice";
import { useLocation } from "react-router-dom";
import { Button } from "../../components";
import { apiCalling } from "../../utils";

export const SingleBlogPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [blogData, setBlogData] = useState();
  const [commentReply, setCommentReply] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const { comments } = useSelector((state) => state.comments);

  const getBlogData = async () => {
    const blogId = location.pathname.split("blog/")[1];
    const blogData = await apiCalling("get", `/blogs/${blogId}`);
    setBlogData(blogData);
  };

  useEffect(() => {
    getBlogData();
  }, []);
  console.log(blogData);

  // const handleReplySubmit = (parentId) => {
  //   const user = sessionStorage.getItem("user");
  //   const commentEntry = {
  //     blogId,
  //     parentId,
  //     createdBy: user._id,
  //     comment: commentReply,
  //   };
  //   dispatch(saveCommentToDb({ commentEntry }));
  //   setCommentReply(null);
  // };
  return (
    <div className="wrapper">
      <ul>
        {blogData.blogComments?.map((comment) => (
          <li>
            <h3>{comment?.comment}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};
