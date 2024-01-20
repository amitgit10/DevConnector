import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../slices/postSlice";

const PostForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost({ text }));
    setText("");
  };
  return (
    <div className="post-form">
      <div className="post-form-header bg-primary">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1" onSubmit={(e) => onSubmit(e)}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input type="submit" value="Post" className="btn btn-dark my-1" />
      </form>
    </div>
  );
};

export default PostForm;
