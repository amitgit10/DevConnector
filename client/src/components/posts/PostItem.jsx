import React from "react";
import { Link } from "react-router-dom";
import time from "../../utils/formatTime";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../../slices/postSlice";

const PostItem = ({
  post: { name, text, likes, avatar, _id, user, comments, date },
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
          {time(date, { year: "numeric", month: "numeric", day: "numeric" })}
        </p>
        <button
          onClick={() => dispatch(likePost(_id))}
          type="button"
          className="btn">
          <i className="fas fa-thumbs-up"></i>&nbsp;
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>

        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion&nbsp;
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>

        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => dispatch(deletePost(_id))}
            type="button"
            className="btn btn-danger">
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default PostItem;
