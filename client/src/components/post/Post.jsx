import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchPost } from "../../slices/postSlice";
import PostItem from "../posts/PostItem";
import Spinner from "../layout/Spinner";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = () => {
  const dispatch = useDispatch();
  const { post, loading } = useSelector((state) => state.post);
  const { post_id } = useParams();

  useEffect(() => {
    dispatch(fetchPost(post_id));
  }, []);

  return (
    <>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      {loading || post === null ? (
        <Spinner />
      ) : (
        <>
          <PostItem post={post} showActions={false} />

          <div className="post-form">
            <div className="post-form-header bg-primary">
              <h3>Leave A Comment</h3>
            </div>
            <CommentForm post_id={post_id} />
          </div>
          {post.comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Post;
