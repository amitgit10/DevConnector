import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { alert } from "./alertSlice";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPosts: (state, action) => {
      const { payload } = action;
      state.posts = payload;
      state.loading = false;
    },
    removePost: (state, action) => {
      const { payload } = action;
      state.posts = state.posts.filter((post) => post._id !== payload);
      state.loading = false;
    },
    postError: (state, action) => {
      const { payload } = action;
      state.error = payload;
      state.loading = false;
    },
    updateLikes: (state, action) => {
      const { payload } = action;
      state.posts.forEach((post) => {
        if (post._id === payload.postId) post.likes = payload.likes;
      });
      state.error = {};
      state.loading = false;
    },
  },
});

// Get all posts
export const getAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch(getPosts(res.data));
  } catch (err) {
    dispatch(
      postError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Delete a post
export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${postId}`);
    dispatch(alert(res.data.msg, "success"));
    dispatch(removePost(postId));
  } catch (err) {
    dispatch(
      postError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Like/Unlike post
export const likePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);
    dispatch(updateLikes({ postId, likes: res.data }));
  } catch (err) {
    dispatch(
      postError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

export const { getPosts, postError, updateLikes, removePost } =
  postSlice.actions;
export default postSlice.reducer;
