import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../slices/postSlice";
import { useParams } from "react-router-dom";

const CommentForm = ({ post_id }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(post_id, { text }));
    setText("");
  };
  return (
    <form className="form my-1" onSubmit={(e) => onSubmit(e)}>
      <textarea
        name="text"
        cols="30"
        rows="5"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Comment on this post"></textarea>
      <input type="submit" className="btn btn-dark my-1" value="Comment" />
    </form>
  );
};

export default CommentForm;
