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
    getPost: (state, action) => {
      const { payload } = action;
      state.post = payload;
      state.loading = false;
    },
    createPost: (state, action) => {
      const { payload } = action;
      state.posts.unshift(payload);
      state.loading = false;
    },
    removePost: (state, action) => {
      const { payload } = action;
      state.posts = state.posts.filter((post) => post._id !== payload);
      state.loading = false;
    },
    commentPost: (state, action) => {
      const { payload } = action;
      state.post.comments = payload;
      state.loading = false;
    },
    removeComment: (state, action) => {
      const { payload } = action;
      state.post.comments = state.post.comments.filter(
        (comment) => comment._id !== payload
      );
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

// Get a post
export const fetchPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);
    dispatch(getPost(res.data));
  } catch (err) {
    dispatch(
      postError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Add a post
export const addPost = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/posts", formData, config);
    dispatch(createPost(res.data));
    dispatch(alert("Post Created", "success"));
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
    dispatch(removePost(postId));
    dispatch(alert(res.data.msg, "success"));
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

// Comment on a post
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );
    dispatch(commentPost(res.data));
    dispatch(alert("Comment Added", "success"));
  } catch (err) {
    dispatch(
      postError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// Comment on a post
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch(removeComment(commentId));
    dispatch(alert("Comment Deleted", "success"));
  } catch (err) {
    dispatch(
      postError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

export const {
  getPosts,
  postError,
  updateLikes,
  removePost,
  createPost,
  getPost,
  commentPost,
  removeComment,
} = postSlice.actions;
export default postSlice.reducer;
