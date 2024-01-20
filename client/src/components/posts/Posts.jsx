import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../slices/postSlice";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = () => {
  const { posts, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community
      </p>

      <PostForm />

      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </>
  );
};

export default Posts;
