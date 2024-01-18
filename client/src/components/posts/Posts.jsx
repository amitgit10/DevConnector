import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../slices/postSlice";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";

const Posts = () => {
  const { posts, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <section className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community
      </p>

      <div className="post-form">
        <div className="post-form-header bg-primary">
          <h3>Say Something...</h3>
        </div>

        <form className="form my-1">
          <textarea cols="30" rows="5" placeholder="Create a post" />
          <input type="submit" value="Submit" className="btn btn-dark my-1" />
        </form>

        <div className="posts">
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Posts;
