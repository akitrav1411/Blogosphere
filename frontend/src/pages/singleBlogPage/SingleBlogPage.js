import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiCalling } from "../../utils";
import { saveCommentToDb } from "../../store/reducer/commentSlice";

export const SingleBlogPage = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [blogData, setBlogData] = useState();
  const [childComments, setChildComments] = useState();
  const [isSelectedComment, setIsSelectedComment] = useState();
  const [isSelectedForReply, setIsSelectedForReply] = useState();
  const [commentReply, setCommentReply] = useState("");

  const getBlogData = async () => {
    const blogId = location.pathname.split("blog/")[1];
    const blogData = await apiCalling("get", `/blogs/${blogId}`);
    setBlogData(blogData);
  };

  useEffect(() => {
    getBlogData();
  }, []);

  const handleViewReply = async (parentId) => {
    const res = await apiCalling("get", `/comments/${parentId}`);
    setChildComments(res);
  };
  const handleReplySubmit = (comment) => {
    const commentEntry = {
      blogId: comment.blogId,
      parentId: comment._id,
      comment: commentReply,
      createdBy: user._id,
    };
    dispatch(
      saveCommentToDb({
        commentEntry,
        onSuccess: () => {
          setCommentReply("");
          setIsSelectedForReply(null);
        },
      })
    );
  };

  return (
    <div className="wrapper">
      <ul>
        {blogData?.blogComments?.map((comment) => (
          <li key={comment._id}>
            <div>
              <h3>{comment.comment}</h3>
              <div>
                <button onClick={() => setIsSelectedForReply(comment._id)}>
                  Reply
                </button>
                {comment?.hasChildren && (
                  <button
                    onClick={() => {
                      setIsSelectedComment((prev) => {
                        if (prev) return null;
                        else {
                          handleViewReply(comment._id);
                          return comment._id;
                        }
                      });
                    }}
                  >
                    {isSelectedComment ? "Hide Replies" : "View Replies"}
                  </button>
                )}
              </div>
              {isSelectedForReply === comment._id && (
                <div>
                  <input
                    placeholder="reply here"
                    type="text"
                    value={commentReply}
                    onChange={(e) => setCommentReply(e.target.value)}
                  />
                  <button onClick={() => setIsSelectedForReply(null)}>
                    Cancel
                  </button>
                  {commentReply.trim().length > 0 ? (
                    <button onClick={() => handleReplySubmit(comment)}>
                      Submit
                    </button>
                  ) : null}
                </div>
              )}
              {isSelectedComment === comment._id ? (
                <ul>
                  {childComments?.map((childComment) => (
                    <li key={childComment._id}>{childComment.comment}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
