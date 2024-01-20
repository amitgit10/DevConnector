import React from "react";
import { Link } from "react-router-dom";
import time from "../../utils/formatTime";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../../slices/postSlice";

const PostItem = ({
  post: { name, text, likes, avatar, _id, user, comments, date },
  showActions,
}) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className="post bg-white my-1 p-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on&nbsp;
          {time(date)}
        </p>
        {showActions && (
          <>
            <button
              onClick={() => dispatch(likePost(_id))}
              type="button"
              className="btn">
              <i className="fas fa-thumbs-up fa-lg"></i>&nbsp;
              {likes.length > 0 && <b>{likes.length}</b>}
            </button>

            <Link to={`/post/${_id}`} className="btn btn-primary">
              <i className="fa-solid fa-comment fa-lg"></i>
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>

            {!auth.loading && user === auth.user._id && (
              <button
                onClick={() => dispatch(deletePost(_id))}
                type="button"
                className="btn btn-danger">
                <i className="fa-solid fa-trash fa-lg"></i>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
PostItem.defaultProps = {
  showActions: true,
};

export default PostItem;
