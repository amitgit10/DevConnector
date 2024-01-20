import React from "react";
import { Link } from "react-router-dom";
import time from "../../utils/formatTime";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../slices/postSlice";

const CommentItem = ({
  comment: { user, name, text, avatar, date, _id },
  postId,
}) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">Posted on {time(date)}</p>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => dispatch(deleteComment(postId, _id))}
            type="button"
            className="btn btn-danger">
            <i className="fa-solid fa-trash fa-lg"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
